const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')
const { addUser, updateUserProfile, verifyUser } = require('../schemes/users')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { auth } = require('../../network/auths/before_auth')


router.post('/users',
    validationHandler(addUser, 'body'),
    usersController.userAdd)

router.post('/login', auth)

router.patch('/users',
    validationHandler(updateUserProfile, 'body'),
    usersController.updateUserProfile)

router.patch('/users/verify',
    validationHandler(verifyUser, 'body'),
    usersController.verifyUser)

module.exports = router