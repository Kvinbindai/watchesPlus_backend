const express = require("express");
const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const {
  validateCreateWatch,
  validateUpdateWatch,
} = require("../middlewares/validator/watch");
const upload = require("../middlewares/upload");
const watchRoute = express.Router();

watchRoute.get("/", c.watch.getAll);
watchRoute.get("/:watchId", c.watch.getOne);
watchRoute.post(
  "/",
  authenticate,
  authenticateAdmin,
  upload.single("watchImage"), //upload watchImage into public/images
  validateCreateWatch,
  c.watch.createWatch
);
watchRoute.patch(
  "/:watchId",
  authenticate,
  authenticateAdmin,
  upload.single("watchImage"),
  validateUpdateWatch,
  c.watch.editWatch
);
watchRoute.delete(
  "/:watchId",
  authenticate,
  authenticateAdmin,
  c.watch.deleteWatch
);

module.exports = watchRoute;
