const store = require('../stores')
const response = require('../../network/utils/response')
const {config} = require('../../config')

const addProduct = async (req, res, next) => {
    try {
        const {
            name,
            description,
            stock,
            companyId,
            prices, //array object
            images = [], // array
            details, //object
            target //object
        } = req.body
        if(!images || images.length===0) images.push(config.defaultProductImg)
        const product = {
            name,
            description,
            stock,
            companyId,
            prices,
            images,
            details,
            target
        }
        const dataResult = await store.products.addProduct(product)
        response.success(req, res, dataResult, 201)

    } catch (err) {
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const {
            idproduct: protuctId
        } = req.params
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
        const payload = {
            protuctId,
            name,
            description,
            stock,
            companyId,
            prices,
            image,
            details,
            target
        }
        const dataResult = await store.products.updateProduct(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const addComments = async (req, res, next) => {
    try {
        const {
            idproduct: productId
        } = req.params
        const {
            userId,
            comment,
            rate
        } = req.body
        const payload = {
            productId,
            userId,
            comment,
            rate
        }
        const dataResult = await store.products.addComments(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const getProductsById = async (req, res, next) => {
    try {
        const {
            idproduct: productId
        } = req.params
        const payload = {
            productId
        }
        const dataResult = await store.products.getProductsById(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const getCommentsProductsById = async (req, res, next) => {
    try {
        const {
            idproduct: productId,
            limit = 10,
            skip = 0
        } = req.params
        const payload = {
            productId,
            limit: parseInt(limit),
            skip: parseInt(skip),
        }
        const dataResult = await store.products.getCommentsProductsById(payload)
        response.success(req, res, dataResult, 200)

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
        const {
            colors,
            sizes,
            materials
        } = req.body
        const payload = {
            companyId,
            limit: parseInt(limit),
            skip: parseInt(skip),
            colors,
            sizes,
            materials
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
            search,
            limit = 5,
            skip = 0
        } = req.query
        const payload = {
            search,
            limit: parseInt(limit),
            skip: parseInt(skip)
        }
        const dataResult = await store.products.searchProducts(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addProduct,
    updateProduct,
    getProductsByCompanyId,
    getFeaturedProducts,
    searchProducts,
    getProductsById,
    getCommentsProductsById,
    addComments
}
