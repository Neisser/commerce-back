require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    CORS: process.env.CORS,
    DB_SRV: process.env.DB_SRV,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    JWTSECRET: process.env.JWTSECRET,
    defaultProfileImg: process.env.DEFAULTPP,
    defaultProductImg: process.env.DEFAULTPI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    STRIPE_PUB_KEY: process.env.STRIPE_PUB_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};

module.exports = { config }