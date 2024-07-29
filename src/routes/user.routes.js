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

// user routes
router.get("/profile", fetchUserProfile, auth);
router.get("/myarticles", fetchUserPublishes, auth);

module.exports = router;
