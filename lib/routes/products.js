const express = require('express')
const router = express.Router()
const schemas = require('../schemas/products')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { productsController } = require('../controllers')

router.post('/products',
validationHandler(schemas.addProductSchema, 'body'),
productsController.addProduct) //ADD

router.get('/products/:idcompany',
validationHandler(schemas.idcompanySchema, 'params'),
validationHandler(schemas.paginatorSchemes, 'query'),
productsController.getProductsByCompanyId) //ADD

// router.get('/products', productsController.getProducts)   //GET
// // router.patch('/products', productsController.update)  //UPDATE

module.exports = router