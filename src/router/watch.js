const express = require("express")
const c = require('../controller')
const authenticate = require("../middlewares/authenticate")
const authenticateAdmin = require("../middlewares/authenticateAdmin")
const watchRoute = express.Router()

watchRoute.get('/',c.watch.getAll)
watchRoute.post('/:watchId',c.watch.createWatch)
watchRoute.post('/',authenticate,authenticateAdmin,c.watch.createWatch)
watchRoute.patch('/:watchId',authenticate,authenticateAdmin,c.watch.editWatch)



module.exports = watchRoute