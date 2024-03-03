const services = require("../services");
const utils = require("../utils");
const { CustomError } = require("../config/error");

module.exports.placeBuyOrder = async (req, res, next) => {
  try {
    const matchSaleOrder = await prisma.saleOrder.findFirst({
      where: {
        price: body.price,
        inventory: {
          watchId: body.watchId,
        },
      },
      include : {
        inventory : { //inventory.user.wallet.id //inventory.user.wallet.amount
          include : {
            user : {
              include : {
                wallet : {
                  id : true,
                }
              }
            }
          }
        }
      }
    });
    console.log(matchSaleOrder)
    if (matchSaleOrder) {
        //case match กัน สร้าง buy เจอ sale
        const data = await services.transaction.createTransactionFromBuyToSale(req.user.id,req.body,matchSaleOrder)
        res.json({
            message : "Create Transfer Transaction",
            data
        })
    } else {
      //case ไม่ match หาไม่เจอ
      const data = await services.order.createBuyOrder(req.user.id, req.body); //data = [1.walletBuyer,2.dataBuyOrder]
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

module.exports.placeSellOrder = async (req, res, next) => {
  try {
    const data = await services.order.createSaleOrder(req.body);
    res.json({
      message: "Create Sell Order Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};
