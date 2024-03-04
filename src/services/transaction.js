const prisma = require('../config/prisma')
const {CustomError} = require('../config/error')
const {createItemWhenBuyerSuccess}  = require('./inventory')

//req.user.id,req.body,matchSaleOrder จาก controller
exports.createTransactionFromBuyToSale = async (buyerId,body,saleOrder) => {
    //1. หักเงินคนซื้อ
    // const firstPromise = await services.wallet.updateBuyerWallet(buyerId,body.price)
    const findOldAmount = await prisma.wallet.findFirst({
        where : {
            userId : buyerId
        }
    })
    const firstPromise = await prisma.wallet.update({
        where : {
            userId : buyerId
        },data : {
            amount : findOldAmount.amount-body.price
        }
    })
    const buyerWalletId = firstPromise.id
    //2. สร้าง buyOrder ที่สำเร็จ
    const secondPromise =  await prisma.buyOrder.create({data : {
        ...body,
        status : "SUCCESS"
    }})
    //3. อัพเดท saleOrder ที่เจอให้ Success และ อัพเดท inventoryId นั้นให้เป็น SOLD
    const thirdPromise = await prisma.saleOrder.update({
        where : {
            id : saleOrder.id
        },
        data : {
            status : "SUCCESS",
            inventory : {
                update : {
                    status : "SOLD"
                }
            }
        }
    })
    const buyOrderId = thirdPromise.id
    //4. อัพเดทเงินคนขาย ผล return จาก saleOrder //inventory.user.wallet.id 
    const sellerWalletId =  saleOrder['inventory']['user']['wallet']['id']
    const foundSellerWallet = await prisma.wallet.findFirst({
        where : {
            userId : sellerWalletId
        }
    })
    const forthPromise = await prisma.wallet.update({
        where : {
            userId : sellerWalletId,
        },data : {
            amount : foundSellerWallet.amount+body.price
        }
    })   //(sellerWalletId,body.price)
    //5. สร้าง inventory ใหม่ให้ user คนซื้อ
    // const fifthPromise = await services.inventory.createItemWhenBuyerSuccess(buyerId,body.watchId)
    const fifthPromise = await prisma.inventory.create({
        data : {
            watchId : body.watchId,
            userId : buyerId,
            status : "AVAILABLE"
        }
    })
    //6. สร้าง Transaction Type Transfer
    const sixthPromise = await prisma.transactionWallet.create({
        data : {
            fromWalletId : buyerWalletId,
            toWalletId : sellerWalletId,
            watchId : body.watchId,
            type : "TRANSFER",
            price : body.price,
            buyOrderId : buyOrderId,
            saleOrderId : saleOrder.id
        }
    })
    const result = await Promise.all([findOldAmount,firstPromise,secondPromise,thirdPromise,forthPromise,fifthPromise,sixthPromise])
    return result
} 

exports.createTransactionFromSaleToBuy = async (sellerId,body,buyOrder) => { //req.user.id,req.body,matchBuyOrder
    //1. เงินมันถูกหักไปตอนสร้าง buyOrder แล้ว
    //2. อัพเดท buyOrder นั้นให้เป็น Success
    const updateBuyerOrder = await prisma.buyOrder.update({
        where  : {
            id : buyOrder.id,
            price : buyOrder.price
        },
        data : {
            status : "SUCCESS"
        }
    })
    //3. สร้าง invnetoryId คนซื้อตาม watchId
    // const createItemInInventory = await createItemWhenBuyerSuccess(sellerId,buyOrder.watchId)
    const createItemInInventory = await prisma.inventory.create({data : { watchId : buyOrder.watchId , userId : sellerId  }})
    //4. สร้าง saleOrder ที่เป็น success
    const createSaleOrder = await prisma.saleOrder.create({data : {
        inventoryId : createItemInInventory.id,
        price : body.price
    }}) 

    //5. อัพเดท inventoryId ของคนขายเป็น SOLD 
    const updateSellerInventory = await prisma.inventory.update({
        where : { id : body.inventoryId , userId : sellerId },
        data : { status : "SOLD"}
    })
    //5.5 หา wallet คนขาย 
    const foundSellerWallet = await prisma.wallet.findFirst({where : {userId : sellerId}})
    //5.6 อัพเดทเงิน คนขาย
    const updateSellerWallet = await prisma.wallet.update({
        where : {
            userId : sellerId
        },
        data : {
            amount : foundSellerWallet.amount + body.price
        }
    })
    //6. สร้าง Transaction Type Transfer
    const createTransaction = await prisma.transactionWallet.create({
        data : {
            fromWalletId : buyOrder.walletId,
            toWalletId : foundSellerWallet.id,
            watchId : body.watchId,
            type : "TRANSFER",
            price : body.price,
            buyOrderId : buyOrder.id,
            saleOrderId : createSaleOrder.id
        }
    })
    const result = await Promise.all([updateBuyerOrder,createItemInInventory,updateSellerInventory,foundSellerWallet,updateSellerWallet,createTransaction])
    return result
}