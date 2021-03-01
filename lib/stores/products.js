const mongoose = require('mongoose')
const { model } = require('../models/products')
const boom = require('@hapi/boom')

const addProduct = async product => {
    try {
        const myModel = new model(product)
        return await myModel.save().catch(err => boom.conflict('Se ah producido un error en la base de datos ', err))
        
    } catch (err) {
        throw err
    }
}

const getProductsById = async payload => {
    try {
        const { productId } = payload
        return await model.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(productId) } }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

const getProductsByCompanyId = async payload => {
    try {
        const { companyId, limit, skip, colors, sizes, materials } = payload
        const filter =  {
            companyId: mongoose.Types.ObjectId(companyId)
        }
        // Filters
        if(!!colors&&colors.length>0) filter["details.colors"] = { $in: colors.map(item=>new RegExp(item, "gi")) }
        if(!!materials&&materials.length>0) filter["details.materials"] = { $in: materials.map(item=>new RegExp(item, "gi")) }
        if(!!sizes&&sizes.length>0) filter["details.sizes"] = { $in: sizes.map(item=>new RegExp(item, "gi")) }
        return await model.aggregate([
            { $match: filter },
            { $skip: skip * limit },
            { $limit: limit }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

const getFeaturedProducts = async payload => {
    try {
        const { limit, skip } = payload
        return await model.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    prices: 1,  
                    rate: {
                            $reduce: {
                            input: "$comments.rate",
                            initialValue: { sum: 0, reviews: 0 },
                            in: {
                                sum: {$sum: ["$$value.sum", "$$this"]}, 
                                reviews: { $sum: ["$$value.reviews", 1]}
                                }
                          } 
                    }
                }
            },
            { $match: { "rate.reviews": { $gte: 1 } } },
            { $sort : { "rate.sum" : -1 } },
            { $skip: skip * limit },
            { $limit: limit }
            
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

const searchProducts = async payload => {
    try {
        const { search, limit, skip } = payload
        console.log(payload)
        const filters = {
             name: new RegExp(search, "gi")
        }
        return await model.aggregate([
            { $match: filters },
            { $project: { _id: 1, name: 1, prices: 1, images: 1 } },
            { $skip: skip * limit },
            { $limit: limit }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

module.exports = {
    addProduct,
    getProductsByCompanyId,
    getFeaturedProducts,
    searchProducts,
    getProductsById
}