const { model } = require('../models/orders')
const boom = require('@hapi/boom')
const mongoose = require('mongoose')


const addOrder = async order => {
    try {
            console.log(order.details[0].detailsProduct)
        const myModel = new model(order)
        const dataResult = await myModel.save().catch(err => boom.conflict('error al intentar ingresar una orden', err))
        return dataResult
    } catch (err) {
        throw err
    }
}


const getOrder = async orderId => {
    try {
        const objectIdOrderId = mongoose.Types.ObjectId(orderId)
        return await model.aggregate([
            { $match: { '_id': { $eq: objectIdOrderId } } }, { $unwind: '$details' },
            { $lookup: { from: 'products', localField: 'details.productId', foreignField: '_id', as: 'product' } },{ $unwind: '$product' },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },{ $unwind: '$user.address' },
            { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } }, { $unwind: '$company' },
            { $lookup: { from: 'coupons', localField: 'couponsId', foreignField: '_id', as: 'coupon' } }, { $unwind: '$coupon' },
            {
                $project: {
            
                    code:'$code',
                    details: [
                        {
                            product: '$product.name',
                            quantity:'$details.quantity',
                            unit_price:'$details.unit_price',
                            detailsProduct:'$details.detailsProduct'
                        }
                    ],
                    address:'$address',
                    company: '$company',
                    coupons:'$coupon',
                    created_at:'$createdat',
                    updated_at:'$updatedat',

                }
            }
        ]).exec()
    
    } catch (err) {
        throw err
    }
}

module.exports = {
    addOrder,
    getOrder
}