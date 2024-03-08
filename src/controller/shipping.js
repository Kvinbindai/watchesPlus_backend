const services = require("../services");

exports.getAllshipping = async (req, res, next) => {
  try {
    const data = await services.shipping.getAllShippingAdmin();
    res.status(200).json({
      message: "Shipping All",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};
