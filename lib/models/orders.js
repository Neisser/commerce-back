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
        quantity: Number,
        unit_price: Number
    }],
    delivery_instrution: String,
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
    

}, { timestamps: true })


const model = mongoose.model('orders', myCollection)

module.exports = {
    model
}