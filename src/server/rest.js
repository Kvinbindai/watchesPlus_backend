//=====================================================Imported Zone
const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const morgan = require("morgan");

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound");
const { errorMiddlewares } = require("../middlewares/error");
const authenticate = require("../middlewares/authenticate");
const CustomError = require("../config/error");
const userRoute = require("../router/user");
const livechatRoute = require("../router/livechat");
const orderRoute = require("../router/order");
const brandRoute = require("../router/brand");
const watchRoute = require("../router/watch");

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
  app.use("/livechat", authenticate, livechatRoute);
  app.use("/order", orderRoute);
  app.use("/brand", brandRoute);
  app.use("/watch", watchRoute);

  //=====================================================Throwing Zone
  app.use(notFound);
  app.use(errorMiddlewares);
};
