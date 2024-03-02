const prisma = require("../config/prisma")
const {CustomError} = require('../config/error')


module.exports.createBuyOrder = async (data) => await prisma.buyOrder.create({data})