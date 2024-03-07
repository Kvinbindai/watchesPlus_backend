const {Router} = require('express')

const wishlistRoute = Router()

const wishlistController = require("../controller/wishlist-controller")

const authenticate = require("../../src/middlewares/authenticate")
// const { Router } = require("express")

// wishlistRoute.get("/wishlist", authenticate, wishlistController.getWishlist)
// wishlistRoute.delete("/wishlist/delete/:id", wishlistController.deleteWishlist)


wishlistRoute.post("/:watchId" , authenticate, wishlistController.addWatch)
wishlistRoute.delete("/:watchId" , authenticate, wishlistController.deleteWatch)

module.exports = wishlistRoute