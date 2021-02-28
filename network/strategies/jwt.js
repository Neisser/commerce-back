const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const boom = require('@hapi/boom')
const { model } = require('../../lib/models/users')


passport.use(new Strategy(
    {
        secretOrKey: 'clave',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, colllback) {
        try {
            console.log(tokenPayload)
            let dataResult = false
            
            !dataResult ?
                colllback(boom.unauthorized(), false) :
                colllback(null, dataResult)

        } catch (err) {
            colllback(boom.unauthorized(), false)
        }
    }
))