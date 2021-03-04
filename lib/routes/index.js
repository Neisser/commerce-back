const products = require('./products');
const companies = require('./companies')
const orders = require('./orders')
const users = require('./users')
const coupons = require('./coupons')
const uploader = require('./uploader')
const payments = require('./payments')
// const invoices = require('./invoices')
// const notifications = require('./notifications')
// const products = require('./products')
// const reports = require('./reports')
// const roles = require('./roles')

module.exports = {
    products,
    users,
    coupons,
    orders,
    uploader,
    companies,
    payments
};