const joi = require('@hapi/joi')
const {
    codeInvoiceSchema,
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
const addressSchema = joi.object({
    name: joi.string(),
    address: joi.string(),
    optional: joi.string(),
    country: joi.string(),
    province: joi.string(),
    city: joi.string(),
    location: joi.string(),
    neighborhood: joi.string(),
    postal_code: joi.number(),
    contact: joi.string()
})
  
const detailsSchema = joi.array().items({
    productId: joi.string().hex(),
    detailsProduct:joi.array().items({
        quantity: joi.number().required(),
        unit_price: joi.number().required(),
        color: joi.string(),
        size: joi.string(),
        material: joi.string(),
        gender: joi.string(),
        age: joi.string()
    }).required()

})

const userIdSchema = joi.string().hex()
const companyIdSchema = joi.string().hex()
const couponsIdSchema = joi.string().hex()

const orderAdd = joi.object({
    details: detailsSchema.required(),
    companyId: companyIdSchema.required(),
    userId: userIdSchema.required(),
    couponsId: couponsIdSchema,
    code: codeSchema,
    codeInvoice:codeInvoiceSchema,
    total:totalSchema.required(),
    url:urlSchema,
    address:addressSchema.required()
})


const ordersList = joi.object({
    userId:userIdSchema.required()
})

const ordersListCompany = joi.object({
    companyId:companyIdSchema.required()
})

module.exports = {
    orderAdd,
    ordersList,
    ordersListCompany
}