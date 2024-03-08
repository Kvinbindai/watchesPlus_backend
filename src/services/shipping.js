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

exports.createTracking = async () => await prisma.shipping.create({ data });
