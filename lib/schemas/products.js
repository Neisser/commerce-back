const joi = require('@hapi/joi')

const productIdSchema = joi.string().max(30)
const nameSchema = joi.string().max(100)
const descriptionSchema = joi.string().max(500)
const stockSchema = joi.number().min(1)
const companyIdSchema = joi.string().max(30)
const pricesSchema = joi.array().items(
        joi.object({
            unit_price: joi.number().required().min(1),
            amount: joi.number().required().min(1),
            description: joi.string().max(500),
        })
    ).min(1)
const colorsSchema = joi.array().items(joi.string())
const sizesSchema = joi.array().items(joi.string())
const materialsSchema = joi.array().items(joi.string())
const detailsSchema = joi.object({
        colors: colorsSchema,
        sizes: sizesSchema,
        materials: materialsSchema
    }).min(1)
const targetSchema = joi.object({
        age: joi.array().items(joi.string()),
        gender: joi.array().items(joi.string())
    }).min(1)
const limitSchema = joi.number().min(1)
const skipSchema = joi.number()

// Add product Scheme
const addProductSchema = joi.object({
    name: nameSchema.required(),
    description: descriptionSchema,
    companyId: companyIdSchema.required(),
    stock: stockSchema.required(),
    prices: pricesSchema.required(),
    details: detailsSchema.required(),
    target: targetSchema.required()
})

// ProductIdSchema
const idproductSchema = joi.object({
    idproduct: productIdSchema.required(),
})

// CompanyIdSchema
const idcompanySchema = joi.object({
    idcompany: companyIdSchema.required(),
})

// PaginatorSchema
const paginatorSchemes = joi.object({
    limit: limitSchema,
    skip: skipSchema
})

// FiltersSchemes
const filtersSchemes = joi.object({
    colors: colorsSchema,
    sizes: sizesSchema,
    materials: materialsSchema
})

// PaginatorSchema
const searchSchemes = joi.object({
    search: nameSchema.required(),
    limit: limitSchema,
    skip: skipSchema
})

module.exports = {
    addProductSchema,
    idcompanySchema,
    paginatorSchemes,
    searchSchemes,
    idproductSchema,
    filtersSchemes
}