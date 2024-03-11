const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { productData } = require("./mock/watchData");
const { brandData } = require("./mock/brandData");
const { userData } = require("./mock/userData");
const { inventoryData } = require("./mock/inventoryData");
const { chatRoomData } = require("./mock/chatRoom");
const { buyOrderData } = require("./mock/buyOrderData");
const { saleOrderData } = require("./mock/saleOrderData");
const utils = require("../src/utils");
const { royaltyData } = require("./mock/royaltyData");

const generateData = async () => {
  return await prisma.$transaction(async (tx) => {
    for (let i = 0; i < userData.length; i++) {
      await tx.user.create({
        data: {
          ...userData[i],
          password: await utils.bcrypt.hashed(userData[i].password),
        },
      });
    }
    await tx.royalty.createMany({ data: royaltyData });
    await tx.brand.createMany({ data: brandData });
    await tx.watch.createMany({ data: productData });
    // for(let i = 0;i<inventoryData.length;i++ ){
    //   await tx.inventory.create({data : inventoryData[i]})
    //  }
    await tx.inventory.createMany({ data: inventoryData });
    await tx.chatRoom.createMany({ data: chatRoomData });
    await tx.buyOrder.createMany({ data: buyOrderData });
    await tx.saleOrder.createMany({ data: saleOrderData });
    // for(let i = 0;i<saleOrderData.length;i++ ){
    //   await tx.saleOrder.create({data : saleOrderData[i]})
    // }
  });
};

generateData();
// generateBuyOrder();
