const store = require('../stores')
const response = require('../../network/utils/response')

const getLastCompanies = async (req, res, next) => {
    try {
        const {
            limit = 5,
            skip = 0,
        } = req.query
        const payload = {
            limit: parseInt(limit),
            skip: parseInt(skip),
        }
        const dataResult = await store.companies.getLastCompanies(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}

const getCompanyById = async (req, res, next) => {
    try {
        const {
            idcompany: companyId
        } = req.params
        const payload = {
            companyId
        }
        const dataResult = await store.companies.getCompanyById(payload)
        response.success(req, res, dataResult, 200)

    } catch (err) {
        next(err)
    }
}


module.exports = {
    getLastCompanies,
    getCompanyById
}
