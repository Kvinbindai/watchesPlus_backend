const services = require("../services");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER_ADMIN,
    pass: process.env.MAIL_SECRETKEY,
  },
});

exports.getAllByUserId = async (req, res, next) => {
  try {
    const data = await services.inventory.myInventory(req.user.id);
    res.json({
      message: "My Inventory",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getAllByUserIdAndWatchId = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const data = await services.inventory.myInventoryOnWatchId(
      req.user.id,
      +watchId
    );
    res.json({
      message: "Your Watch In Inventory",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

exports.addItemToInventory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.watchImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }
    req.body.watchId = +req.body.watchId;
    req.body.referenceNumber = uuidv4();
    const data = await services.inventory.createItemInInventory(
      req.user.id,
      req.body
    );
    res.json({
      message: "Create Item Inventory Success",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

exports.updateStatusItemInInventory = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    const dataObj = {
      inventoryId: +inventoryId,
      body: req.body,
    };
    const data = await services.inventory.updateStatusItem(dataObj);
    res.json({
      message: "Update Item Inventory Success",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getAllInventoryAllUser = async (req, res, next) => {
  try {
    const data = await services.inventory.getAll();
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.verifyInventory = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;

    const data = await services.inventory.verifyInventory(+inventoryId);

    const foundUser = await services.mail.getEmailUser(+inventoryId);

    const mailToUser = await transporter.sendMail({
      from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
      to: `${foundUser.user.email}`,
      subject: `${foundUser.watch.modelName} confirm add to inventory`,
      html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundUser.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundUser.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundUser.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundUser.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `,
    });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.failedInventory = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    const data = await services.inventory.failedInventory(+inventoryId);

    const foundUser = await services.mail.getEmailUser(+inventoryId);

    const mailToUser = await transporter.sendMail({
      from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
      to: `${foundUser.user.email}`,
      subject: `${foundUser.watch.modelName} Failed add to inventory`,
      html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundUser.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundUser.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundUser.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundUser.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `,
    });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

//*****************************************************/
