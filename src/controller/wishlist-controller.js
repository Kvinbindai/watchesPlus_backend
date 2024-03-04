const catchError = require("../utils/catch-error")
const wishlistService = require("../services/wishlist-service")


exports.getAllWishlists = catchError(async (req, res, next) => {
    const wishlist = await wishlistService.findWishlish()
    res.status(200).json({ wishlist })
})

exports.deleteWishlist = catchError(async (req, res ,next) => {
    const wishlistId = req.params.wishlistId
    const deleteWishlist = await wishlistService.deleteWishlist(wishlistId)
    res.status(200).json({
        success: true,
        message: 'Wishlish deleted',
        deleteWishlist: deleteWishlist,
    })
})