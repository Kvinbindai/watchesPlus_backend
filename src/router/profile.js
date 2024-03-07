const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const profileRoute = express.Router();

profileRoute.get("", authenticate, c.profile.getProfileInfo);
profileRoute.patch(
  "",
  authenticate,
  upload.single("profileImage"),
  c.profile.updateProfileInfo
);

module.exports = profileRoute;
