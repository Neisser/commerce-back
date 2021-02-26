const express = require('express');
const router = express.Router();

const companies = require('../../lib/routes/companies')
const categories = require('../../lib/routes/categories')
const invoices = require('../../lib/routes/invoices')
const notifications = require('../../lib/routes/notifications')
const orders = require('../../lib/routes/orders')
const products = require('../../lib/routes/products')
const reports = require('../../lib/routes/reports')
const roles = require('../../lib/routes/roles')
const users = require('../../lib/routes/users')


router.use(companies)
router.use(categories)
router.use(invoices)
router.use(notifications)
router.use(orders)
router.use(products)
router.use(reports)
router.use(roles)
router.use(users)

module.exports = router
