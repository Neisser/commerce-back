const {sign} = require('../auths/signs')
const {BasicStrategy} = require('passport-http')
const controller = require('')
const passport = require('passport')

const login = new BasicStrategy((req, res, next) => {

    
})

const passportBasic = () => passport.use(login)

module.exports= {
    passportBasic
}