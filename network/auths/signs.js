const jwt = require('jsonwebtoken')
const { config }= require('../../config/index')

/**
 * This function will sign whit a token cifrated NOT ENCRYPTED 
 * @param {Json} data response from database
 */
function sign(data){
    return jwt.sign({data},config.JWTSECRET, {expiresIn:'24h'})
}

module.exports = {
    sign
}