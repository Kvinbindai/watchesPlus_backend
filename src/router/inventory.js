const express = require("express")
const c = require('../controller')
const authenticate = require("../middlewares/authenticate")
const { validateAddItem, validateStatus } = require("../middlewares/validator/inventory")
const authenticateAdmin = require("../middlewares/authenticateAdmin")
const inventoryRoute = express.Router()

inventoryRoute.get('/',authenticate,c.inventory.getAllByUserId)
inventoryRoute.get('/:watchId',authenticate,c.inventory.getAllByUserIdAndWatchId)
inventoryRoute.post('/',authenticate,validateAddItem,c.inventory.addItemToInventory)
inventoryRoute.patch('/:inventoryId',authenticate,validateStatus,c.inventory.updateStatusItemInInventory)




module.exports = inventoryRoute