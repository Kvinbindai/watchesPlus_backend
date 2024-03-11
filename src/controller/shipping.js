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

exports.getMyShipping = async (req, res, next) => {
  try {
    const data = await services.shipping.getAllShippingByUserId(req.user.id);
    res.json({
      message: "Get all Shipping",
      data,
    });
  } catch (err) {
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

exports.updateStatusConfirmByUser = async (req, res, next) => {
  try {
    const { shippingId } = req.params
    const data = await services.shipping.updateStatusToConfirm(+shippingId);
    res.json({
      message : "Update Status to complete",
      data
    })
  } catch (err) {
    next(err);
  }
  return;
};

exports.updateStatusFailedByUser = async (req,res,next) => {
  try{
    const { shippingId } = req.params
    const data = await services.shipping.updateStatusToFailed(+shippingId,req.body);
    res.json({
      message : "Update Status to failed",
      data
    })
  }catch(err){
    next(err)
  }
  return
}