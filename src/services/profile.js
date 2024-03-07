const prisma = require("../config/prisma");

module.exports.findProfileInfoByUserId = async (userId) =>
  await prisma.user.findFirst({ where: { id: userId } });

module.exports.updateProfileInfoByUserId = async (id, data) =>
  await prisma.user.update({ where: { id }, data });
