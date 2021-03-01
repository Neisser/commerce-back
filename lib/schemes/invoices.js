const joi = require('@hapi/joi')

const ivaSchema = joi.number()
const codeInvoiceSchema = joi.string()
const subtotalSchema = joi.number()
const platform_feeSchema = joi.number()
const payment_feeSchema = joi.number()
const totalSchema = joi.number()
const urlSchema = joi.string().uri()


module.exports ={
    ivaSchema,
    codeInvoiceSchema,
    subtotalSchema,
    payment_feeSchema,
    platform_feeSchema,
    totalSchema,
    urlSchema
}