const dotenv = require("dotenv").config();
const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL.replace(/\/$/, ""),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
