const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
  if (!localPath) {
    throw new Error("localPath not provided");
  }

  try {
    const res = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);
    return res.url;
  } catch (error) {
    fs.unlinkSync(localPath);
    throw new Error(error.message);
  }
};

module.exports = uploadOnCloudinary;
