const express = require("express")
const c = require('../controller')
const authenticate = require("../middlewares/authenticate")
const orderRoute = express.Router()

orderRoute.post('/buy',authenticate,c.order.placeBuyOrder)



module.exports = orderRoute