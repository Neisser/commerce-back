const { model } = require('../models/users')
const rolModel = require('../models/roles')
const boom = require('@hapi/boom')
const mongoose = require('mongoose')



const addUser = async user => {
    try {
        const myModel = new model(user)
        return await myModel.save().catch(err => boom.conflict('se ah producido un erro en la base de datos', err))
    } catch (err) {
        throw err
    }
}

function callPrivateLogin() {
    const privateLogin = async email => await model.aggregate([
        { $match: { 'email': email } },
        { $lookup: { from: 'roles', localField: '_id_role', foreignField: '_id', as: 'role' } },
        { $lookup: { from: 'companies', localField: '_id_company', foreignField: '_id', as: 'company' } },
        {
            $project: {
                name: { $concat: ['$first_name', ' ', '$last_name'] },
                email: '$email',
                passwordAuth: '$password',
                roleId: '$role._id',
                role: '$role.code',
                companyId: '$company._id',
                company: '$company.social_reason',
                profile_picture: '$profile_picture'
            }
        }
    ]).exec()

    return {
        in: async email => privateLogin(email)
    }
}

const login = async email => {
    try {
        return await callPrivateLogin().in(email)

    } catch (err) {
        throw boom.conflict('se ah producido un error en la base de datos al intentar logearse')
    }
}


const roleUser = async user => {
    try {
        console.log(user)
        const userId = mongoose.Types.ObjectId(user)
        return await rolModel.model.aggregate([
           {  $match: {'_id': userId } },
           {
               $project:{
                   _id:0,
                   code:'$code'
               }
           }
        ]).exec()
} catch (err) {
    throw boom.conflict('se ah producido un error en la base de datos al intentar logearse')
}
}
module.exports = {
    addUser,
    login,
    roleUser
}