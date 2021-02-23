const boom = require('@hapi/boom')

/**
 * 
 * @param {Json} data data recived from front-end
 * @param {Joi} shema data required in format joi
 */
function validate(data, shema){
    const { err } = shema.validate(data)
    return err
}

/**
 * 
 * @param {Joi} shema data required in format joi 
 * @param {type} check body or query
 */
function validationHandler(shema,check){
    return function(req, res, next){
        const err = validate(req[check],shema)
        err ? next(boom.badData('your data is bad and you should feel bad', err)) : next()
    }
}