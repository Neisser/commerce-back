const store = require('../stores')
const response = require('../../network/utils/response')
const boom = require('@hapi/boom')


const addCoupons = async (req, res, next) => {
    try {
        const { code, percentage } = req.body
        const coupon = {
            code,
            percentage,
            state:true
        }
        const dataResult = await store.coupons.addCoupons(coupon)
        response.success(req, res, dataResult, 200)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCoupons
}