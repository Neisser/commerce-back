const Sendgrid = require("@sendgrid/mail");
const { config } = require('../../config')
const boom = require('@hapi/boom')
Sendgrid.setApiKey(config.SENDGRID_API_KEY);

const sendgridMail = async ({to , subject , template}) => {
   
    await Sendgrid.send({
        to:to,
        from: config.EMAIL_SENDER,
        subject: subject,
        html: template
    })
    .catch(err => {
        throw boom.failedDependency('error al eviar un correo', err)
    })
}

module.exports = { 
    sendgridMail 
}