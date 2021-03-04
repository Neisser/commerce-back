const { model } = require('../models/users')
const rolModel = require('../models/roles')
const boom = require('@hapi/boom')
const mongoose = require('mongoose')



const userAdd = async user => {
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
        { $lookup: { from: 'roles', localField: 'roleId', foreignField: '_id', as: 'role' } },
        { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } },
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
            { $match: { '_id': userId } },
            {
                $project: {
                    _id: 0,
                    code: '$code'
                }
            }
        ]).exec()
    } catch (err) {
        throw boom.conflict('se ah producido un error en la base de datos al intentar logearse')
    }
}


const updateUserProfile = async (_id, user) => {
    try {
        await model.updateOne({ '_id': { $eq: _id } }, { $set: user })
        const dataResult = await model.findOne({ '_id': _id }, { dni: 1, first_name: 1, last_name: 1, phone: 1, address: 1 })
        return dataResult
    } catch (err) {
        throw boom.conflict('se ah producido un error en la base de datos al actulizar los datos del usuario')
    }
}


const verifyUser = async (email) => {
    try {
        await model.updateOne({ 'email': email }, { $set: { 'verify': true } }).catch(err => {
            throw err
        })
    } catch (err) {
        throw boom.conflict('se ah producido un error en verificacion del usuario', err)

    }
}


const verifyAuthentication = async (email) => {
    try {
        return await model.findOne({ 'email': email }).catch(err => {
            throw err
        })
    } catch (err) {
        throw boom.conflict('se ah producido un error en verificacion del usuario', err)

    }
}

module.exports = {
    userAdd,
    login,
    roleUser,
    updateUserProfile,
    verifyUser,
    verifyAuthentication
}