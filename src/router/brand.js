const express = require("express")
const c = require('../controller')
const authenticate = require("../middlewares/authenticate")
const authenticateAdmin = require("../middlewares/authenticateAdmin")
const brandRoute = express.Router()

brandRoute.use(authenticate,authenticateAdmin)

brandRoute.get('/',c.brand.getAll)
brandRoute.get('/:brandId',c.brand.getOne)
brandRoute.post('/',c.brand.addBrand)
brandRoute.patch('/:brandId',c.brand.editBrand)
brandRoute.delete('/:brandId',c.brand.deleteBrand)



module.exports = brandRoute