const express = require('express')
const c = require('../controller')
const authenticate = require('../middlewares/authenticate')

const mailRoute = express.Router()

// // admin >> route admin
// mailRoute.post('/confirm-product', c.mail.confirmProductByadmin)

// // seller
// mailRoute.post('/sell-success', sendEmailController.sellSuccessfully)

// // buyer
// mailRoute.post('/buy-success', sendEmailController.buySuccessfully)
// mailRoute.post('/confirm-product', sendEmailController.confirmProductByBuyer)
// mailRoute.post('/cancel-product', sendEmailController.cancelProductByBuyer)

// module.exports = mailRoute