const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (token) => {
  const { payload } = JWT.verify(token, process.env.SECRET);
  return payload;
};

module.exports = verifyJWT;
