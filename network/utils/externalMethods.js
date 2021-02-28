const boom = require('@hapi/boom')
const { roleTypes } = require('./configurations')

const roleDiscrim = async (role) => {

    try {
        switch (role[0]) {
            case roleTypes[0]:
                console.log('aaaa')
                break;
            case roleTypes[1]:
            console.log('cliente')
                break;

            case roleTypes[2]:
                console.log('33233')
                break;

            default:
                throw boom.forbidden('el rol ingresado no es correcto')
        }

    } catch (err) {
        throw err
    }

}

module.exports = {
    roleDiscrim
}