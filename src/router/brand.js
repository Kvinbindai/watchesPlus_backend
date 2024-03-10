const express = require("express");
const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const {
  validateAddBrand,
  validateEditBrand,
} = require("../middlewares/validator/brand");
const upload = require("../middlewares/upload");
const brandRoute = express.Router();

brandRoute.get("/", c.brand.getAll);
brandRoute.get("/:brandId", c.brand.getOne);

brandRoute.post(
  "/",
  authenticate,
  authenticateAdmin,
  upload.single("brandImage"),
  validateAddBrand,
  c.brand.addBrand
);

brandRoute.patch(
  "/:brandId",
  authenticate,
  authenticateAdmin,
  validateEditBrand,
  c.brand.editBrand
);

brandRoute.delete(
  "/:brandId",
  authenticate,
  authenticateAdmin,
  c.brand.deleteBrand
);

module.exports = brandRoute;
