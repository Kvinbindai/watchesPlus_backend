const express = require("express");
const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const {
  validateAddItem,
  validateStatus,
} = require("../middlewares/validator/inventory");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const upload = require("../middlewares/upload")
const inventoryRoute = express.Router();

inventoryRoute.get("/", authenticate, c.inventory.getAllByUserId);

inventoryRoute.get('/:watchId',authenticate,c.inventory.getAllByUserIdAndWatchId)

inventoryRoute.post('/',upload.single('watchImage'),authenticate,validateAddItem,c.inventory.addItemToInventory)


inventoryRoute.patch(
  "/:inventoryId",
  authenticate,
  validateStatus,
  c.inventory.updateStatusItemInInventory
);

//***************************************** ADMIN ************/
inventoryRoute.get(
  "/all",
  authenticate,
  authenticateAdmin,
  c.inventory.getAllInventoryAllUser
); // inventory ของ User ทั้งหมด

inventoryRoute.patch(
  "/admin/:inventoryId",
  authenticate,
  authenticateAdmin,
  c.inventory.verifyInventory
); // ผ่านการตรวจสอบจากบริษัท

inventoryRoute.delete(
  "/admin/:inventoryId",
  authenticate,
  authenticateAdmin,
  c.inventory.failedInventory
); // ไม่ผ่านการตรวจสอบ

//*****************************************************/

module.exports = inventoryRoute;






module.exports = inventoryRoute