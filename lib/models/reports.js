const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
        reason:String,
        description:String,
        state:Boolean,
        _id_user:{
            type:schema.ObjectId,
            ref:'users'
        },
        _id_company:{
            type:schema.ObjectId,
            ref:'companies'
        }
})


const model = mongoose.model('reports', myCollection)

module.exports = {
    model
}