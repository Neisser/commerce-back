const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const handleSingleFile = (key) =>
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: 50 * Math.pow(10, 6), // TODO: create constraint
    },
  }).single(key);

module.exports = {
  handleSingleFile,
};
