// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// module.exports = { upload: multer({ storage: storage }) };

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadFolder = path.join(__dirname, "public", "temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if folder exists, if not create it
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = { upload: multer({ storage: storage }) };
