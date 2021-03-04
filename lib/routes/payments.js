const express = require('express')
const router = express.Router()
const { paymentsController } = require('../controllers')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')



router.post('/payments',
    paymentsController.addMethodPayment)

router.post('/payments/pay',
    paymentsController.paymentsEx)




module.exports = router