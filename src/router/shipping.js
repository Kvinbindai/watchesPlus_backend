const express = require("express");
const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const {
  validateAddItem,
  validateStatus,
} = require("../middlewares/validator/inventory");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const shippingRoute = express.Router();

shippingRoute.get("/", authenticate, c.shipping.getAllshipping);
shippingRoute.patch(
  "/admin/:userId",
  authenticate,
  c.shipping.updateTrackingAdmin
);

module.exports = shippingRoute;
