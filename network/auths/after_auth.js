const passport = require('passport')
const strategy = require('../strategies/basics')
const { sign } = require('../auths/signs')
const { logAndExitProcess } = require('@sentry/node/dist/handlers')

function login(req, res, user) {
    req.login(user, { session: false }, async err => {
        err ?
            next(err) :
            res.status(200).json({ access_token: sign(user) })
    })
}
function auth(req, res, next) {
    strategy.passportBasic()
    passport.authenticate('basic', (err, user) => err ? next(err) : login(req, res, user))(req, res, next)
}

module.exports={
    auth
}