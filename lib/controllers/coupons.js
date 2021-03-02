const store = require('../stores')
const response = require('../../network/utils/response')

const addCoupons = async (req, res, next) => {
    try {
        const { code, percentage } = req.body

        const coupon = {
            code,
            percentage,
            state: true
        }

        const dataResult = await store.coupons.addCoupons(coupon)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const updateCoupons = async (req, res, next) => {
    try {
        const { couponsId } = req.body

        await store.coupons.updateCoupons(couponsId)

    } catch (err) {
        next(err)
    }
}

const verifyCoupons = async (req, res, next) => {
    try {
        const { couponsId } = req.body
              
        const dataResult = await store.coupons.verifyCoupons(couponsId)
        if(dataResult){
            return true
        }

    } catch (err) {
        throw err
    }
}

module.exports = {
    addCoupons,
    updateCoupons,
    verifyCoupons
}