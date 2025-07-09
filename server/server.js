const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// middlware
app.use(express.json());

// routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});