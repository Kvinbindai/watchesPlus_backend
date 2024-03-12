const prisma = require('../config/prisma')

exports.getEmailUser = async (inventoryId) => {
    return await prisma.inventory.findFirst({
        where: { id: inventoryId },
        include: { user: true, watch: { include: { brand: true } } }
    })
}