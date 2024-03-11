const services = require('../services/index')


exports.getAddressFromInventoryId = async (req,res,next) =>{
    try{
        const { inventoryId } = req.params
        const data = await services.address.getAddressByInventoryId(+inventoryId)
        res.json({
            message : "Your Address From InventoryId",
            data
        })
    }catch(err){
        console.log(err)
        next(err)
    }
    return
}

exports.addAddressAndShippingOrder = async (req,res,next) => {
    try{
        console.log(req.body)
        const data = await services.address.createAddressAndShippingOrder(req.user.id,req.body)
        res.json({
            message : "Add Address Complete",
            data
        })
    }catch(err){
        console.log(err)
        next(err)
    }
    return
}

exports.cancelShippingAndUpdateInventoryBack = async (req,res,next)=>{
    try{
        console.log(req.body)
        const data = await services.address.cancelShippingBeforeAdminAddTracking(req.body)
        res.json({
            message : "Cancel Shipping Complete",
            data
        })
    }catch(err){
        console.log(err)
        next(err)
    }
    return
}

exports.updateAddressWhereAddressId = async (req,res,next)=>{
    try{
        console.log(req.body,'asdadasdasdasdas')
        // console.log(req.params)
        const { addressId } = req.params
        const data = await services.address.updateAddressByInventoryId(+addressId,req.body)
        res.json({
            message : "Update Address Complete",
            data
        })
    }catch(err){
        console.log(err)
        next(err)
    }
    return
}