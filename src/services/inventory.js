const prisma = require("../config/prisma");

exports.myInventory = async (userId) =>
  await prisma.inventory.findMany({
    where: { userId: userId, status: "AVAILABLE" },
  });
exports.findWatchByInventoryId = async (inventoryId) =>
  await prisma.inventory.findUnique({
    where: { id: inventoryId, status: "AVAILABLE" },
  });
exports.createItemInInventory = async (userId, watchId) =>
  await prisma.inventory.create({ data: { userId, watchId } });
exports.updateStatusItem = async ({ inventoryId, body }) => {
  return await prisma.inventory.update({
    where: { id: inventoryId },
    data: { status: body.status },
  });
};
exports.createItemWhenBuyerSuccess = async (userId, watchId) =>
  await prisma.inventory.create({
    data: { userId, watchId, status: "AVAILABLE" },
  });

exports.getAll = async () =>
  await prisma.inventory.findMany({
    where: { status: "PENDING" },
    include: { watch: { include: { brand: true } }, user: true },
  });

module.exports.verifyInventory = async (id) =>
  await prisma.inventory.update({
    where: { id },
    data: { status: "AVAILABLE" },
    include: { user: true, watch: { include: { brand: true } } },
  });

module.exports.failedInventory = async (id) =>
  await prisma.inventory.update({
    where: { id },
    data: { status: "FAILED" },
    include: { user: true, watch: { include: { brand: true } } },
  });
