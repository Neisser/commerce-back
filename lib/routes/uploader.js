const express = require('express')
const router = express.Router()
const { handleSingleFile } = require('../../network/handlers/file_handler')
const { uploaderController } = require('../controllers')

// Create new Products
router.post('/uploader/images',
handleSingleFile('file'),
uploaderController.imagesUploader)

module.exports = router