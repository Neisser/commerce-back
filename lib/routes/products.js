const express = require('express')
const router = express.Router()
const schemas = require('../schemas/products')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { productsController } = require('../controllers')
const passport = require('passport')

router.post('/products',
    passport.authenticate('jwt', { session: false }),
    validationHandler(schemas.addProductSchema, 'body'),
    productsController.addProduct) //ADD

router.get('/products/:idcompany',
    passport.authenticate('jwt', { session: false }),
    validationHandler(schemas.idcompanySchema, 'params'),
    validationHandler(schemas.paginatorSchemes, 'query'),
    productsController.getProductsByCompanyId) //ADD

// router.get('/products', productsController.getProducts)   //GET
// // router.patch('/products', productsController.update)  //UPDATE

module.exports = router