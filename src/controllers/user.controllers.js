const userModel = require("../models/user.models");
const generateJWT = require("../utils/generateJWT");
const generateOTP = require("../utils/generateOTP");

const handleSignup = async (req, res) => {
  // extract firstName, lastName, email, password
  const { firstName, lastName, email, password } = req.body;
  try {
    // add user credentials to the DB
    const userCredentials = await userModel.signupUser(
      firstName,
      lastName,
      email,
      password
    );
    // generate JWT (payload - _id)
    const token = generateJWT(userCredentials._id);
    // generate OTP
    const OTP = generateOTP();
    // send OTP
    
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
};

const handleLogin = () => {};

const handleOTPVerification = () => {};

const fetchUserProfile = () => {};

const fetchUserPublishes = () => {};

module.exports = {
  handleSignup,
  handleLogin,
  handleOTPVerification,
  fetchUserProfile,
  fetchUserPublishes,
};
