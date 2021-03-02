const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
    code: String,
    tracking: {
        stage1: Boolean,
        stage2: Boolean,
        stage3: Boolean,
        stage4: Boolean
    },
    state: Boolean,
    details: [{
        productId: {
            type: schema.ObjectId,
            ref: 'products'
        },
        detailsProduct: [{
            unit_price: Number,
            quantity: Number,
            color: String,
            size: String,
            material: String,
            gender: String,
            age: String
        }]
    }],
    address:{
        name: String,
        address: String,
        optional: String,
        country: String,
        province: String,
        city: String,
        location: String,
        neighborhood: String,
        postal_code: Number,
        contact: String
    },
    userId: {
        type: schema.ObjectId,
        ref: 'users'
    },
    companyId: {
        type: schema.ObjectId,
        ref: 'companies'
    },
    couponsId: {
        type: schema.ObjectId,
        ref: 'coupons'
    },
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
        default: Date.now
    }


})


const model = mongoose.model('orders', myCollection)

module.exports = {
    model
}