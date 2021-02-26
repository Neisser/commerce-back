const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema
const myCollection = new schema({

    name: String,
    description: String,
    state: Boolean,
    stock: Number,
    prices: [{
        unit_price: Number,
        amount: Number,
        description: String
    }],
    images: Array,
    comments: [{
        _id_user: {
            type: schema.ObjectId,
            ref: 'users'
        },
        comment: String

    }],
    details: [{
        colors: Array,
        size: Array,
        material: Array
    }],
    target: [{
        gender: String,
        age: String,
    }],
    _id_category: schema.ObjectId,
    _id_company: schema.ObjectId

})

const model = mongoose.model('products', myCollection)

module.exports = {
    model
}