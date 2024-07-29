const mongoose = require("mongoose");
const validator = require("validator");
const hashText = require("../utils/hashText");
const verifyHash = require("../utils/verifyHash");

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
  const doesEmailExist = await this.findOne({ email });
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

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw new Error("all fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }

  try {
    const userCredentials = await this.findOne({ email });

    if (!userCredentials) {
      throw new Error("user doesn't exist");
    }

    const doesPassMatch = await verifyHash(password, userCredentials.password);

    if (!doesPassMatch) {
      throw new Error("password incorrect");
    }

    return userCredentials;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model("user", userSchema);
