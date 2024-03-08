const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const transactionRoute = express.Router()

transactionRoute.get('/:watchId',authenticate,c.transaction.getAllTransactionByWatchId)


module.exports = transactionRoute