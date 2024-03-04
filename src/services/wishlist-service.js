const prisma = require("../models/prisma");

exports.findWishlish = async() => {
    const wishlists = await prisma.wishlist.findmany(
        {
            include: {user: true}
        }
    )
    return wishlists
}

exports.deleteWishlist = async(wishlistId) => {
    const wishlistIdInt = parseInt(wishlistId, 10)
        const deleteWishlist = await prisma.wishlist.delete({
            where: {
                id: wishlistIdInt
            }
        })
        return deleteWishlist
}