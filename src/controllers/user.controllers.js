const OTPModel = require("../models/OTP.models");
const userModel = require("../models/user.models");
const generateJWT = require("../utils/generateJWT");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");

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
    const info = await sendOTP(email, OTP);
    // save OTP to DB
    const OTPDetails = await OTPModel.create({
      userId: userCredentials._id,
      OTP,
    });
    res.status(200).json({
      Error: false,
      email,
      token,
      message: `A mail with OTP has been sent to ${email}`,
    });
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // verfiy user credentials
    const userCredentials = await userModel.loginUser(email, password);

    // generate JWT
    const token = generateJWT(userCredentials._id);

    res.status(200).json({
      Error: false,
      email,
      token,
      message: "user logged in successfully",
    });
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
};

const handleOTPVerification = async (req, res) => {
  const { userId } = req;
  const { OTP } = req.body;

  try {
    // retrieve OTP from OTP collection
    const userOTPData = await OTPModel.findOne({ userId });

    // verify OTP
    if (OTP == userOTPData.OTP) {
      // delete OTP data
      const delConfirmation = await OTPModel.findByIdAndDelete(userOTPData._id);

      res
        .status(200)
        .json({ Error: false, message: "user verified successfully" });
    } else {
      throw new Error("OTP is incorrect");
    }
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
};

const fetchUserProfile = () => {};

const fetchUserPublishes = () => {};

module.exports = {
  handleSignup,
  handleLogin,
  handleOTPVerification,
  fetchUserProfile,
  fetchUserPublishes,
};
