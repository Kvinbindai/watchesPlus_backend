const prisma = require('../config/prisma')
const {CustomError} = require('../config/error')
const services = require('.')

//req.user.id,req.body,matchSaleOrder จาก controller
exports.createTransactionFromBuyToSale = async (userId,body,saleOrder) => {
    //1. หักเงินคนซื้อ
    const firstPromise = services.wallet.updateBuyerWallet(userId,body.price)
    //2. สร้าง buyOrder ที่สำเร็จ
    const secondPromise = prisma.buyOrder.create({data : {
        ...data,
        status : "SUCCESS"
    }})
    //3. อัพเดท saleOrder ที่เจอให้ Success และ อัพเดท inventoryId นั้นให้เป็น SOLD
    const thirdPromise = prisma.saleOrder.update({
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
    //4. อัพเดทเงินคนขาย ผล return จาก saleOrder //inventory.user.wallet.id 
    const sellerId = saleOrder['inventory']['user']['wallet']['id']
    const forthPromise = services.wallet.updateSellerWallet(sellerId,body.price)
    //5. สร้าง Transaction Type Transfer
} 