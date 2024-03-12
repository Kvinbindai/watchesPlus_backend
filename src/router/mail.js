const express = require('express')
const c = require('../controller')
const authenticate = require('../middlewares/authenticate')
const authenticateAdmin = require('../middlewares/authenticateAdmin')

const mailRoute = express.Router()

// admin >> route admin
mailRoute.post('/confirm-product/:inventoryId', authenticate, authenticateAdmin, c.mail.confirmProductByAdmin)

// seller
mailRoute.post('/sell-success/:inventoryId', authenticate, c.mail.sellSuccessfully)

// buyer
mailRoute.post('/buy-success/:inventoryId', authenticate, c.mail.buySuccessfully)
mailRoute.post('/confirm-product/:inventoryId', authenticate, c.mail.confirmProductByBuyer)
mailRoute.post('/cancel-product/:inventoryId', authenticate, c.mail.cancelProductByBuyer)

module.exports = mailRoute