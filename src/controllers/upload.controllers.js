const uploadOnCloudinary = require("../utils/cloudinary");

const handleUpload = async (req, res) => {
  // multer middleware added a file property to the req object here we're accessing that and passing the file path to cloudinary
  const localFilePath = req.file.path;

  const URL = await uploadOnCloudinary(localFilePath);
  res.status(200).json({ Error: false, fileURL: URL });
};

module.exports = handleUpload;
