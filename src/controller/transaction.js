
const services = require('../services')


module.exports.getAllTransactionByWatchId = async(req,res,next)=>{
    try{
        const {watchId} = req.params
        const data = await services.transaction.getAllTransactionFromWatchId(+watchId)
        res.json({
            message : "All Transaction By WatchId",
            data
        })
    }catch(err){
        next(err)
    }
    return 
}
