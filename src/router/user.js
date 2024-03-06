const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require("../middlewares/validator/user");

const userRoute = express.Router();

userRoute.get("/", c.user.getAll);
userRoute.get("/getMe", authenticate, c.user.getMe);
userRoute.get("/:id", c.user.get);

userRoute.post("/register", validateRegister, c.user.register);
userRoute.post("/login", validateLogin, c.user.login);
userRoute.patch("/change-password", c.user.changePassword);

userRoute.put("/:id", c.user.update);
userRoute.delete("/:id", c.user.changeStatusUserBlock); // block User
userRoute.patch("/:id", c.user.changeStatusUserUnblock); // เปลี่ยนจาก block เป็นเลิก block

module.exports = userRoute;
