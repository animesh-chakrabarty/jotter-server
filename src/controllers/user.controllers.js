const userModel = require("../models/user.models");

const handleSignup = async (req, res) => {
  // extract firstName, lastName, email, password
  const { firstName, lastName, email, password } = req.body;
  // add user credentials to the DB
  try {
    const userCredentials = await userModel.signupUser(
      firstName,
      lastName,
      email,
      password
    );
    res.status(200).json(userCredentials);
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
  // generate JWT
  // generate OTP
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
