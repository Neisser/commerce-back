const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const schema = mongoose.Schema

const myCollection = new schema({

    dni: {
        unique: true,
        type: String
    },
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
    phone: {
        type: Number,
        unique: true,
        max: 12
    },
    profile_picture: String,
    address: [{
        name: String,
        address:String,
        optionar: String,
        country:String,
        province:String,
        city:String,
        location: String,
        neighborhood:String,
        postal_code:String,
        contact: {
            type: Number,
            max: 12
        }


    }],
    state: {
        required: true,
        type: Boolean,
        default: true
    },
    _id_role: {
        type: schema.ObjectId,
        ref: 'roles'
    },
    _id_company: {
        type: schema.ObjectId,
        ref: 'companies'
    }

})


const addUser = joi.object({

        email:joi.string().email().required(),
        first_name:joi.string().max(15).required(),
        last_name:joi.string().max(15).required(),
        password:joi.string().required().min(8)

})
const model = mongoose.model('users', myCollection)

module.exports = {
    model,
    addUser
}