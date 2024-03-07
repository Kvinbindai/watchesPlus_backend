const catchError = require("../utils/catch-error");
const wishlistService = require("../services/wishlist-service");

// exports.getAllWishlists = catchError(async (req, res, next) => {
//     const wishlist = await wishlistService.findWishlish()
//     res.status(200).json({ wishlist })
// })

// exports.deleteWishlist = catchError(async (req, res ,next) => {
//     const wishlistId = req.params.wishlistId
//     const deleteWishlist = await wishlistService.deleteWishlist(wishlistId)
//     res.status(200).json({
//         success: true,
//         message: 'Wishlish deleted',
//         deleteWishlist: deleteWishlist,
//     })
// })

exports.addWatch = catchError(async (req, res, next) => {
  const userId = req.user.id; // คาดว่า req.user จะมีข้อมูลของผู้ใช้ที่ได้รับจาก middleware authenticate

  const watchId = +req.params.watchId;
  const watch = await wishlistService.findLike(userId, watchId)
  if(!watch){
    const addWatch = await wishlistService.addWatch(userId, watchId);

  res.status(200).json({
    success: true,
    message: "Watch Added",
    addWatch: addWatch,
  });
  return
  }

  // console.log(watchId)
  res.status(200).json({
    message:'false'
  });
  
});

exports.deleteWatch = catchError(async (req, res, next) => {
  const userId = +req.user.id; // คาดว่า req.user จะมีข้อมูลของผู้ใช้ที่ได้รับจาก middleware authenticate

  const watchId = +req.params.watchId;
  const watch = await wishlistService.findLike(userId, watchId)
  console.log(watch)
  if(watch){
    const deleteWatch = await wishlistService.deleteWatch(watch.id);
    res.status(200).json({
      success: true,
      message: "Watch Deleted",
      deleteWatch: deleteWatch,
    });
    return
  }
  // console.log(watchId)
//   const deleteWatch = await wishlistService.deleteWatch(watch.id);
  res.status(200).json({
    message:'false'
  });
});
