const store = require('../stores')
const response = require('../../network/utils/response')
const { addInvoice } = require('./invoices')
const { verifyCoupons, updateCoupons } = require('../controllers/coupons')

const addOrder = async (req, res, next) => {
    try {
        const {
            details,
            companyId,
            userId,
            couponsId,
            code,
            address

        } = req.body

        const addOrder = {
            code,
            state: true,
            details,
            address,
            userId,
            companyId,
            couponsId
        }

    
        /**
         * verify coupon that will use
         */
       // await verifyCoupons(req, res, next)



        /**
         * Orderd add whit data required
         */
        const dataOrder = await store.orders.addOrder(addOrder)
        const { _id } = dataOrder

        /**
         * Get data added
         */
        const getOrder = await store.orders.getOrder(_id)

        const request = {
            ...req.body,
            orderId: _id
        }

        /**
         * Invoice add whit data required from order added
         */
        const dataInvoice = await addInvoice(request, res, next)
        const dataResult = {
            getOrder,  
            dataInvoice

        }


        /**
        * Turn off coupon used
        */
        await updateCoupons(req, res, next)

        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const orderList = async (req, res, next) => {
    try {
        const { } = req.query
        const dataResult = await store.orders.orderList()
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}
module.exports = {
    addOrder,
    orderList
}