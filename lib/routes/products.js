const express = require('express')
const router = express.Router()
const schemes = require('../schemes/products')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { productsController } = require('../controllers')
const passport = require('passport')

// Create new Products
router.post('/products',
validationHandler(schemes.addProductSchemes, 'body'),
productsController.addProduct)

// Get products by id
router.get('/products/:idproduct',
validationHandler(schemes.idproductSchemes, 'params'),
productsController.getProductsById)

// update products by id
router.patch('/products/:idproduct',
validationHandler(schemes.idproductSchemes, 'params'),
validationHandler(schemes.updateProductSchemes, 'body'),
productsController.updateProduct)

// Get featured products
router.get('/home/products/featured-products',
validationHandler(schemes.paginatorSchemes, 'query'),
productsController.getFeaturedProducts)

// Get all products by companyId
router.get('/company/:idcompany/products',
validationHandler(schemes.idcompanySchemes, 'params'),
validationHandler(schemes.paginatorSchemes, 'query'),
validationHandler(schemes.filtersSchemes, 'body'),
productsController.getProductsByCompanyId)

// search products
router.get('/home/products/search',
validationHandler(schemes.searchSchemes, 'query'),
productsController.searchProducts)



// router.get('/products', productsController.getProducts)   //GET
// // router.patch('/products', productsController.update)  //UPDATE

module.exports = router