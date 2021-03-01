const joi = require('@hapi/joi')
const {
    codeInvoiceSchema,
    ivaSchema,
    payment_feeSchema,
    platform_feeSchema,
    subtotalSchema,
    totalSchema,
    urlSchema
} = require('./invoices')
const codeSchema = joi.string()
const trackingSchema = joi.object({
    stage1: joi.boolean(),
    stage2: joi.boolean(),
    stage3: joi.boolean(),
    stage4: joi.boolean()
})
const detailsSchema = joi.array().items({
    productId: joi.string().hex(),
    quantity: joi.number(),
    unit_price: joi.number()

})
const delivery_instructionSchema = joi.string()
const userIdSchema = joi.string().hex()
const companyIdSchema = joi.string().hex()
const couponsIdSchema = joi.string().hex()

const addOrder = joi.object({
    details: detailsSchema.required(),
    companyId: companyIdSchema.required(),
    userId: userIdSchema.required(),
    couponsId: couponsIdSchema,
    code: codeSchema,
    codeInvoice:codeInvoiceSchema,
    iva:ivaSchema,
    payment_fee:payment_feeSchema.required(),
    platform_fee:platform_feeSchema.required(),
    subtotal:subtotalSchema.required(),
    total:totalSchema.required(),
    url:urlSchema,
    delivery_instruction:delivery_instructionSchema

})

module.exports = {
    addOrder
}