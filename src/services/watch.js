const prisma = require("../config/prisma");

module.exports.getAllWatch = async () => await prisma.watch.findMany({ include: { brand: { select: { name: true } } } })
module.exports.getBySearch = async (modelName) => await prisma.watch.findMany({ where: { modelName }, include: { brand: { select: { name: true } } } })
module.exports.getBySearchEnter = async (searchEnter) => await prisma.watch.findMany({ where: { modelName: { contains: searchEnter } }, include: { brand: { select: { name: true } } } })
module.exports.getWatchById = async (watchId) => await prisma.watch.findFirst({ where: { id: watchId }, include: { brand: { select: { name: true } } } })
module.exports.addWatch = async (data) => await prisma.watch.create({ data })
module.exports.updateWatch = async (watchId, data) => await prisma.watch.update({ where: { id: watchId }, data })
module.exports.removeWatch = async (watchId) => await prisma.watch.delete({ where: { id: watchId } })