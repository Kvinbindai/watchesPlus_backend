const { CustomError } = require("../config/error");
const prisma = require("../config/prisma");

module.exports.getAll = async () => await prisma.brand.findMany();
module.exports.getBrandById = async (brandId) =>
  await prisma.brand.findFirst({ where: { id: brandId } });
module.exports.createBrand = async (data) =>
  await prisma.brand.create({ data });
module.exports.updateBrand = async (brandId, data) => {
  // if (!data) data = await this.getBrandById(brandId);
  await prisma.brand.update({ where: { id: brandId }, data });
};
module.exports.removeBrand = async (brandId) =>
  await prisma.brand.delete({ where: { id: +brandId } });
