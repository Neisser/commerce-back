const express = require('express')
const router = express.Router()
const { handleSingleFile } = require('../../network/handlers/file_handler')
const { uploaderController } = require('../controllers')
require('../../network/strategies/jwt')
const passport = require('passport')
const RoleAuth = require('../../network/strategies/auth')
// Create new Products
router.post('/uploader/images',
passport.authenticate('jwt', {session: false}),
RoleAuth.authClient,
handleSingleFile('file'),
uploaderController.imagesUploader)

module.exports = router