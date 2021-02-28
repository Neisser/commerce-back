const { BasicStrategy } = require('passport-http')
const { usersController } = require('../../lib/controllers/index')
const passport = require('passport')

const login = new BasicStrategy((req, res, next) => usersController.loginUser(req, res, next))

const passportBasic = () =>  passport.use(login)


module.exports = {
    passportBasic
}