const express = require('express')
const router = express.Router()
const { addProduct } = require('../models/products')
const { productsController } = require('../controllers')

router.post('/products', productsController.addProduct) //ADD
// router.get('/products', productsController.get)   //GET
// router.patch('/products', productsController.update)  //UPDATE

module.exports = router;