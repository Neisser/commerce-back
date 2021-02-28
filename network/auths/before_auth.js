const passport = require('passport')
const strategy = require('../strategies/basics')
const { sign } = require('./signs')

function auth(req, res, next) {
    strategy.passportBasic()
    passport.authenticate('basic', (err, user) => err ? next(err) : login(req, res, user))(req,res,next)
}


function login(req, res, user) {
    req.login(user, { session: false }, err => {
        err ?
            next(err) :
            res.status(200).json({ access_token: sign(user) })
    })
}


module.exports={
    auth
}