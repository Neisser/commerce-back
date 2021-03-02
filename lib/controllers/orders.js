const store = require('../stores')
const response = require('../../network/utils/response')
const boom = require('@hapi/boom')

const addOrder = async (req, res, next) => {

    try {
        const {
            details,
            companyId,
            userId,
            couponsId,
            code,
            codeInvoice,
            iva,
            payment_fee,
            platform_fee,
            subtotal, total,
            url,
            delivery_instruction
        } = req.body

        const addOrder = {
            code,
            state:true,
            details,
            delivery_instruction,
            userId,
            companyId,
            couponsId
        }
        const dataResult = await store.orders.addOrder(addOrder)
        response.success(req, res, dataResult, 200)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addOrder
}