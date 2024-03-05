const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const walletRoute = express.Router();

walletRoute.get("", authenticate, c.wallet.getWalletByUserId);
walletRoute.post("/top-up", authenticate, c.wallet.topUp);
walletRoute.post("/withdraw", authenticate, c.wallet.withdraw);

module.exports = walletRoute;
