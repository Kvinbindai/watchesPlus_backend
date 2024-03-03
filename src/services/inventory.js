const prisma = require("../config/prisma")

exports.createItemInInventory = async (userId,watchId) => await prisma.inventory.create({data : { userId , watchId }})
exports.updateStatusItem = async ({ inventoryId ,  body }) => {
   return await prisma.inventory.update({where : { id : inventoryId }, data : {status : body.status} })
}