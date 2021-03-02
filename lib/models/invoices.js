const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
        code:String,
        url:String,
        total:Number,
        userId:{
            type:schema.ObjectId,
            ref:'users'
        },
        companyId:{
            type:schema.ObjectId,
            ref:'companies'
        },
        created_at: {
            type: Number,
            default: Date.now
        }
})


const model = mongoose.model('invoices', myCollection)

module.exports = {
    model
}