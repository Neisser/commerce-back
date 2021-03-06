const { model } = require('../models/invoices')
const boom = require('@hapi/boom')
const mongoose = require('mongoose')

const addInvoice = async invoice => {
    try {
        const myModel = new model(invoice)
        const dataResult = await myModel.save().catch(err => boom.conflict('error al intentar guardar un invoice', err))
        return dataResult._id
    } catch (err) {
        throw err
    }

}

const getInvoice = async invoiceId => {
    try {
        const objectIdInvoiceId = mongoose.Types.ObjectId(invoiceId)
        return await model.findOne({'_id':objectIdInvoiceId}).catch(err => boom.conflict('error interno al traer las facturas desde la base de datos', err))
       
    } catch (err) {
        throw err
    }
}


module.exports = {
    addInvoice,
    getInvoice
}
