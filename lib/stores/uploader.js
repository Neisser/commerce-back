const Jimp = require("jimp");
const { normalizeDecimalNumber } = require("../../network/utils/helpers");
const { S3, ImagesBucket } = require("../../network/utils/s3Bucket");

const processImages = async (payload) => {
  try {
    const { file } = payload;
    const MAX_WIDTH = 1028;
    const MAX_HEIGHT = 720;
    const image = await Jimp.read(file.buffer);
    let imageWidth = image.getWidth();
    let imageHeight = image.getHeight();
    if (imageWidth > MAX_WIDTH || imageHeight > MAX_HEIGHT) {
      let maxWidth = MAX_WIDTH;
      let maxHeight = MAX_HEIGHT;
      const aspectRatio = imageWidth / imageHeight;
      if (maxHeight * aspectRatio > maxWidth) {
        maxHeight = normalizeDecimalNumber(maxWidth / aspectRatio);
      } else {
        maxWidth = normalizeDecimalNumber(maxHeight * aspectRatio);
      }
      imageWidth = Math.floor(Math.min(imageWidth, maxWidth));
      imageHeight = Math.floor(Math.min(imageHeight, maxHeight));
      const buffer = image
        .resize(imageWidth, imageHeight)
        .quality(75)
        .getBufferAsync(file.mimetype);
      return await buffer;
    } else {
      return file.buffer;
    }
  } catch (err) {
    throw err;
  }
};

const s3ImagesUploader = async (payload) => {
  try {
    const { file, type } = payload;
    const fileExt = file.originalname.split(".").slice(-1);
    const fileType = file.mimetype.split("/")[0];
    const filename = `${type}-${fileType}-${Date.now()}.${fileExt}`;
    const params = {
      Bucket: ImagesBucket,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return new Promise((resolve, reject)=>{
        S3.upload(params, async (error, data) => {
            if (error) reject(error);
            resolve(data.Location);
          });
    })
  } catch (err) {
    throw err;
  }
};

module.exports = {
  s3ImagesUploader,
  processImages,
};