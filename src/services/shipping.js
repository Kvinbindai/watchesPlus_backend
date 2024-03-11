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

// exports.updateTrackingNumberAdmin = async (id, data) =>
//   await prisma.shipping.update({
//     where: { id: id },
//     data: {
//       ...data,
//       status: "ONSHIPPING",
//     },
//     include: {
//       address: { include: { user: true } },
//       inventory: {
//         include: { watch: { include: { brand: true } }, user: true },
//       },
//     },
//   });

exports.updateTrackingNumberAdmin = async (id, body) => {
  return await prisma.$transaction(async (tx) => {
    //1.update shipping
    const updateShipping = await tx.shipping.update({
      where: { id: id },
      data: {
        ...body,
        status: "ONSHIPPING",
      },
    });
    //2. update inventory
    const updateInventory = await tx.inventory.update({
      where: {
        id: updateShipping.inventoryId,
      },
      data: {
        status: "UNAVAILABLE",
      },
    });
    //3.return ค่า
    const data = await tx.shipping.findFirst({
      where: { id: id },
      include: {
        address: { include: { user: true } },
        inventory: {
          include: { watch: { include: { brand: true } }, user: true },
        },
      },
    });
    return data;
  });
};
