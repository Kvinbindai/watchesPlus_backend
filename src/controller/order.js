const services = require("../services");
const { CustomError } = require("../config/error");

module.exports.placeBuyOrder = async (req, res, next) => {
  try {
    //check wallet buyer
    const checkWalletFromBuyer = await services.wallet.findWalletByUserId(
      req.user.id
    );
    const matchSaleOrder = await services.order.findSaleOrderToMatch(
      req.body.watchId,
      req.body.price
    );
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
      return res.json({
        message: "Create Transfer Transaction",
        data,
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
      return res.json({
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

module.exports.cancelBuyOrder = async (req,res,next) => {
  try{
    const { buyOrderId } = req.params
    const data = await services.order.updateBuyOrderToCancel(+buyOrderId)
    res.json({
      message : "Cancel BuyOrder and Refund Success",
      data
    })
  }catch(err){
    console.log(err)
    next(err)
  }
  return
}

module.exports.cancelSaleOrder = async (req,res,next) => {
  try{
    const { saleOrderId } = req.params
    const data = await services.order.updateSaleOrderToCancel(+saleOrderId)
    res.json({
      message : "Cancel saleOrder and Refund Inventory",
      data
    })
  }catch(err){
    console.log(err)
    next(err)
  }
  return
}
