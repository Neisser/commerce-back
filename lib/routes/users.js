const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')
const { addUser } = require('../models/users')
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { auth } = require('../../network/auths/before_auth')


router.post('/users',
    validationHandler(addUser, 'body'),
    usersController.addUser)

router.post('/login', auth )
module.exports = router