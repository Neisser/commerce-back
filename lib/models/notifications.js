const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({


})


const model = mongoose.model('notifications', myCollection)

module.exports = {
    model
}