const joi = require('@hapi/joi')

const emailSchema = joi.string().email()
const first_nameSchema = joi.string().max(15)
const last_nameSchema = joi.string().max(15)
const passwordSchema = joi.string().min(8)
const phoneSchema = joi.string().max(13)
const profile_pictureSchema = joi.string().base64()
const dniSchema = joi.number()
const _idSchema = joi.string().hex()
const addressSchema = joi.array().items(
    joi.object({
        name:joi.string(),
        address:joi.string(),
        optional :joi.string().allow(''),
        country :joi.string(),
        province:joi.string(),
        city: joi.string(),
        location:joi.string(),
        neighborhood: joi.string().allow(''),
        postal_code: joi.number(),
        contact: joi.string().allow('')

    })
)

const addUser = joi.object({

    email:emailSchema.required(),
    first_name:first_nameSchema.required(),
    last_name: last_nameSchema.required(),
    password:passwordSchema.required()

})

const updateUserProfile = joi.object({
    first_name:first_nameSchema.required(),
    last_name: last_nameSchema.required(),
    phone:phoneSchema,
    dni:dniSchema,
    address:addressSchema,
    _id:_idSchema.required()
})
module.exports = {
    addUser,
    updateUserProfile
}