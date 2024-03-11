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
shippingRoute.get("/all", authenticate, c.shipping.getMyShipping);
shippingRoute.patch(
  "/confirm/:shippingId",
  authenticate,
  c.shipping.updateStatusConfirmByUser
);
shippingRoute.patch(
  "/cancel/:shippingId",
  authenticate,
  c.shipping.updateStatusFailedByUser
);
shippingRoute.patch(
  "/admin/:userId",
  authenticate,
  c.shipping.updateTrackingAdmin
);

module.exports = shippingRoute;
