const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

module.exports.findOrderExpectMyIdOnWatchId = async (userId,watchId) => {
  return await prisma.$transaction(async (tx) => {
    const myWallet = await tx.wallet.findUnique({
      where : { userId }
    })
    const foundAllBuyOrder = await tx.buyOrder.findMany({
      where : { 
        watchId : watchId,
        status : "PENDING",
        NOT :{
          walletId : myWallet.id
        }
       },
       orderBy : {
        price : 'asc'
       }
    })
    const foundAllSaleOrder = await tx.saleOrder.findMany({
      where : { 
        inventory : {
          watchId : watchId ,
          status : "SELLING"
        },
        NOT :{
          inventory :{
            userId : userId
          }
        }
       },
       orderBy : {
        price : 'asc'
       }
    })
    return [foundAllBuyOrder,foundAllSaleOrder]
  })
}

module.exports.findMyOrder = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const myWallet = await tx.wallet.findUnique({
      where: { userId },
    });
    const myBuyOrder = await tx.buyOrder.findMany({
      where: {
        walletId: myWallet.id,
        status: "PENDING",
      },
    });
    const mySaleOrder = await tx.saleOrder.findMany({
      where: {
        status: "PENDING",
        inventory: {
          userId: userId,
          status: "SELLING",
        },
      },
    });
    return [myBuyOrder, mySaleOrder];
  });
};

module.exports.findMyAllOrder = async (userId) => {
  const activity = await prisma.$transaction(async (tx) => {
    const myWallet = await tx.wallet.findUnique({
      where: { userId },
    });
    const myBuyOrder = await tx.buyOrder.findMany({
      where: {
        walletId: myWallet.id,
        status: "PENDING",
      },
      include: { watch: true },
    });
    const mySaleOrder = await tx.saleOrder.findMany({
      where: {
        status: "PENDING",
        inventory: {
          userId: userId,
          status: "SELLING",
        },
      },
      include: { inventory: { include: { watch: true } } },
    });
    return { myBuyOrder, mySaleOrder };
  });
  const history = await prisma.$transaction(async (tx) => {
    const myWallet = await tx.wallet.findUnique({
      where: { userId },
    });
    const myBuyHistory = await tx.buyOrder.findMany({
      where: {
        walletId: myWallet.id,
        OR: [{ status: "CANCELED" }, { status: "SUCCESS" }],
      },
      include: { watch: true },
    });
    const mySaleHistory = await tx.saleOrder.findMany({
      where: {
        OR: [{ status: "CANCELED" }, { status: "SUCCESS" }],
        inventory: {
          userId: userId,
          OR: [{ status: "AVAILABLE" }, { status: "SOLD" }],
        },
      },
      include: { inventory: { include: { watch: true } } },
    });
    return { myBuyHistory, mySaleHistory };
  });
  return { activity, history };
};

module.exports.findSaleOrderToMatch = async (watchId, price,buyerId) => {
  return prisma.$transaction(async(tx)=>{
    const foundSaleOrder = await tx.saleOrder.findFirst({
      where: {
        price: price,
        status: "PENDING",
        inventory: {
          watchId: watchId,
        },
      },
      include: {
        inventory: {
          //inventory.user.wallet.id //inventory.user.wallet.amount
          include: {
            user: {
              include: {
                wallet: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if(buyerId === foundSaleOrder.inventory.userId){ //ห้ามซื้อ saleOrder ตัวเอง
      throw new CustomError("Cant Buy This Order","WRONG_ID",400)
    }
    return foundSaleOrder
  })
};

module.exports.findBuyOrderToMatch = async (inventoryId, price) => {
  return await prisma.$transaction(async (tx) => {
    const foundInventory = await tx.inventory.findUnique({
      where: { id: inventoryId },
    });

    const foundOrder = await tx.buyOrder.findFirst({
      where: {
        price,
        watchId: foundInventory.watchId,
        status: "PENDING",
      },
    });
    return foundOrder;
  });
};

module.exports.createBuyOrder = async (buyerWallet, body) => {
  return await prisma.$transaction(async (tx) => {
    const updateBuyerWallet = await tx.wallet.update({
      where: { id: buyerWallet.id },
      data: {
        amount: {
          decrement: body.price,
        },
      },
    });
    const createOrder = await tx.buyOrder.create({ data: body });
    return createOrder;
  });
};

module.exports.createSaleOrder = async (sellerId, inventoryId, price) => {
  return prisma.$transaction(async (tx) => {
    //2. update inventory ที่ watchId นั้นให้่เป็น SELLING
    const updateSellerInventory = await tx.inventory.update({
      where: {
        id: inventoryId,
        userId: sellerId,
      },
      data: {
        status: "SELLING",
      },
    });
    //3. สร้าง saleOrder
    const createSale = await tx.saleOrder.create({
      data: {
        inventoryId: inventoryId,
        price,
      },
    });
    return createSale;
  });
};

module.exports.updateBuyOrderToCancel = async (id) => {
  return await prisma.$transaction(async (tx) => {
    // 1.update buyorder to cancel
    const updateBuyerOrder = await tx.buyOrder.update({
      where: { id: id },
      data: { status: "CANCELED" },
    });
    //2.คืนเงิน wallet
    const refundWallet = await tx.wallet.update({
      where: { id: updateBuyerOrder.walletId },
      data: {
        amount: {
          increment: updateBuyerOrder.price,
        },
      },
    });
    return refundWallet;
  });
};

module.exports.updateSaleOrderToCancel = async (id) => {
  return await prisma.$transaction(async (tx) => {
    // 1.update saleOrder to cancel
    const updateSaleOrder = await tx.saleOrder.update({
      where: { id: id },
      data: { status: "CANCELED" },
    });
    //2.คืนของ inventory
    const returnItem = await tx.inventory.update({
      where: { id: updateSaleOrder.inventoryId },
      data: {
        status: "AVAILABLE",
      },
    });
    return returnItem;
  });
};
