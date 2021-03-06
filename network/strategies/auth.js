const jwt = require("jsonwebtoken");
const boom = require('@hapi/boom')
const { roleUser } = require('../../lib/stores/users')
const { roleTypes } = require('../utils/configurations')

const checkAuthToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const authAdmin = async (req, res, next) => {
    try {
      const token = req.headers["authorization"]
      if (token) {
        const tokenPayload = await checkAuthToken(token.slice(7))
        const { roleId } = tokenPayload.data[0]
        const codeRole = await roleUser(roleId[0])
        if(![roleTypes[0]].includes(codeRole[0].code)){
          throw boom.unauthorized("Only admin are authorized")
        }
        next()
      } else {
        throw boom.unauthorized("Unauthorized token")
      }
    } catch (err) {
      next(err)
    }
  };

const authProvider = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    if (token) {
      const tokenPayload = await checkAuthToken(token.slice(7))
      const { roleId } = tokenPayload.data[0]
      const codeRole = await roleUser(roleId[0])
      if(![roleTypes[0], roleTypes[1]].includes(codeRole[0].code)){
        throw boom.unauthorized("Only providers are authorized")
      }
      next()
    } else {
      throw boom.unauthorized("Unauthorized token")
    }
  } catch (err) {
    next(err)
  }
};

const authClient = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    if (token) {
      const tokenPayload = await checkAuthToken(token.slice(7))
      const { roleId } = tokenPayload.data[0]
      const codeRole = await roleUser(roleId[0])

      if( ![ roleTypes[0], roleTypes[1], roleTypes[2] ].includes(codeRole[0].code) ){
        throw boom.unauthorized("Only clients are authorized")
      }
      next()
    } else {
      throw boom.unauthorized("Unauthorized token")
    }
  } catch (err) {
    next(err)
  }
};

module.exports = {
  authAdmin,
  authProvider,
  authClient,
}
