const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// router imports
const AdminRouter = require('./routes/admin.Route');

// database connection
const dbConnect = require('./configs/db');
dbConnect();

// middlware
app.use(express.json());

// routes
app.use(process.env.ADMIN_ROUTE, AdminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});