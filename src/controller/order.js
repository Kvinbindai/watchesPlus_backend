const services = require("../services")
const utils = require("../utils")
const { CustomError } = require("../config/error")

module.exports.placeBuyOrder = async(req,res,next)=>{
    try{
        console.log(req.user)
        const data = await services.order.createBuyOrder(req.body)
        return res.json({
            message : "Place Buy Order Complete",
            data
        })
    }catch(err){
        next(err)
    }
    return
}