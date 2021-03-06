const mongoose = require('mongoose')
const schema = mongoose.Schema

const myCollection = new schema({
        name:String,
        description:Boolean
    
})


const model = mongoose.model('categories', myCollection)

module.exports = {
    model
}