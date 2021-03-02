const joi = require('@hapi/joi')

const codeInvoiceSchema = joi.string()
const totalSchema = joi.number()
const urlSchema = joi.string().uri()


module.exports ={
    codeInvoiceSchema,
    totalSchema,
    urlSchema
}