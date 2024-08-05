const express = require("express");

// import controllers
const {
  handleSignup,
  handleLogin,
  handleOTPVerification,
  fetchUserProfile,
  fetchUserPublishes,
} = require("../controllers/user.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

// authentication routes
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/verify", auth, handleOTPVerification);

// account management routes
router.get("/profile", auth, fetchUserProfile);
router.get("/myarticles", auth, fetchUserPublishes);

module.exports = router;
