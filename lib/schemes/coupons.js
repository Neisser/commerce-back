const joi = require('@hapi/joi')

const codeSchema = joi.string().min(6)
const percentageSchema = joi.number()

const addCoupons = joi.object({
    code:codeSchema.required(),
    percentage:percentageSchema.required()
})

module.exports={
    addCoupons
}