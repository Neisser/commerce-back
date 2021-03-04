const store = require('../stores')
const response = require('../../network/utils/response')
const { addInvoice } = require('./invoices')
const { verifyCoupons, updateCoupons } = require('../controllers/coupons')
const { sendgridMail } = require('../../network/utils/sendgrid')
const { OrderGenerated } = require('../../network/templates')
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


        /**
         * verify coupon that will use
         */
        // await verifyCoupons(req, res, next)

        /**
     * Invoice add whit data required from order added
     */
        const dataInvoice = await addInvoice(req, res, next)

        const addOrder = {
            code,
            state: true,
            details,
            address,
            userId,
            companyId,
            couponsId,
            invoiceId: dataInvoice._id
        }

        /**
         * Orderd add whit data required
         */
        const dataOrder = await store.orders.addOrder(addOrder)
        const { _id } = dataOrder

        /**
         * Get data added
         */
        const getOrder = await store.orders.getOrder(_id)


        const dataResult = {
            getOrder,
            dataInvoice
        }

        /**
        * Turn off coupon used
        */
        await updateCoupons(req, res, next)

        const email = {
            to: getOrder[0].company.email,
            subject: 'Orden Realizada',
            template: OrderGenerated('username','https://clusthers.com/')
        }
        await sendgridMail(email)

        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const orderList = async (req, res, next) => {
    try {
        const { userId } = req.query

        const dataResult = await store.orders.orderList(userId)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}


const orderListCompany = async (req, res, next) => {
    try {
        const { companyId } = req.query

        const dataResult = await store.orders.orderListCompany(companyId)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

module.exports = {
    addOrder,
    orderList,
    orderListCompany
}