const express = require("express")
const c = require('../controller')
const authenticate = require("../middlewares/authenticate")
const orderRoute = express.Router()

orderRoute.post('/buy',authenticate,c.order.placeBuyOrder)
orderRoute.post('/sale',authenticate,c.order.placeSaleOrder)
orderRoute.patch('/buy/:buyOrderId',authenticate,c.order.cancelBuyOrder)
orderRoute.patch('/sale/:saleOrderId',authenticate,c.order.cancelSaleOrder)


module.exports = orderRoute