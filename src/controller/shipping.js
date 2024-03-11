const services = require("../services");

exports.getAllshipping = async (req, res, next) => {
  try {
    const data = await services.shipping.getAllShippingAdmin();
    res.status(200).json({
      message: "Shipping All",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

exports.updateTrackingAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(+userId);
    console.log(req.body, "req.body");

    const data = await services.shipping.updateTrackingNumberAdmin(
      +userId,
      req.body
    );

    console.log(data, "data");

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
