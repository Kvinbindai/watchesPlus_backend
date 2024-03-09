//=====================================================Imported Zone
const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const morgan = require("morgan");

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound");
const { errorMiddlewares } = require("../middlewares/error");

const CustomError = require("../config/error");
const userRoute = require("../router/user");
const orderRoute = require("../router/order");
const brandRoute = require("../router/brand");
const watchRoute = require("../router/watch");
const inventoryRoute = require("../router/inventory");
const walletRoute = require("../router/wallet");
const authenticate = require("../middlewares/authenticate");
const livechatRoute = require("../router/livechat");
const profileRoute = require("../router/profile");
const transactionRoute = require('../router/transaction')
const shippingRoute = require("../router/shipping");
const wishlistRoute = require("../router/wishlist");

//=====================================================Server Zone
module.exports = function restApiServer(app) {
  //=====================================================Encoding Zone
  app.use(morgan("dev"));
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(express.static("public"));

  //=====================================================Routing Zone
  app.use("/ping", (req, res, next) => {
    try {
      console.log("Checking the API status: Everything is OK");
      res.status(200).json("pong");
    } catch (error) {
      next(new CustomError("Ping Error", "NotFoundData", 500));
    }
  });
  app.use("/auth", userRoute);
  app.use("/order", orderRoute);
  app.use("/brand", brandRoute);
  app.use("/watch", watchRoute);
  app.use("/inventory", inventoryRoute);
  app.use("/wallet", walletRoute);
  app.use("/livechat", authenticate, livechatRoute);
  app.use("/profile", profileRoute);
  app.use('/transaction',transactionRoute)
  app.use("/shipping", shippingRoute);
  app.use("/wishlist", wishlistRoute);

  //=====================================================Throwing Zone
  app.use(notFound);
  app.use(errorMiddlewares);
};
