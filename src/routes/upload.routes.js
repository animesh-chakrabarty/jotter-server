const express = require("express");
const handleUpload = require("../controllers/upload.controllers");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, upload.single("image"), handleUpload);

module.exports = router;