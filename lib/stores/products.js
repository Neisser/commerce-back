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
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

module.exports = {
    addProduct,
    getProductsByCompanyId
}