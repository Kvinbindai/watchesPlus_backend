const prisma = require("../config/prisma")

exports.myInventory = async (userId) => await prisma.inventory.findMany({where : {userId : userId,status : "AVAILABLE"}})
exports.myInventoryOnWatchId = async (userId,watchId) => await prisma.inventory.findMany({where : {userId : userId,status : "AVAILABLE" ,watchId : watchId}})

exports.findWatchByInventoryId = async (inventoryId) => await prisma.inventory.findUnique({where : {id : inventoryId,status : "AVAILABLE"}})
exports.createItemInInventory = async (userId,body) => await prisma.inventory.create({data : { userId , watchId : body.watchId , watchImage : body.watchImage ,referenceNumber : body.referenceNumber }})
exports.updateStatusItem = async ({ inventoryId ,  body }) => {
   return await prisma.inventory.update({where : { id : inventoryId }, data : {status : body.status} })
}
exports.createItemWhenBuyerSuccess = async (userId,watchId) => await prisma.inventory.create({data : { userId , watchId , status : "AVAILABLE" }})