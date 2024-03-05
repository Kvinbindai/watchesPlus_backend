const services = require("../services");
require("dotenv").config();

var omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

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
      await services.wallet.topUpWalletByUserId(req.user.id, charge.net / 100);
      res.status(200).send({ message: "Top-up Success" });
    }
  } catch (error) {
    res.status(400).send({ message: "Top-up Failed" });
  }
};

module.exports.withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const transfer = await omise.transfers.create({ amount: amount * 100 });
    console.log(transfer);
    await services.wallet.withdrawWalletByUserId(req.user.id, amount);
  } catch (error) {
    res.status(400).send({ message: "Withdraw Failed" });
  }
};

module.exports.getWalletByUserId = async (req, res, next) => {
  try {
    const wallet = await services.wallet.findWalletByUserId(req.user.id);
    res.status(200).send(wallet);
  } catch (error) {
    console.log(error);
  }
};
