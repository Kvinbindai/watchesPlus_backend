const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");
const services = require(".");

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
    data: { toWalletId: wallet.id, price: amount, type: "WITHDRAW" },
  });
  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: { amount: wallet.amount - amount },
  });
};
