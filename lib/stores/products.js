const { model } = require('../models/products')
const boom = require('@hapi/boom')

const addProduct = async product => {
    try {
        const myModel = new model(product)
        return await myModel.save().catch(err => boom.conflict('Se ah producido un error en la base de datos ', err))

    } catch (err) {
        throw err
    }
}

module.exports = {
    addProduct

}
/*module.exports = {
    create: async ({somedata}) => {
        try {

            return res.status(201).send({
                status: 201,
                data: body,
                message: "content created",
                code: "OK"
            });

        } catch (error) {
            //return error
            res.status(500).json({
                status: 500,
                message: error.message,
                code: "Internal Server Error",
                exceptionName: "Internal Error",
                fields: error.fieldWithError,
                mongoCode: error.code,
            });
        }
    }
}*/