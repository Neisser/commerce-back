const express = require('express')
const router = express.Router()

const { productsController } = require('../controllers')

router.post('/products', productsController.create) //ADD
// router.get('/products', productsController.get)   //GET
// router.patch('/products', productsController.update)  //UPDATE

module.exports = router;