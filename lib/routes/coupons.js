const express = require('express')
const router = express.Router()
const { couponsController } = require('../controllers')
const { addCoupons } = require('../schemas/coupons')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')


router.post('/coupons',
    validationHandler(addCoupons, 'body'),
    couponsController.addCoupons)



module.exports = router