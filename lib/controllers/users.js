const store = require('../stores')
const response = require('../../network/utils/response')
const bcryp = require('bcrypt')
const { getRoles } = require('../stores/roles')
const boom = require('@hapi/boom')

const userAdd = async (req, res, next) => {
    try {
        const { email, first_name, last_name, password } = req.body
        const role = await getRoles() //client
        const user = {
            email,
            first_name,
            last_name,
            password: await bcryp.hash(password, 5),
            roleId: role[0]._id
        }

        const dataResult = await store.users.userAdd(user)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const loginUser = async (email, password, next) => {
    try {
        const dataResult = await store.users.login(email)
        const { passwordAuth } = dataResult[0]
        const passAuth = await bcryp.compare(password, passwordAuth)

        if(passAuth){
            delete dataResult[0].passwordAuth
            next(null, dataResult)
        }else{ 
            throw boom.unauthorized('accesos denegado')
        }
        
    } catch (err) {
        next(err)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {  
        const { first_name, last_name, phone, dni, address, _id } = req.body
        const user ={
            first_name,
            last_name,
            phone,
            dni,
            address
        }

        const dataResult = await store.users.updateUserProfile(_id, user)
        response.success(req, res, dataResult, 200)
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userAdd,
    loginUser,
    updateUserProfile
}