const store = require('../stores')
const addInvoice = async (req, res, next) => {

    try {
        const {
            orderId,
            companyId,
            userId,
            couponsId,
            total,
            codeInvoice,
            url,
        } = req

        const invoice = {
            code: codeInvoice,
            userId,
            companyId,
            couponsId,
            orderId,
            total,
            url
        }

        const dataResult = await store.invoices.addInvoice(invoice)
        console.log(dataResult)
        return dataResult
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addInvoice
}