const express = require("express");
const dashboardAdminController = require("../controller/dashboardAdmin/dashboard");
const authenticate = require("../middlewares/authenticate");

const dashboardAdminRoute = express.Router();

dashboardAdminRoute.get(
  "",
  authenticate,
  dashboardAdminController.dashboradBrand
);

module.exports = dashboardAdminRoute;
