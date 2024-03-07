const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

//req.user.id,req.body,matchSaleOrder จาก controller
exports.createTransactionFromBuyToSale = async (buyerId, body, saleOrder) => {
  return prisma.$transaction(async (tx) => {
    //1. หักเงินคนซื้อ
    const updateBuyerWallet = await tx.wallet.update({
      where: { userId: buyerId },
      data: {
        amount: {
          decrement: body.price,
        },
      },
    });
    //2. สร้าง buyOrder ที่สำเร็จ
    const createBuyOrderThatSuccess = await tx.buyOrder.create({
      data: {
        walletId: body.walletId,
        watchId: body.watchId,
        price: body.price,
        status : "SUCCESS"
      },
    });
    //3. อัพเดท saleOrder ที่เจอให้ Success และ อัพเดท inventoryId นั้นให้เป็น SOLD
    const updateSaleOrderAndInventory = await tx.saleOrder.update({
      where: {
        id: saleOrder.id,
      },
      data: {
        status: "SUCCESS",
        inventory: {
          update: {
            status: "SOLD",
          },
        },
      },
    });
    //4. หา find sellerId ที่เป็นเจ้าของ InvnetoryId นี้
    const foundSellerId = await tx.inventory.findFirst({
      where: { id: saleOrder.inventoryId },
    });
    //5.update wallet ของ คนขาย
    const updateSellerWallet = await tx.wallet.update({
      where: { userId: foundSellerId.userId },
      data: {
        amount: {
          increment: body.price,
        },
      },
    });
    //6. สร้าง inventory ใหม่ให้ user คนซื้อ
    const createItemWhenBuyerSuccess = await tx.inventory.create({
      data: { watchId: body.watchId, userId: buyerId, status: "AVAILABLE" },
    });
    //7. สร้าง Transaction Type Transfer
    const transaction = await tx.transactionWallet.create({
      data: {
        fromWalletId: updateBuyerWallet.id,
        toWalletId: updateSellerWallet.id,
        watchId: body.watchId,
        type: "TRANSFER",
        price: body.price,
        buyOrderId: createBuyOrderThatSuccess.id,
        saleOrderId: saleOrder.id,
      },
    });
    return transaction;
  });
};
exports.createTransactionFromSaleToBuy = async (sellerId, body, buyOrder) => {
  //req.user.id,req.body,matchBuyOrder
  return prisma.$transaction(async (tx) => {
    //0. เงินมันถูกหักไปตอนสร้าง buyOrder แล้ว
    //1. อัพเดท buyOrder นั้นให้เป็น Success
    const updateBuyerOrder = await tx.buyOrder.update({
      where: {
        id: buyOrder.id,
        price: body.price,
      },
      data: {
        status: "SUCCESS",
      },
    });
    //2. สร้าง saleOrder Success
    const createSaleOrderIsSuccess = await tx.saleOrder.create({
      data: {
        inventoryId: body.inventoryId,
        price: body.price,
        status: "SUCCESS",
      },
    });
    //3.update wallet ของ seller
    const updateSellerWallet = await tx.wallet.update({
      where: { userId: sellerId },
      data: {
        amount: {
          increment: body.price,
        },
      },
    });
    //4. สร้าง invnetoryId คนซื้อตาม watchId
    //4.1 หา userId ของ คนซื้อ
    const foundBuyerWallet = await tx.wallet.findFirst({
      where: {
        id: buyOrder.walletId,
      },
    });
    //4.2 สร้าง invnetoryId คนซื้อตาม watchId
    const createItemInInventory = await tx.inventory.create({
      data: {
        watchId: buyOrder.watchId,
        userId: foundBuyerWallet.userId,
        status: "AVAILABLE",
      },
    });
    //5. update inventoryId ของ seller
    const updateSellerInventory = await tx.inventory.update({
      where: {
        id: body.inventoryId,
      },
      data: {
        status: "SOLD",
      },
    });
    //6.สร้าง transactionWallet
    const transaction = await tx.transactionWallet.create({
      data: {
        fromWalletId: foundBuyerWallet.id,
        toWalletId: updateSellerWallet.id,
        watchId: buyOrder.watchId,
        price: body.price,
        buyOrderId: updateBuyerOrder.id,
        saleOrderId: createSaleOrderIsSuccess.id,
        type: "TRANSFER",
      },
    });
    return transaction;
  });
};
