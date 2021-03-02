const { model } = require('../models/orders')
const boom = require('@hapi/boom')



const addOrder = async order => {
    try {
        const myModel = new model(order)
        return await myModel.save().catch(err => boom.conflict('error al intentar ingresar una orden', err))
    } catch (err) {
        throw err
    }
}


module.exports={
    addOrder
}