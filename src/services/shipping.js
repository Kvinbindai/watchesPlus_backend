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
    return data
  });
};

exports.getAllShippingByUserId = async(userId) => {
  return await prisma.$transaction(async(tx) => {
    const addressInShipping = await tx.shipping.findMany({
      where : {
        status : "ONSHIPPING",
        address : {
          userId : userId
        }
      },
      include : {
        inventory : true
      }
    })
    return addressInShipping
  })
}

exports.updateStatusToConfirm = async(shippingId) => {
  return await prisma.$transaction(async(tx)=>{
    const updateShipping = await tx.shipping.update({
      where : { id : shippingId},
      data : { status : "SUCCESS" }
    })
    return updateShipping
  })
}

exports.updateStatusToFailed = async(shippingId) => {
  return await prisma.$transaction(async (tx) => {
    const updateShipping = await tx.shipping.update({
      where : { id : shippingId},
      data : {status : "FAILED"}
    })
    return updateShipping
  })
}