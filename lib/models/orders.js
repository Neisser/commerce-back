const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
        name:String,
        stages:{
            paid:Boolean,
            completed:Boolean
        },
        status:Boolean,
        details:String,
        _id_user:{
            type:schema.ObjectId,
            ref:'users'
        },
        _id_company:{
            type:schema.ObjectId,
            ref:'companies'
        },
    
})


const model = mongoose.model('orders', myCollection)

module.exports = {
    model
}