const express = require('express');
const router = express.Router();

const products = require('../lib/products/routes')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use(products)

module.exports = router;
