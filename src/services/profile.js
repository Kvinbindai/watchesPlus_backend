const prisma = require("../config/prisma");

module.exports.findProfileInfoByUserId = async (userId) =>
  await prisma.user.findFirst({
    where: { id: userId },
    include: {
      wallet: {
        select: {
          id: true,
          amount: true,
        },
      },
      royalty: {
        select: { point: true },
      },
    },
  });

module.exports.updateProfileInfoByUserId = async (id, data) =>
  await prisma.user.update({ where: { id }, data });
