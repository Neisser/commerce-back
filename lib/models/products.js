const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const { array } = require('@hapi/joi')
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
    _id_category:{
        type: schema.ObjectId,
        ref:'categories'
    },
    _id_company:{
        type:schema.ObjectId,
        ref:'companies'
    } 

})

const addProduct = joi.object({
    name:joi.string().required().length(40),
    description:joi.string().length(500),
    stock:joi.number().required().min(1),
    price:joi.array().required().min(1),
    image:joi.array().required().min(1).max(9),
    details:joi.array().required().min(1),
    target:joi.array().required().min(1)
})

const model = mongoose.model('products', myCollection)

module.exports = {
    model,
    addProduct
}