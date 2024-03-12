const services = require("../services");
const { CustomError } = require("../config/error");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER_ADMIN,
    pass: process.env.MAIL_SECRETKEY,
  },
});

module.exports.getAllOrder = async (req, res, next) => {
  try {
    const data = await services.order.findMyOrder(req.user.id);
    res.json({
      message: "My Order",
      buyOrder: data[0],
      saleOrder: data[1],
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.getAllActivityAndHistory = async (req, res, next) => {
  try {
    const data = await services.order.findMyAllOrder(req.user.id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports.findOrderToShowOnWatchId = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const data = await services.order.findOrderOnWatchId(req.user.id, +watchId);
    res.json({
      message: "All Order On Market",
      AllBuyOrder: data[0],
      AllSaleOrder: data[1],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.placeBuyOrder = async (req, res, next) => {
  try {
    //check wallet buyer
    const checkWalletFromBuyer = await services.wallet.findWalletByUserId(
      req.user.id
    );
    const matchSaleOrder = await services.order.findSaleOrderToMatch(
      req.body.watchId,
      req.body.price,
      req.user.id
    );

    if (matchSaleOrder && matchSaleOrder.inventory.userId === req.user.id) {
      return res.status(400).json({
        message: "Cant Buy",
      });
    }
    if (checkWalletFromBuyer.amount < req.body.price) {
      return res.status(400).json({
        message: "Your Wallet is not enough",
      });
    } else if (matchSaleOrder) {
      //case match กัน สร้าง buy เจอ sale
      const data = await services.transaction.createTransactionFromBuyToSale(
        req.user.id,
        req.body,
        matchSaleOrder
      );

      //ส่งเมลให้คนขาย ว่า ขายสำเร็จ
      const foundSellerUser = await services.mail.getEmailUser(
        matchSaleOrder.inventoryId
      );
      const mailToSeller = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundSellerUser.user.email}`,
        subject: "You have sold an item on the Community Market",
        html: `
          <h1>WatchesPlus</h1>
          <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundSellerUser.referenceNumber}</div>
          <div style='padding-bottom: 10px'>Model : ${foundSellerUser.watch.modelName}</div>
          <div style='padding-bottom: 10px'>Brand : ${foundSellerUser.watch.brand.name}</div>
          <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
          <img style='padding-bottom: 10px' src="${foundSellerUser.watchImage}"/>
          <div style='padding-bottom: 10px'>Good luck</div>
          `,
      });

      //ส่งเมลให้คนซื้อว่า ของเข้าสำเร็จ
      const foundBuyerInventory = await services.mail.getEmailUser(data[1].id);
      const mailToBuyer = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundBuyerInventory.user.email}`,
        subject: "Thank you for your Community Market purchase",
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundBuyerInventory.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundBuyerInventory.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundBuyerInventory.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundBuyerInventory.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `,
      });

      return res.json({
        message: "Create Transfer Transaction",
        data: data[0],
      });
    } else {
      //case ไม่ match หาไม่เจอ
      const data = await services.order.createBuyOrder(
        checkWalletFromBuyer,
        req.body
      ); //data = [1.walletBuyer,2.dataBuyOrder]
      return res.json({
        message: "Place Buy Order Complete",
        data,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

module.exports.placeSaleOrder = async (req, res, next) => {
  try {
    const matchBuyOrder = await services.order.findBuyOrderToMatch(
      req.body.inventoryId,
      req.body.price
    );
    const foundInventory = await services.inventory.findWatchByInventoryId(
      req.body.inventoryId
    );
    if (!foundInventory) {
      //ของไม่มี
      return res.status(400).json({
        message: "Inventory Not Found",
      });
    } else if (matchBuyOrder) {
      //case match กัน สร้าง buy เจอ sale
      const data = await services.transaction.createTransactionFromSaleToBuy(
        req.user.id,
        req.body,
        matchBuyOrder
      );

       //ส่งเมลให้คนขาย ว่า ขายสำเร็จ
       const foundSellerUser = await services.mail.getEmailUser(
        req.body.inventoryId
      );
      const mailToSeller = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundSellerUser.user.email}`,
        subject: "You have sold an item on the Community Market",
        html: `
          <h1>WatchesPlus</h1>
          <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundSellerUser.referenceNumber}</div>
          <div style='padding-bottom: 10px'>Model : ${foundSellerUser.watch.modelName}</div>
          <div style='padding-bottom: 10px'>Brand : ${foundSellerUser.watch.brand.name}</div>
          <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
          <img style='padding-bottom: 10px' src="${foundSellerUser.watchImage}"/>
          <div style='padding-bottom: 10px'>Good luck</div>
          `,
      });

      //ส่งเมลให้คนซื้อว่า ของเข้าสำเร็จ
      const foundBuyerInventory = await services.mail.getEmailUser(data[1].id);
      const mailToBuyer = await transporter.sendMail({
        from: `"A BIG WatchesPlus+" <watchespluscc16@gmail.com>`,
        to: `${foundBuyerInventory.user.email}`,
        subject: "Thank you for your Community Market purchase",
        html: `
        <h1>WatchesPlus</h1>
        <div style='font-size:20px; padding-bottom: 10px'>Reference No. ${foundBuyerInventory.referenceNumber}</div>
        <div style='padding-bottom: 10px'>Model : ${foundBuyerInventory.watch.modelName}</div>
        <div style='padding-bottom: 10px'>Brand : ${foundBuyerInventory.watch.brand.name}</div>
        <div style='padding-bottom: 10px'>Watches more >> http://localhost:5173</div>
        <img style='padding-bottom: 10px' src="${foundBuyerInventory.watchImage}"/>
        <div style='padding-bottom: 10px'>Good luck</div>
        `,
      });

      return res.json({
        message: "Create Transfer Transaction",
        data : data[0],
      });
    } else {
      //case ไม่ match หาไม่เจอ
      const data = await services.order.createSaleOrder(
        req.user.id,
        req.body.inventoryId,
        req.body.price
      ); //updateSellerInventory,createSale
      return res.json({
        message: "Place Sale Order Complete",
        data,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

module.exports.cancelBuyOrder = async (req, res, next) => {
  try {
    const { buyOrderId } = req.params;
    const data = await services.order.updateBuyOrderToCancel(+buyOrderId);
    res.json({
      message: "Cancel BuyOrder and Refund Success",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

module.exports.cancelSaleOrder = async (req, res, next) => {
  try {
    const { saleOrderId } = req.params;
    const data = await services.order.updateSaleOrderToCancel(+saleOrderId);
    res.json({
      message: "Cancel saleOrder and Refund Inventory",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

module.exports.findMostOrder = async (req, res, next) => {
  try {
    const data = await services.order.findMostBuyOrderAndSaleOrder();
    res.status(200).json({
      message: "Get most buy and sale orders success",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
