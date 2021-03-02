const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const boom = require('@hapi/boom')
const { config } = require('../../config/index')
const { roleUser } = require('../../lib/stores/users')
const { roleTypes } = require('../utils/configurations')

passport.use(new Strategy(
    {
        secretOrKey: config.JWTSECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, colllback) {
        try {

            const { roleId } = tokenPayload.data[0]
            const codeRole = await roleUser(roleId[0])

            switch (codeRole[0].code) {
                case roleTypes[0]:
                    console.log('aaa')
                    colllback(null, tokenPayload)
                    break;
                case roleTypes[1]:
                    console.log('ggg')
                    colllback(null, tokenPayload)
                    break;

                case roleTypes[2]:
                    console.log('bbb')
                    colllback(null, tokenPayload)
                    break;

                default:
                    throw boom.unauthorized()
            }

        } catch (err) {
            colllback(boom.unauthorized(), false)
        }
    }
))
