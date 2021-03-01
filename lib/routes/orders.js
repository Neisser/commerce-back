const express = require('express')
const router = express.Router()
const { ordersController } = require('../controllers')
const { addOrder } = require('../schemas/orders')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')



router.post('/orders',
    validationHandler(addOrder, 'body'),
    ordersController.addOrder)


module.exports = router