const { model } = require('../models/roles')
const boom = require('@hapi/boom')


const getRoles = async () => {
    try {
        const dataResult = model.find({ 'code': 2 })
        return dataResult
    } catch (err) {
        throw boom.conflict('ocurrio un error con los roles', err)
    }
}

module.exports = {
    getRoles
}