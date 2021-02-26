const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({
        name:String,
        description:String
})


const model = mongoose.model('roles', myCollection)

module.exports = {
    model
}