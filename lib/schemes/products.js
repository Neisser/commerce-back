const joi = require('@hapi/joi')

const productIdSchemes = joi.string().max(30)
const nameSchemes = joi.string().max(100)
const descriptionSchemes = joi.string().max(500)
const stockSchemes = joi.number().min(1)
const companyIdSchemes = joi.string().max(30)
const userIdSchemes = joi.string().max(30)
const pricesSchemes = joi.array().items(
        joi.object({
            unit_price: joi.number().required().min(1),
            min_stock: joi.number().required().min(1),
            max_stock: joi.number().required().min(1),
            description: joi.string().max(500),
        })
    ).min(1)
const imagesSchemes = joi.array().items(joi.string())
const colorsSchemes = joi.array().items(joi.string())
const sizesSchemes = joi.array().items(joi.string())
const materialsSchemes = joi.array().items(joi.string())
const detailsSchemes = joi.object({
        colors: colorsSchemes,
        sizes: sizesSchemes,
        materials: materialsSchemes
    }).min(1)
const targetSchemes = joi.object({
        age: joi.array().items(joi.string()),
        gender: joi.array().items(joi.string())
    }).min(1)
const limitSchemes = joi.number().min(1)
const skipSchemes = joi.number()
const commentSchemes = joi.string().max(200)
const rateSchemes = joi.number().min(1).max(5)


// Add product Schemes
const addProductSchemes = joi.object({
    name: nameSchemes.required(),
    description: descriptionSchemes,
    companyId: companyIdSchemes.required(),
    images: imagesSchemes,
    stock: stockSchemes.required(),
    prices: pricesSchemes.required(),
    details: detailsSchemes.required(),
    target: targetSchemes.required()
})

// Add Comments Schemes
const commentsSchemes = joi.object({
        userId: userIdSchemes.required(),
        comment: commentSchemes.required(),
        rate: rateSchemes.required()
    })

// Update poducts Schemes
const updateProductSchemes = joi.object({
    name: nameSchemes,
    description: descriptionSchemes,
    companyId: companyIdSchemes,
    images: imagesSchemes,
    stock: stockSchemes,
    prices: pricesSchemes,
    details: detailsSchemes,
    target: targetSchemes
})

// ProductId Schemes
const idproductSchemes = joi.object({
    idproduct: productIdSchemes.required(),
})

// CompanyId Schemes
const idcompanySchemes = joi.object({
    idcompany: companyIdSchemes.required(),
})

// Paginator Schemes
const paginatorSchemes = joi.object({
    limit: limitSchemes,
    skip: skipSchemes
})

// Filters Schemes
const filtersSchemes = joi.object({
    colors: colorsSchemes,
    sizes: sizesSchemes,
    materials: materialsSchemes
})

// Paginator Schemes
const searchSchemes = joi.object({
    search: nameSchemes.required(),
    limit: limitSchemes,
    skip: skipSchemes
})

module.exports = {
    addProductSchemes,
    idcompanySchemes,
    paginatorSchemes,
    searchSchemes,
    idproductSchemes,
    filtersSchemes,
    updateProductSchemes,
    commentsSchemes
}