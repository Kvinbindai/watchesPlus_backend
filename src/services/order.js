const prisma = require("../config/prisma")
const {CustomError} = require('../config/error')
const services = require(".")


module.exports.findSaleOrderToMatch = async (watchId,price)=> await prisma.saleOrder.findFirst({where : {
    price : body.price,
    inventory : {
        watchId : body.watchId
    }
}}) 

module.exports.createBuyOrder = async (userId,body) => {
    const foundWallet = await prisma.wallet.findUnique({where : { userId : userId }})
    // console.log(foundWallet)
    if(foundWallet.amount < body.price) throw new CustomError("Your Wallet is not enough")

    // const matchSaleOrder = await prisma.saleOrder.findFirst()
    // if(matchSaleOrder){ //ถ้า buy ตรงกับ sale
    //    const updateWalletByBuyerId = await services.wallet.updateBuyerWallet(foundWallet.id,body.price) //1.ตัดเงินคนซื้อ
    //     const buyOrder = await prisma.buyOrder.create({data :{ //2. สร้าง buy order status success
    //         ...body,
    //         status : "SUCCESS"
    //     }})
    //     const data = await services.transaction.createTransaction(buyOrder,matchSaleOrder)
    // }else{
        
        const updateBuyerWallet = prisma.wallet.update({
            where : { id : foundWallet.id },
            data : {
                amount :  foundWallet.amount-body.price
            }
        })
        const createOrder = prisma.buyOrder.create({data : body})
        return await prisma.$transaction([updateBuyerWallet,createOrder])
    
    // const data = prisma.buyOrder.create({
    // data : {
    //     walletId : foundWallet.id,
    //     price : 
    // }
    // })
}

module.exports.createSaleOrder = async (body) => await prisma.saleOrder.create({data})