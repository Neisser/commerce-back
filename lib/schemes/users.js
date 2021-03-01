const joi = require('@hapi/joi')

const emailSchema = joi.string().email()
const first_nameSchema = joi.string().max(15)
const last_nameSchema = joi.string().max(15)
const passwordSchema = joi.string().min(8)
const addUser = joi.object({

    email:emailSchema.required(),
    first_name:first_nameSchema.required(),
    last_name: last_nameSchema.required(),
    password:passwordSchema.required()

})

module.exports = {
    addUser
}