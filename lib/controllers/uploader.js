const store = require('../stores')
const response = require('../../network/utils/response')

const imagesUploader = async (req, res, next) => {
    try {
        const { file } = req
        const { type } = req.body
        const payload = { file, type }
        // Separate
        if(type != 'product' && type != 'profile-picture') response.success(req, res, { message: 'invalid type' }, 400)
        if(!file.mimetype.startsWith("image")) response.success(req, res, { message: 'invalid type of file' }, 400)
       // Separate
        payload.file.buffer = await store.uploader.processImages({file})
        const dataResult = await store.uploader.s3ImagesUploader(payload)
        console.log({dataResult})
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

module.exports = {
    imagesUploader
}
