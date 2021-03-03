const Sendgrid = require("@sendgrid/mail");
const { config } = require('../../config')
Sendgrid.setApiKey(config.SENDGRID_API_KEY);

const sendgridMail = async ({to = '', subject = '', template}) => {
    console.log({to,subject,template})
    await Sendgrid.send({
        to: to,
        from: config.EMAIL_SENDER,
        subject: subject,
        html: template
    })
    .catch(console.error);
}

module.exports = { sendgridMail };