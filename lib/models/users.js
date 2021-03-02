const mongoose = require('mongoose')
const schema = mongoose.Schema

const myCollection = new schema({

    dni:String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    phone:String,
    profile_picture: String,
    address: [{
        name: String,
        address:String,
        optional: String,
        country:String,
        province:String,
        city:String,
        location: String,
        neighborhood:String,
        postal_code:Number,
        contact:String


    }],
    state: {
        required: true,
        type: Boolean,
        default: true
    },
    roleId: {
        type: schema.ObjectId,
        ref: 'roles'
    },
    companyId: {
        type: schema.ObjectId,
        ref: 'companies'
    }

},{timestamps:true })


const model = mongoose.model('users', myCollection)

module.exports = {
    model,

}