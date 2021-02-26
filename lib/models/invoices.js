const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
        name:String,
        subtotal:String,
        fee:Boolean,
        total:Number,
        url:String,
        _id_user:{
            type:schema.ObjectId,
            ref:'users'
        },
        _id_company:{
            type:schema.ObjectId,
            ref:'companies'
        },
        _id_order:{
            type:schema.ObjectId,
            ref:'orders'
        }
})


const model = mongoose.model('invoices', myCollection)

module.exports = {
    model
}