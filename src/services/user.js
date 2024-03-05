const prisma = require("../config/prisma");
const { CustomError } = require("../config/error");

module.exports.findUserByEmail = async (email) =>
  await prisma.user.findUnique({ where: { email } });
module.exports.getAll = async () => await prisma.user.findMany();
module.exports.createUser = async (data) => {
  const foundUser = await this.findUserByEmail(data.email);
  if (foundUser)
    throw new CustomError("Email is already Created", "WRONG USER", 400);
  return await prisma.user.create({
    data: {
      ...data,
      wallet: {
        create: {},
      },
    },
  });
};
module.exports.changePasswordWithEmail = async (email, password) =>
  await prisma.user.update({ where: { email }, data: { password } });

module.exports.changeStatusUser = async (id) =>
  await prisma.user.update({ where: { id }, data: { status: "INACTIVE" } });

module.exports.changeStatusUser2 = async (id) =>
  await prisma.user.update({ where: { id }, data: { status: "ACTIVE" } });
