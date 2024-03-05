const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

exports.findWalletByUserId = async (userId) =>
  await prisma.wallet.findUnique({ where: { userId: userId } });

exports.updateBuyerWallet = async (walletId, price) => {
  return  await prisma.wallet.update({
      where : { id : walletId },
      data :  {
        amount : {
          decrement : price
        }
      }
    })
}

exports.updateSellerWallet = async (walletId, price) => {
  return await prisma.wallet.update({
    where : {
       id : walletId 
    },
    data : {
      amount : {
        increment : price
      }
    }
  })
};
