const services = require("../services");
const utils = require("../utils");
const { CustomError } = require("../config/error");

module.exports.placeBuyOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    //check wallet buyer
    const checkWalletFromBuyer = await services.wallet.findWalletByUserId(
      req.body.watchId
    );
    const matchSaleOrder = await services.order.findSaleOrderToMatch(
      req.body.watchId,
      req.body.price
    );
    if (checkWalletFromBuyer.amount < req.body.price) {
      res.status(400).res.json({
        message: "Your Wallet is not enough",
        data,
      });
    } else if (matchSaleOrder) {
      //case match กัน สร้าง buy เจอ sale
      const data = await services.transaction.createTransactionFromBuyToSale(
        req.user.id,
        req.body,
        matchSaleOrder
      );
      res.json({
        message: "Create Transfer Transaction",
        data,
      });
    } else {
      //case ไม่ match หาไม่เจอ
      const data = await services.order.createBuyOrder(checkWalletFromBuyer,req.body); //data = [1.walletBuyer,2.dataBuyOrder]
      res.json({
        message: "Place Buy Order Complete",
        data,
      });
    }
  } catch (err) {
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
      res.json({
        message: "Inventory Not Found",
      });
    } else if (matchBuyOrder) {
      //case match กัน สร้าง buy เจอ sale
      const data = await services.transaction.createTransactionFromSaleToBuy(
        req.user.id,
        req.body,
        matchBuyOrder
      );
      res.json({
        message: "Create Transfer Transaction",
        data,
      });
    } else {
      //case ไม่ match หาไม่เจอ
      const data = await services.order.createSaleOrder(
        req.user.id,
        req.body.inventoryId,
        req.body.price
      ); //updateSellerInventory,createSale
      res.json({
        message: "Place Sale Order Complete",
        data,
      });
    }
  } catch (err) {
    next(err);
  }
  return;
};
