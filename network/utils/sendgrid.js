const Sendgrid = require("@sendgrid/mail");
const { config } = require('../../config')
Sendgrid.setApiKey(config.SENDGRID_API_KEY);
module.exports = Sendgrid;