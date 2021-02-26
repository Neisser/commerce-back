const { Router } = require("express");
const routes = new Router();
const productsController  = require('../controllers')

routes.post("/products", productsController.create);

module.exports = routes;
