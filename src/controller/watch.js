const services = require("../services")

module.exports.getAll = async(req,res,next)=>{
    try{
        const data = await services.watch.getAllWatch()
        return res.json({
            message : "Get All Watch Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.getWatchById = async(req,res,next)=>{
    try{
        const { watchId } = req.params
        const data = await services.watch.getOneWatch(watchId)
        return res.json({
            message : "Get All Watch Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}



module.exports.createWatch = async(req,res,next)=>{
    try{
        console.log(req.body)
        const data = await services.watch.addWatch(req.body)
        return res.json({
            message : "Create Watch Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.editWatch = async(req,res,next)=>{
    try{
        const { watchId } = req.params
        const data = await services.watch.updateWatch(+watchId,req.body)
        return res.json({
            message : "Update Watch Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.deleteWatch = async(req,res,next)=>{
    try{
        const { watchId } = req.params
        await services.watch.removeWatch(+watchId)
        return res.json({
            message : "Delete Watch Complete",
        })
    }catch(err){
        next(err)
    }
    return
}