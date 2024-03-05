const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");
const services = require(".");

exports.findWalletByUserId = async (userId) =>
  await prisma.wallet.findUnique({ where: { userId } });

exports.updateBuyerWallet = async (walletId, price) => {
  return await prisma.wallet.update({
    where: { id: walletId },
    data: {
      amount: {
        decrement: price,
      },
    },
  });
};

exports.updateSellerWallet = async (walletId, price) => {
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

exports.topUpWalletByUserId = async (userId, amount) => {
  const wallet = await this.findWalletByUserId(userId);
  await prisma.transactionWallet.create({
    data: { toWalletId: wallet.id, price: amount, type: "DEPOSIT" },
  });
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount + amount },
  });
};

exports.withdrawWalletByUserId = async (userId, amount) => {
  const wallet = await this.findWalletByUserId(userId);
  await prisma.transactionWallet.create({
    data: { fromWalletId: wallet.id, price: amount, type: "WITHDRAW" },
  });
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount - amount },
  });
};

exports.getWalletTransactionByUserId = async (userId) => {
  const { id } = await this.findWalletByUserId(userId);
  return await prisma.transactionWallet.findMany({
    where: { OR: [{ fromWalletId: id }, { toWalletId: id }] },
  });
};
