const multer = require("multer");

const storage = multer.diskStorage({
  // temporary folder where the file will be stored in server
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  // filename
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
