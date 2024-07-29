const mongoose = require("mongoose");
const validator = require("validator");
const hashText = require("../utils/hashText");

// user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static function to add new user credentials to DB
userSchema.statics.signupUser = async function (
  firstName,
  lastName,
  email,
  password
) {
  // check if any of the parameters are null
  if (!firstName || !lastName || !email || !password) {
    throw new Error("all fields must be filled");
  }
  // check if mail is valid
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  // check if password is strong
  if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough");
  }
  // check if mail already in use - DBlookup
  const doesEmailExist = await this.findOne({email});
  if (doesEmailExist) {
    throw new Error("email already in use");
  }

  // if everything is ok
  // hash password
  const hashedPass = await hashText(password);

  // create a new entry
  try {
    const userCredentials = await this.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    return userCredentials;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model("user", userSchema);
