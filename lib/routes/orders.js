const express = require('express')
const router = express.Router()
const { ordersController } = require('../controllers')
const { orderAdd, ordersList, ordersListCompany } = require('../schemes/orders')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')



router.post('/orders',
    validationHandler(orderAdd, 'body'),
    ordersController.addOrder)


router.get('/orders',
    validationHandler(ordersList, 'query'),
    ordersController.orderList)

router.get('/orders/company',
    validationHandler(ordersListCompany, 'query'),
    ordersController.orderListCompany)




module.exports = router