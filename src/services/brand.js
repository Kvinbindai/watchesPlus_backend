const prisma = require("../config/prisma")



module.exports.getAll = async () => await prisma.brand.findMany()
module.exports.getBrandById = async (brandId) => await prisma.brand.findFirst({where : { id : brandId}})
module.exports.createBrand = async (data) => await prisma.brand.create({data})
module.exports.updateBrand = async (brandId,data) => await prisma.brand.update({where : {id : brandId},data})
module.exports.removeBrand = async (brandId) => await prisma.brand.delete({where : {id : brandId}})