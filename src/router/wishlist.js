const {Router} = require('express')

const wishlistRoute = Router()

const c = require("../controller")

const authenticate = require("../../src/middlewares/authenticate")
// const { Router } = require("express")

// wishlistRoute.get("/wishlist", authenticate, wishlistController.getWishlist)
// wishlistRoute.delete("/wishlist/delete/:id", wishlistController.deleteWishlist)


wishlistRoute.post("/:watchId" , authenticate, c.wishlist.addWatchToWishlist)
wishlistRoute.delete("/:watchId" , authenticate, c.wishlist.deleteWatchFromWishlist)

module.exports = wishlistRoute