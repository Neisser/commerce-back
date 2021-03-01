const { model } = require('../models/coupons')
const rolModel = require('../models/roles')
const boom = require('@hapi/boom')
const mongoose = require('mongoose')


const addCoupons = async coupon => {
    try {
        const myModel = new model(coupon)
        return await myModel.save().catch(err => boom.conflict('conflicto al guardar cupones en la base de datos', err))

    } catch (err) {
        throw err
    }

}

module.exports = {
    addCoupons
}