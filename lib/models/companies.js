const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({

    rut: {
        type: String,
        unique: true,
        required: true
    },
    social_reason: String,
    state: {
        type: Boolean,
        required: true
    },
    address: {
        country: String,
        city: String,
        name: {
            type: String,
            require: true,
            unique: true
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: Number
})

const model = mongoose.model('companies', myCollection)

module.exports = {
    model
}