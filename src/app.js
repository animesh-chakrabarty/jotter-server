const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

// ************ middlewares ************
// cors() middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
// json parser middleware
app.use(express.json({ limit: "16kb" }));
// url parser middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

module.exports = app;
