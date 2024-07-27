const express = require("express");

// import controllers
const {
  handleSignup,
  handleLogin,
  handleOTPVerification,
  fetchUserProfile,
  fetchUserPublishes,
} = require("../controllers/user.controllers");

const router = express.Router();

// authentication routes
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/verify", handleOTPVerification);

// user routes
router.get("/profile", fetchUserProfile);
router.get("/myarticles", fetchUserPublishes);

module.exports = router;
