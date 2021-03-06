const store = require('../stores')
const addInvoice = async (req, res, next) => {

    try {
        const {
            companyId,
            userId,
            couponsId,
            total,
            codeInvoice,
            url,
        } = req.body

        const invoice = {
            code: codeInvoice,
            userId,
            companyId,
            couponsId,
            total,
            url
        }
        const dataResult = await store.invoices.addInvoice(invoice)
            .then(async _id => await store.invoices.getInvoice(_id))
            .then(dataResult => dataResult)

       
        return dataResult

    } catch (err) {
        next(err)
    }
}



module.exports = {
    addInvoice
}