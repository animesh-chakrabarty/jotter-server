const userModel = require("../models/user.models");
const verifyJWT = require("../utils/verifyJWT");

const auth = async (req, res, next) => {
  try {
    // destructure authorization header
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Authorization header required");
    }

    // extract token from header
    const token = authorization.split(" ")[1];

    // verify token & extract payload (_id)
    const payload = verifyJWT(token);

    // verify _id: DBLookup for id
    const { _id: userId } = await userModel.findById(payload).select("_id");

    if (!userId) {
      throw new Error("user doesn't exist");
    }

    req.userId = userId;

    next();
  } catch (error) {
    res.status(400).json({ Error: true, message: error.message });
  }
};

module.exports = auth;
