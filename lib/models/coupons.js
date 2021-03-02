const mongoose = require('mongoose')
const schema = mongoose.Schema

const myCollection = new schema({

    code:{
        unique:true,
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    state:{
        type:Boolean,
        required:true
    }
})

const model = mongoose.model('coupons', myCollection)

module.exports={
    model
}