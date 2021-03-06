const express = require('express')
const router = express.Router()
const schemes = require('../schemes/products')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { productsController } = require('../controllers')
const passport = require('passport')
const RoleAuth = require('../../network/strategies/auth')
// Create new Products
router.post('/products',
passport.authenticate('jwt', {session: false}),
RoleAuth.authProvider,
validationHandler(schemes.addProductSchemes, 'body'),
productsController.addProduct)

// Get products by id
router.get('/products/:idproduct',
validationHandler(schemes.idproductSchemes, 'params'),
productsController.getProductsById)

// update products by id
router.patch('/products/:idproduct',
RoleAuth.authProvider,
validationHandler(schemes.idproductSchemes, 'params'),
validationHandler(schemes.updateProductSchemes, 'body'),
productsController.updateProduct)

// Get featured products
router.get('/home/products/featured-products',
validationHandler(schemes.paginatorSchemes, 'query'),
productsController.getFeaturedProducts)

// Get all products by companyId
router.get('/companies/:idcompany/products',
validationHandler(schemes.idcompanySchemes, 'params'),
validationHandler(schemes.filtersSchemes, 'query'),
productsController.getProductsByCompanyId)

// search products
router.get('/home/products/search',
validationHandler(schemes.searchSchemes, 'query'),
productsController.searchProducts)


// Create new Comments
router.post('/products/:idproduct/comments',
RoleAuth.authClient,
validationHandler(schemes.idproductSchemes, 'params'),
validationHandler(schemes.commentsSchemes, 'body'),
productsController.addComments)

// Get comments by products by id
router.get('/products/:idproduct/comments',
validationHandler(schemes.idproductSchemes, 'params'),
productsController.getCommentsProductsById)



// router.get('/products', productsController.getProducts)   //GET
// // router.patch('/products', productsController.update)  //UPDATE

module.exports = router