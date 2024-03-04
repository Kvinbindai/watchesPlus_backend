const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const walletRoute = express.Router();

walletRoute.post("/top-up", authenticate, c.wallet.topUp);

module.exports = walletRoute;
