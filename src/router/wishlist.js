const authenticate = require("../middlewares/authenticate")

const wishlistRoute = express.Router()

const wishlistController = require("../controller/wishlist-controller")

wishlistRoute.get("/wishlist", authenticate, wishlistController.getWishlist)
wishlistRoute.delete("/wishlist/delete/:id", wishlistController.deleteWishlist)

module.exports = wishlistRoute