const store = require('../stores/users')
const response = require('../../network/utils/response')
const bcryp = require('bcrypt')
const { getRoles } = require('../stores/roles')
const boom = require('@hapi/boom')

const addUser = async (req, res, next) => {
    try {
        const { email, first_name, last_name, password } = req.body
        const role = await getRoles() //client
        const user = {
            email,
            first_name,
            last_name,
            password: await bcryp.hash(password, 5),
            _id_role: role[0]._id,
            dni: '23',
            phone: 11

        }

        const dataResult = await store.addUser(user)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const loginUser = async (email, password, next) => {
    try {
        const dataResult = await store.login(email)
        const { role, passwordAuth } = dataResult[0]
        const passAuth = await bcryp.compare(password, passwordAuth)

        if(passAuth){
            delete dataResult[0].passwordAuth
            //await roleDiscrim(role)
            next(null, dataResult)
        }else{
            throw boom.unauthorized('accesos denegado')
        }
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addUser,
    loginUser
}