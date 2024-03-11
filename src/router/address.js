const express = require("express");
const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const { validateAddAddress } = require("../middlewares/validator/address");

const addressRoute = express.Router();

addressRoute.get('/:inventoryId',authenticate,c.address.getAddressFromInventoryId)
addressRoute.post('/',authenticate,validateAddAddress,c.address.addAddressAndShippingOrder)
addressRoute.patch('/update/:addressId',authenticate,c.address.updateAddressWhereAddressId)
addressRoute.patch('/cancel',authenticate,c.address.cancelShippingAndUpdateInventoryBack)




module.exports = addressRoute;
