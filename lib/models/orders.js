const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
    code: String,
    tracking: {
        stage0:{
            type:Boolean,
            default:true
        },
        stage1:{
            type:Boolean,
            default:false
        },
        stage2: {
            type:Boolean,
            default:false
        },
        stage3: {
            type:Boolean,
            default:false
        },
        stage4: {
            type:Boolean,
            default:false
        }
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
    invoiceId:{
        type:schema.ObjectId,
        ref:'invoices'
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