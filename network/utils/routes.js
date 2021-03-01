const express = require('express');
const routes = require('../../lib/routes')
const router = express.Router();


// router.use(routes.companies)
// router.use(routes.categories)
// router.use(routes.invoices)
// router.use(routes.notifications)
router.use(routes.products)
router.use(routes.coupons)
router.use(routes.users)
// router.use(routes.reports)
// router.use(routes.roles)

module.exports = router
