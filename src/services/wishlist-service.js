const prisma = require("../config/prisma");

// exports.findWishlish = async() => {
//     const wishlists = await prisma.wishlist.findmany(
//         {
//             include: {user: true}
//         }
//     )
//     return wishlists
// }

// exports.deleteWishlist = async(wishlistId) => {
//     const wishlistIdInt = parseInt(wishlistId, 10)
//         const deleteWishlist = await prisma.wishlist.delete({
//             where: {
//                 id: wishlistIdInt
//             }
//         })
//         return deleteWishlist
// }

exports.addWatch = async (userId, watchId) => {
  const watchIdInt = parseInt(watchId);
  const userIdInt = parseInt(userId);

  const addWatch = await prisma.wishlist.create({
    data: {
      // watch_id: watchIdInt,
      watchId: watchIdInt,
      userId: userIdInt,
      // user_id: userIdInt
    },
  });
  return addWatch;
};

exports.deleteWatch = async (watchId) => {
  const id = watchId
//   const userIdInt = parseInt(userId);
//   console.log(watchIdInt);
//   console.log(userIdInt);

  const deleteWatch = await prisma.wishlist.delete({
    where: {
      //   watchId: watchIdInt,
      //   userId: userIdInt,
    //   AND: [{ watchId: watchIdInt }, { userId: userIdInt }],
    id
    },
  });
  return deleteWatch;
};

exports.findLike = async (userId, watchId)=> await prisma.wishlist.findFirst({where:{userId, watchId}})