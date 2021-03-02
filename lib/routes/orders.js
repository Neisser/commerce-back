const express = require('express')
const router = express.Router()
const { ordersController } = require('../controllers')
const { orderAdd } = require('../schemes/orders')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')



router.post('/orders',
    validationHandler(orderAdd, 'body'),
    ordersController.addOrder)


module.exports = router