const { model } = require('../models/users')
const boom = require('@hapi/boom')



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
                _id_role: '$role._id',
                role: '$role.code',
                _id_company: '$company._id',
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
        throw err
    }
}
module.exports = {
    addUser,
    login
}