const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db");
const app = require("./app");

const PORT = process.env.PORT || 8000;

// connect db
connectDB()
  .then(() => {
    // if DB connection successfull: listen to port
    app.listen(PORT, () => {
      console.log(`Listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    // if DB connection failed: print error message
    console.log("!!!DB Connection Error: " + error.message);
  });
