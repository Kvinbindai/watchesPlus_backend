const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

exports.findWalletByUserId = async (userId) =>
  await prisma.wallet.findUnique({ where: { id: userId } });

exports.updateBuyerWallet = async (walletId, price) => {
  const oldData = await prisma.wallet.findUnique({
    where: { id: walletId },
  });
  return await prisma.wallet.update({
    where: { id: walletId },
    data: {
      amount: oldData.amount - price,
    },
  });
};

exports.updateSellerWallet = async (walletId, price) => {
  const oldData = await prisma.wallet.findUnique({
    where: { id: walletId },
  });
  return await prisma.wallet.update({
    where: { id: walletId },
    data: {
      amount: oldData.amount + price,
    },
  });
};
