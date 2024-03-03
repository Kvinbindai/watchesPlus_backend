const services = require("../services")


module.exports.getAll = async (req,res,next)=>{
    try{
        const data = await services.brand.getAll()
         res.json({
            message : "Get All Brand Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.getOne = async (req,res,next)=>{
    try{
        const { brandId} = req.params
        const data = await services.brand.getBrandById(+brandId)
        res.json({
            message : "Get One Brand Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.addBrand = async(req,res,next)=>{
    try{
        const data = await services.brand.createBrand(req.body)
       res.json({
            message : "Create Brand Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.editBrand = async(req,res,next)=>{
    try{
        const { brandId} = req.params
        const data = await services.brand.updateBrand(+brandId,req.body)
         res.json({
            message : "Update Brand Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}

module.exports.deleteBrand = async(req,res,next)=>{
    try{
        const { brandId} = req.params
        await services.brand.removeBrand(+brandId)
         res.json({
            message : "Delete Brand Complete",
        })
    }catch(err){
        next(err)
    }
    return
}