const AWS = require("aws-sdk");
const { config } = require('../../config')

const S3 = new AWS.S3({
  accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = {
    S3,
    ImagesBucket: config.AWS_S3_BUCKET,
};
