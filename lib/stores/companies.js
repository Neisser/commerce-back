const mongoose = require('mongoose')
const { model } = require('../models/companies')
const boom = require('@hapi/boom')

const getLastCompanies = async payload => {
    try {
        const { limit, skip } = payload
        const filter =  { }
        return await model.aggregate([
            { $match: filter },
            { $skip: skip * limit },
            { $limit: limit }
        ]).exec()
        
    } catch (err) {
        throw err
    }
}

module.exports = {
    getLastCompanies
}