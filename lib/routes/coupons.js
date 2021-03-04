const express = require('express')
const router = express.Router()
const { couponsController } = require('../controllers')
const { addCoupons } = require('../schemes/coupons')
const { validationHandler } = require('../../network/handlers/validation_handlers')
require('../../network/strategies/jwt')


router.post('/coupons',
    validationHandler(addCoupons, 'body'),
    couponsController.addCoupons)



module.exports = router