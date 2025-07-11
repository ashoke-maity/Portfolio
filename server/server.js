const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = require('./middlewares/CORS.Middleware');

// router imports
const AdminRouter = require('./routes/admin.Route');
const AdminPostRouter = require('./routes/adminPost.Route');
const UserProjectFetchRouter = require('./routes/UserFetchingAdmin.Route');
const uploadRouter = require('./routes/upload.Route');

// database connection
const dbConnect = require('./configs/db');
dbConnect();

// middlware
app.use(express.json());
app.use(cors(corsOptions))

// routes
app.use(process.env.ADMIN_ROUTE, AdminRouter);
app.use(process.env.ADMIN_ROUTE, AdminPostRouter);
app.use(process.env.USER_ROUTE, UserProjectFetchRouter);
app.use(process.env.ADMIN_ROUTE, uploadRouter);

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});