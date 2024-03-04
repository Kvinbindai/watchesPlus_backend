const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");


module.exports.findSaleOrderToMatch = async (watchId, price) => {
  return await prisma.saleOrder.findFirstOrThrow({
    where: {
      price: price,
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
                select : {
                  id : true
                }
              }
            },
          },
        },
      },
    },
  });
};

module.exports.findBuyOrderToMatch = async (inventoryId, price) => {
  const foundInventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
  });
  return await prisma.buyOrder.findFirstOrThrow({
    where: {
      price,
      watchId: foundInventory.watchId,
    },
  });
};

module.exports.createBuyOrder = async (buyerWallet,body) => {
  const updateBuyerWallet = await prisma.wallet.update({
    where: { id: buyerWallet.id },
    data: {
      amount: buyerWallet.amount - body.price,
    },
  });
  const createOrder = await prisma.buyOrder.create({ data: body });
  return await Promise.all([updateBuyerWallet, createOrder]);
};

module.exports.createSaleOrder = async (sellerId, inventoryId, price) => {
  //1.หาของใน invnetory
  const foundInventory = await prisma.inventory.findFirst({
    where: {
      id: inventoryId,
      userId: sellerId,
      status: "AVAILABLE",
    },
  });
  if (!foundInventory)
    throw new CustomError("Inventory Item Not Found", "NO_INVENTORY", 400);
  //2. update inventory ที่ watchId นั้นให้่เป็น SELLING
  const updateSellerInventory = await prisma.inventory.update({
    where: {
      id: inventoryId,
      userId: sellerId,
    },
    data : {
      status : "SELLING"
    }
  });
  //3. สร้าง saleOrder
  const createSale = await prisma.saleOrder.create({
    data : {
      inventoryId : inventoryId,
      price 
    }
  })
  return await Promise.all([updateSellerInventory,createSale])
};
