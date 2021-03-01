const joi = require('@hapi/joi')


const limitSchemes = joi.number().min(1)
const skipSchemes = joi.number()

// Paginator Schemes
const paginatorSchemes = joi.object({
    limit: limitSchemes,
    skip: skipSchemes
})

module.exports = {
    paginatorSchemes
}