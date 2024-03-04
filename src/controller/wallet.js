const services = require("../services");
require("dotenv").config();

var omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

module.exports.getWalletByUserId = async (req, res, next) => {
  try {
    const wallet = await services.wallet.findWalletByUserId(req.user.id);
    res.status(200).send(wallet);
  } catch (error) {
    console.log(error);
  }
};

module.exports.topUp = async (req, res, next) => {
  try {
    const { token, amount } = req.body;

    const customer = await omise.customers.create({
      email: req.user.email,
      description: "Top-up",
      card: token,
    });

    const charge = await omise.charges.create({
      amount,
      currency: "thb",
      customer: customer.id,
    });

    if (charge.status === "successful") {
      const data = await services.wallet.updateWalletByUserId(
        req.user.id,
        charge.net / 100
      );
      console.log("Data --->", data);
    }
  } catch (error) {
    console.log(error);
  }
};
