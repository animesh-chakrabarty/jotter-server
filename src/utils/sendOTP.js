const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOTP = async (email, OTP) => {
  // initialize transport configuration
  const config = {
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  };
  // create transporter
  const transporter = nodemailer.createTransport(config);
  // send mail
  const info = await transporter.sendMail({
    from: `Jotter ${process.env.MAIL}`,
    to: email,
    subject: "OTP for Jotter",
    html: `<h1>${OTP}</h1>`,
  });

  return info;
};

module.exports = sendOTP;
