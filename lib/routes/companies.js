const express = require('express')
const router = express.Router()
const schemes = require('../schemes/companies')
const { validationHandler } = require('../../network/handlers/validation_handlers')
const { companiesController } = require('../controllers')
// router.post() //ADD

// Get products by id
router.get('/companies/:idcompany',
validationHandler(schemes.idcompanySchemes, 'params'),
companiesController.getCompanyById)

// Get all products by companyId
router.get('/home/last-companies',
validationHandler(schemes.paginatorSchemes, 'query'),
companiesController.getLastCompanies)

// router.patch()  //UPDATE

module.exports = router