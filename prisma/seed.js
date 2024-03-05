const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { productData } = require("./mock/watchData");
const { brandData } = require("./mock/brandData");
const { userData } = require("./mock/userData");
const { inventoryData } = require("./mock/inventoryData");
const { chatRoomData } = require('./mock/chatRoom')
const utils = require("../src/utils");

const generateData = async () => {
  return await prisma.$transaction(async(tx)=>{
    for(let i =0 ;i<userData.length;i++){
      await tx.user.create({
        data : {
          ...userData[i],
          password : await utils.bcrypt.hashed(userData[i].password)
        }
      })
    }
    await tx.brand.createMany({data : brandData})
    await tx.watch.createMany({data : productData})
    await tx.inventory.createMany({data : inventoryData})
    await tx.chatRoom.createMany({data : chatRoomData})
  })
};

generateData();
