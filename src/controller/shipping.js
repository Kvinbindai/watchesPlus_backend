const services = require("../services");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER_ADMIN,
    pass: process.env.MAIL_SECRETKEY,
  },
});

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
    const foundUser = await services.mail.getEmailUser(data.inventoryId)
    
    const mailConfirm = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundUser.user.email}`,
        subject: 'Thank you for your confirm product',
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundUser.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundUser.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundUser.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundUser.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    }) 
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

    const foundUser = await services.mail.getEmailUser(data.inventoryId)
    const mailToUser = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundUser.user.email}`,
        subject: `${foundUser.watch.modelName} be canceled`,
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundUser.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundUser.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundUser.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundUser.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `
    })
    res.json({
      message : "Update Status to failed",
      data
    })
  }catch(err){
    next(err)
  }
  return
}