const mongoose = require('mongoose')
const schema = mongoose.Schema

const myCollection = new schema({
        code:Number,
        description:String,
        state:{
            type:Boolean,
            default:true
        },
        created_at: {
            type: Number,
            default: Date.now
        },
        updated_at: {
            type: Number,
            default: Date.now
        }
})


const model = mongoose.model('roles', myCollection)

module.exports = {
    model
}