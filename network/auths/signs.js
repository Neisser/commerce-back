const jwt = require('jsonwebtoken')
const clave ='clave'

/**
 * This function will sign whit a token cifrated NOT ENCRYPTED 
 * @param {Json} data response from database
 */
function sign(data){
    return jwt.sign({data},clave, {expiresIn:'1h'})
}

module.exports = {
    sign
}