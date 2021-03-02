const { model } = require('../models/orders')
const modelUser = require('../models/users')

const boom = require('@hapi/boom')
const mongoose = require('mongoose')


const addOrder = async order => {
    try {

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
            { $lookup: { from: 'products', localField: 'details.productId', foreignField: '_id', as: 'product' } }, { $unwind: '$product' },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },
            { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } }, { $unwind: '$company' },
            { $lookup: { from: 'coupons', localField: 'couponsId', foreignField: '_id', as: 'coupon' } },
            {
                $project: {

                    code: '$code',
                    details: [
                        {
                            product: '$product.name',
                            quantity: '$details.quantity',
                            unit_price: '$details.unit_price',
                            detailsProduct: '$details.detailsProduct'
                        }
                    ],
                    tracking:'$tracking',
                    userId: '$user._id',
                    address: '$address',
                    company: '$company',
                    coupons: '$coupon',
                    created_at: '$createdat',
                    updated_at: '$updatedat',
                    invoiceId: '$invoiceId',

                }
            }
        ]).exec()

    } catch (err) {
        throw err
    }
}


const orderList = async userId => {
    try {
        const objectIdUserId = mongoose.Types.ObjectId(userId)
        return await model.aggregate([
            { $match: { 'userId': { $eq: objectIdUserId } } }, { $unwind: '$details' },
            { $lookup: { from: 'products', localField: 'details.productId', foreignField: '_id', as: 'product' } }, { $unwind: '$product' },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },
            { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } }, { $unwind: '$company' },
            { $lookup: { from: 'coupons', localField: 'couponsId', foreignField: '_id', as: 'coupon' } },
            { $lookup: { from: 'invoices', localField: 'invoiceId', foreignField: '_id', as: 'invoice' } }, { $unwind: '$invoice' },
            {
                $project: {

                    code: '$code',
                    details: [
                        {
                            product: '$product.name',
                            quantity: '$details.quantity',
                            unit_price: '$details.unit_price',
                            detailsProduct: '$details.detailsProduct'
                        }
                    ],
                    tracking:'$tracking',
                    userId: '$user._id',
                    address: '$address',
                    company: '$company',
                    coupons: '$coupon',
                    created_at: '$createdat',
                    updated_at: '$updatedat',
                    invoice: '$invoice',

                }
            }
        ]).exec()

    } catch (err) {
        throw err
    }
}

const orderListCompany = async companyId => {
    try {
        const objectIdCompanyId = mongoose.Types.ObjectId(companyId)
        return await model.aggregate([
            { $match: { 'companyId': { $eq: objectIdCompanyId } } }, { $unwind: '$details' },
            { $lookup: { from: 'products', localField: 'details.productId', foreignField: '_id', as: 'product' } }, { $unwind: '$product' },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }, { $unwind: '$user' },
            { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } }, { $unwind: '$company' },
            { $lookup: { from: 'coupons', localField: 'couponsId', foreignField: '_id', as: 'coupon' } },
            { $lookup: { from: 'invoices', localField: 'invoiceId', foreignField: '_id', as: 'invoice' } }, { $unwind: '$invoice' },
            {
                $project: {
                    code: '$code',
                    details: [
                        {
                            product: '$product.name',
                            quantity: '$details.quantity',
                            unit_price: '$details.unit_price',
                            detailsProduct: '$details.detailsProduct'
                        }
                    ],
                    tracking:'$tracking',
                    userId: '$user._id',
                    invoiceId: '$invoiceId',
                    address: '$address',
                    company: '$company',
                    coupons: '$coupon',
                    created_at: '$createdat',
                    updated_at: '$updatedat',
                    invoice: '$invoice',

                }
            }
        ]).exec()

    } catch (err) {
        throw err
    }
}
module.exports = {
    addOrder,
    getOrder,
    orderList,
    orderListCompany
}