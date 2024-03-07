const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");
const services = require(".");

module.exports.findWalletByUserId = async (userId) =>
  await prisma.wallet.findUnique({ where: { userId } });

module.exports.updateBuyerWallet = async (walletId, price) => {
  return await prisma.wallet.update({
    where: { id: walletId },
    data: {
      amount: {
        decrement: price,
      },
    },
  });
};

module.exports.updateSellerWallet = async (walletId, price) => {
  return await prisma.wallet.update({
    where: {
      id: walletId,
    },
    data: {
      amount: {
        increment: price,
      },
    },
  });
};

module.exports.topUpWalletByUserId = async (userId, amount) => {
  const wallet = await this.findWalletByUserId(userId);
  await prisma.transactionWallet.create({
    data: { toWalletId: wallet.id, price: amount, type: "DEPOSIT" },
  });
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount + amount },
  });
};

module.exports.withdrawWalletByUserId = async (userId, amount) => {
  const wallet = await this.findWalletByUserId(userId);
  await prisma.transactionWallet.create({
    data: { fromWalletId: wallet.id, price: amount, type: "WITHDRAW" },
  });
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount - amount },
  });
};

module.exports.getWalletTransactionByUserId = async (userId) => {
  const { id } = await this.findWalletByUserId(userId);
  return await prisma.transactionWallet.findMany({
    where: { OR: [{ fromWalletId: id }, { toWalletId: id }] },
  });
};
