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
    details: {
        colors: Array,
        size: Array,
        material: Array
    },
    target: {
        gender: Array,
        age: Array,
    },
    companyId:{
        type:schema.ObjectId,
        ref:'companies'
    } 

})

const model = mongoose.model('products', myCollection)

module.exports = {
    model
}