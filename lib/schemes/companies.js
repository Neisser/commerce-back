const joi = require('@hapi/joi')

const companyIdSchemes = joi.string().max(30)
const limitSchemes = joi.number().min(1)
const skipSchemes = joi.number()

// Paginator Schemes
const paginatorSchemes = joi.object({
    limit: limitSchemes,
    skip: skipSchemes
})

// Product id Schemes
const idcompanySchemes = joi.object({
    idcompany: companyIdSchemes.required()
})

module.exports = {
    paginatorSchemes,
    idcompanySchemes
}