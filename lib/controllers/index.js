const productsController = require('./products')
const usersController = require('./users')
const couponsController = require('./coupons')
const ordersController = require('./orders')
const companiesController = require('./companies')
const uploaderController = require('./uploader')
const invoicesController = require('./invoices')
const paymentsController = require('./payments')
module.exports = {
    productsController,
    usersController,
    couponsController,
    ordersController,
    uploaderController,
    companiesController,
    invoicesController,
    paymentsController
};