const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')
<<<<<<< HEAD
const { addUser, updateUserProfile } = require('../schemas/users')
=======
const { addUser } = require('../schemes/users')
>>>>>>> cf578b0505ef41340ccbd8decf34fc7c6ba76238
require('../../network/strategies/jwt')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { auth } = require('../../network/auths/before_auth')


router.post('/users',
    validationHandler(addUser, 'body'),
    usersController.addUser)

router.post('/login', auth)

router.patch('/users',
    validationHandler(updateUserProfile,'body'),
    usersController.updateUserProfile)

module.exports = router