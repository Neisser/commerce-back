const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profile_picture: String,
    first_name: String,
    last_name: String,
    state: {
        required: true,
        type: Boolean,
        default: true
    },
    phone: Number,
    _id_role: {
        type: schema.ObjectId,
        ref: 'roles'
    },
    _id_company: {
        type: schema.ObjectId,
        ref: 'companies'
    }

})

const model = mongoose.model('users', myCollection)

module.exports = {
    model
}