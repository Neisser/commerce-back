const boom = require('@hapi/boom')
const joi = require('@hapi/joi')
/**
 * 
 * @param {Json} data data recived from front-end
 * @param {Joi} shema data required in format joi
 */
function validate(data, schema){
    const { error } = schema.validate(data)
    return error
}

/**
 * 
 * @param {Joi} shema data required in format joi 
 * @param {type} check body or query
 */
function validationHandler(schema,check='body'){
    return function(req, res, next){
        const err = validate(req[check],schema)
        err ? next(boom.badRequest('your data is bad and you should feel bad', err)) : next()
    }
}

module.exports = {
    validationHandler
}