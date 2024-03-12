const prisma = require('../config/prisma')

exports.createAddressAndShippingOrder = async (userId, body) => {
    return await prisma.$transaction(async (tx) => {
        //1. create Address
        const address = await tx.address.create({
            data: {
                detail : body.detail,
                province: body.province,
                district: body.district,
                subDistrict: body.subDistrict,
                zipCode: body.zipCode,
                userId: userId,
            }
        })
        //2. update inventoryId นั้นให้เป็น WAITING
        const updateStatusItemInInventory = await tx.inventory.update({
            where: {
                id: body.inventoryId,
                referenceNumber: body.referenceNumber
            },
            data: {
                status: "WAITING"
            }
        })
        //3. create Shipping
        const shipping = await tx.shipping.create({
            data: {
                inventoryId: body.inventoryId,
                addressId: address.id,
                status: "PENDING"
            }
        })
        return shipping
    })
}


exports.cancelShippingBeforeAdminAddTracking = async (body) => {
    return await prisma.$transaction(async (tx) => {
        //0. หา shipping ที่ inventoryId นี้ และ pending
        const foundShipping = await tx.shipping.findFirst({
            where: {
                inventoryId: body.inventoryId,
                status: "PENDING",
            },
        })
        //1. update status shipping จาก pending เป็น cancel
        const updateShipping = await tx.shipping.update({
            where: {
                id: foundShipping.id
            }, data: {
                status: "CANCELED"
            }
        })
        //2. update invenotry เดิม ให้เป็น AVAILABLE
        const updateStatusItemInInventory = await tx.inventory.update({
            where: {
                id: foundShipping.inventoryId
            },
            data: {
                status: "AVAILABLE"
            }
        })
        return updateStatusItemInInventory
    })
}

exports.getAddressByInventoryId = async (inventoryId) => {
    return await prisma.$transaction(async (tx) => {

        const addressWhereInventoryWhenStatusPending = await tx.shipping.findFirst({
            where: {
                inventoryId: inventoryId,
                status: "PENDING"
            }, include: {
                address: true
            }
        })
        return addressWhereInventoryWhenStatusPending
    })
}

exports.updateAddressByInventoryId = async (addressId, body) => {
    return await prisma.$transaction(async (tx) => {
        const updateAddress = await tx.address.update({
            where: {
                id: addressId
            },
            data: {
                ...body
            }
        })
        return updateAddress
    })
}