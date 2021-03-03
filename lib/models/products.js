const mongoose = require('mongoose')
const schema = mongoose.Schema
const myCollection = new schema({

    name: String,
    description: String,
    state: Boolean,
    stock: Number,
    prices: [{
        unit_price: Number,
        min_stock: Number,
        max_stock: Number,
        description: String
    }],
    images: Array,
    comments: [{
        commentId: {
            type: schema.ObjectId
        },
        userId: {
            type: schema.ObjectId,
            ref: 'users'
        },
        comment: String,
        rate: { type : Number },
        createdAt: { type : Number },
        updatedAt: { type : Number }
        
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
    },
    createdAt: { type : Number, default: Date.now },
    updatedAt: { type : Number, default: Date.now }

})

const model = mongoose.model('products', myCollection)

module.exports = {
    model
}