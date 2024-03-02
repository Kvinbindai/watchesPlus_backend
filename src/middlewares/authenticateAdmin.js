const { CustomError } = require("../config/error");

module.exports = async function authenticateAdmin(req, res, next) {
  try {
    const { role } = req.user;
    if (role !== "ADMIN")
      throw new CustomError("No Permission", "UNAUTHORIZED", 403);
    next();
  } catch (err) {
    next(err);
  }
};
