const mongoose = require('mongoose')
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
        userId: {
            type: schema.ObjectId,
            ref: 'users'
        },
        comment: String
    }],
    details: {
        colors: Array,
        sizes: Array,
        materials: Array
    },
    target: {
        genders: Array,
        ages: Array,
    },
    companyId:{
        type:schema.ObjectId,
        ref:'companies'
    } 

}, { timestamps: true }
)

const model = mongoose.model('products', myCollection)

module.exports = {
    model
}