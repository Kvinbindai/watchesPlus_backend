const controller = {
  user: require("./user"),
  order: require("./order"),
  brand: require("./brand"),
  watch: require("./watch"),
  inventory: require("./inventory"),
  wallet: require("./wallet"),
  profile: require("./profile"),
  shipping: require("./shipping"),
  transaction: require('./transaction'),
  wishlist: require("./wishlist"),
  address: require("./address"),
  mail: require('./mail')
};
module.exports = controller;
