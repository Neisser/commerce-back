const express = require('express')
const router = express.Router()
const { ordersController } = require('../controllers')
const { orderAdd, ordersList, ordersListCompany } = require('../schemes/orders')
const { validationHandler } = require('../../network/handlers/validation_handlers')
require('../../network/strategies/jwt')
const passport = require('passport')
const RoleAuth = require('../../network/strategies/auth')


router.post('/orders',
    validationHandler(orderAdd, 'body'),
    ordersController.addOrder)


router.get('/orders',
    passport.authenticate('jwt', {session: false}),
    RoleAuth.authClient,
    validationHandler(ordersList, 'query'),
    ordersController.orderList)

router.get('/orders/company',
    passport.authenticate('jwt', {session: false}),
    RoleAuth.authProvider,
    validationHandler(ordersListCompany, 'query'),
    ordersController.orderListCompany)




module.exports = router