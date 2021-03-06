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

const updateProduct = async payload => {
    try {
        const { productId, ...product } = payload
        const find = {_id: mongoose.Types.ObjectId(productId) }
        await model.updateOne(find, {$set: product}).catch(err => boom.conflict('Se ah producido un error en la base de datos ', err))
        return { message: "product was successfully updated"}
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

const getCommentsProductsById = async payload => {
    try {
        const { productId, limit, skip } = payload
        return await model.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(productId) } },
            { $project: {comments: 1} },
            { $unwind: "$comments" },
            { $skip: skip*limit },
            { $limit: limit }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

const addComments = async payload => {
    try {
        const { productId, userId, comment, rate } = payload
        const find = { "_id": mongoose.Types.ObjectId(productId) }
        const comments = [{
            commentId: mongoose.mongo.ObjectId(),
            userId: mongoose.Types.ObjectId(userId),
            comment: comment,
            rate: rate,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }]
        console.log({find, comments, _id: new mongoose.mongo.ObjectId()})
        const returns = await model.updateOne(find, {$push: { comments: { $each: comments, $position: 0 }}})
        .catch(err => boom.conflict('Se ah producido un error en la base de datos ', err))
        return { message: "comment was successfully created"}
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
        if(!!colors&&colors.length>0) filter["details.colors"] = { $in: colors.split(',').map(item=>new RegExp(item, "gi")) }
        if(!!materials&&materials.length>0) filter["details.materials"] = { $in: materials.split(',').map(item=>new RegExp(item, "gi")) }
        if(!!sizes&&sizes.length>0) filter["details.sizes"] = { $in: sizes.split(',').map(item=>new RegExp(item, "gi")) }
        return await model.aggregate([
            { $match: filter },
            { $skip: skip * limit },
            { $limit: limit },
            { $project: {_id: 1, prices: 1, images: 1, description: 1, stock: 1,name:1,details:1}}
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
    updateProduct,
    getProductsByCompanyId,
    getFeaturedProducts,
    searchProducts,
    getProductsById,
    getCommentsProductsById,
    addComments
}