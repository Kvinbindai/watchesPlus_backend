const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

exports.findWalletByUserId = async (userId) =>
  await prisma.wallet.findUnique({ where: { userId } });

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

exports.updateWalletByUserId = async (userId, amount) => {
  const wallet = await this.findWalletByUserId(userId);
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount + amount },
  });
};
