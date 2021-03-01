const express = require('express')
const router = express.Router()
const schemas = require('../schemas/products')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { productsController } = require('../controllers')
const passport = require('passport')

// Create new Products
router.post('/products',
validationHandler(schemas.addProductSchema, 'body'),
productsController.addProduct)

// Get products by id
router.get('/products/:idproduct',
validationHandler(schemas.idproductSchema, 'params'),
productsController.getProductsById)

// Get featured products
router.get('/home/products/featured-products',
validationHandler(schemas.paginatorSchemes, 'query'),
productsController.getFeaturedProducts)

// Get all products by companyId
router.get('/company/:idcompany/products',
validationHandler(schemas.idcompanySchema, 'params'),
validationHandler(schemas.paginatorSchemes, 'query'),
validationHandler(schemas.filtersSchemes, 'body'),
productsController.getProductsByCompanyId)

// search products
router.get('/home/products/search',
validationHandler(schemas.searchSchemes, 'query'),
productsController.searchProducts)



// router.get('/products', productsController.getProducts)   //GET
// // router.patch('/products', productsController.update)  //UPDATE

module.exports = router