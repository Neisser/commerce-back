const sentry = require('@sentry/node')
//sentry.init() 

/**
 * The error handler it's send to Sentry 
 * @param {error} err  The error handler
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {Middelware} next 
 */
function SentryErrors(err, req, res, next){
    sentry.caputreException(err)
    next(err)
}
/**
 * The error handler it's send as response to front-end.
 * If You are in mode production, this function will delete any err for more security.
 * This function will return a response in format Boom.
 * @param {error} err The error handler
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {Middelware} next 
 */
function errorHandler(err, req, res, next){
    if(res.headerSent){
        next(err)
    }

    if(false){ //It's mode production?
        delete err.message
        delete err.stack
        delete err.isBoom
        delete err.isServer
    }
    const {
        data,
        output:{
            statusCode,
            payload
        }
        
    } = err
    //response in format BOOM from HAPI
    res.status(statusCode)
    res.send({
        data,
        payload
    })
}