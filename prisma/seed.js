const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { productData } = require("./watchData");
const { brandData } = require("./brandData");
const  {userData}  = require('./userData');
const { inventoryData} =  require('./inventoryData')
const utils = require("../src/utils")

// console.log(productData)



const seedUser = async () => {
  const newData = await Promise.all( userData.map(async(e)=>{
    const hashPassword = await utils.bcrypt.hashed(e.password)
    return { ...e , password : hashPassword }
  }))
  // console.log(newData)
  await Promise.all(newData.map(async(e)=>await prisma.user.create({data : e})))
}

const generateData = async () => {
  // const user = userData.map(async (e)=> e.password = await utils.bcrypt.hashed(e.password)) //1 
  // console.log(user)
  const brand = await prisma.brand.createMany({data : brandData}) //2
  const product = await prisma.watch.createMany({data : productData}) //3
  const inventory = await prisma.inventory.createMany({data : inventoryData}) //4

  await Promise.all([brand,product,inventory])

};

// seedUser()
// generateData()

