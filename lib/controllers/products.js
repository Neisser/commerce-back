const store = require('../stores')
const response = require('../../network/utils/response')

const addProduct = async (req, res, next) => {
    try {
        const {
            name,
            description,
            stock,
            companyId,
            prices, //array object
            image,
            details, //object
            target //object
        } = req.body
        const product = {
            name,
            description,
            stock,
            companyId,
            prices,
            image,
            details,
            target
        }
        const dataResult = await store.products.addProduct(product)
        response.success(req, res, dataResult, 201)

    } catch (err) {
        next(err)
    }
}

const getProductsByCompanyId = async (req, res, next) => {
    try {
        const {
            idcompany: companyId
        } = req.params
        const {
            limit = 10,
            skip = 0
        } = req.query
        const payload = {
            companyId,
            limit: parseInt(limit),
            skip: parseInt(skip)
        }
        const dataResult = await store.products.getProductsByCompanyId(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const getFeaturedProducts = async (req, res, next) => {
    try {
        const {
            limit = 5,
            skip = 0
        } = req.query
        const payload = {
            limit: parseInt(limit),
            skip: parseInt(skip)
        }
        const dataResult = await store.products.getFeaturedProducts(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const searchProducts = async (req, res, next) => {
    try {
        const {
            limit = 5,
            skip = 0
        } = req.query
        const payload = {
            limit,
            skip
        }
        const dataResult = await store.products.searchProducts(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addProduct,
    getProductsByCompanyId,
    getFeaturedProducts,
    searchProducts
}
