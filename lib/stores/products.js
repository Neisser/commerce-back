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

const getProductsByCompanyId = async payload => {
    try {
        const { companyId, limit, skip } = payload
        return await model.aggregate([
            { $match: { companyId: mongoose.Types.ObjectId(companyId) } },
            { $limit: limit },
            { $skip: skip * limit }
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
            { $limit: limit },
            { $skip: skip * limit }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

// const searchProducts = async payload => {
//     try {
//         const { query = "camiseta", limit, skip } = payload
//         console.log(payload)
//         const filters = {

//         }
//         return await model.aggregate([
//             { $match: filters },
//             { $limit: limit },
//             { $skip: skip * limit }
//         ]).exec()
        
//     } catch (err) {
//         throw err
//     }
// }

module.exports = {
    addProduct,
    getProductsByCompanyId,
    getFeaturedProducts,
    // searchProducts
}