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

const updateCoupons = async couponId => {
    try {
        const objectIdcouponId = mongoose.Types.ObjectId(couponId)
        return await model.updateOne({ '_id': objectIdcouponId }, { $set: { state: false } })
            .catch(err => boom.conflict('conflicto en la desactivación de un cupon', err))

    } catch (err) {
        throw err
    }

}

const verifyCoupons = async couponId => {
    try {
        const objectIdcouponId = mongoose.Types.ObjectId(couponId)
        const dataCoupon = await model.findOne({ '_id': objectIdcouponId }, { state: 1 })
            .catch(err => boom.conflict('conflicto en la verificación de un cupon', err))
        if(dataCoupon){
            if(dataCoupon.state){
                return true
            }else{
                throw boom.illegal('este cupon ya esta usado')
            }
        }
      
    } catch (err) {
        throw err
    }
}

module.exports = {
    addCoupons,
    updateCoupons,
    verifyCoupons
}