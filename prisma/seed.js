const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { productData } = require("./watchData");
const { brandData } = require("./brandData");
const { userData } = require("./userData");
const { inventoryData } = require("./inventoryData");
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
  })
};

generateData();
