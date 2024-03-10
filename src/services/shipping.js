const prisma = require("../config/prisma");

exports.getAllShippingAdmin = async () =>
  await prisma.shipping.findMany({
    include: {
      address: { include: { user: true } },
      inventory: {
        include: { watch: { include: { brand: true } }, user: true },
      },
    },
  });

exports.updateTrackingNumberAdmin = async (id, data) =>
  await prisma.shipping.update({
    where: { id: id },
    data: { ...data, status: "SUCCESS" },
    include: {
      address: { include: { user: true } },
      inventory: {
        include: { watch: { include: { brand: true } }, user: true },
      },
    },
  });
