const services =  require('../services')

exports.getAllByUserId = async (req,res,next)=>{
    try{
        const data = await services.inventory.myInventory(req.user.id)
        res.json({
            message : "My Inventory",
            data
        })

    }catch(err){
        next(err)
    }
    return
}

exports.getAllByUserIdAndWatchId = async ( req , res ,next) =>{
    try{
        const { watchId } = req.params
        const data = await services.inventory.myInventoryOnWatchId(req.user.id,+watchId)
        res.json({
            message: "Your Watch In Inventory",
            data
        })
    }catch(err){
        next(err)
    }
    return 
}

exports.addItemToInventory = async (req,res,next)=>{
    try{
        const data = await services.inventory.createItemInInventory(req.user.id,req.body.watchId)
        res.json({
            message : "Create Item Inventory Success",
            data
        })

    }catch(err){
        next(err)
    }
    return
}

exports.updateStatusItemInInventory = async (req,res,next)=>{
    try{
        const { inventoryId } = req.params
        const dataObj = {
            inventoryId : +inventoryId,
            body : req.body
        }
        const data = await services.inventory.updateStatusItem(dataObj)
        res.json({
            message : "Update Item Inventory Success",
            data
        })

    }catch(err){
        next(err)
    }
    return
}