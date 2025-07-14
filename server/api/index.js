const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = require('../middlewares/CORS.Middleware');

// router imports
const AdminRouter = require('../routes/admin.Route');
const AdminPostRouter = require('../routes/adminPost.Route');
const UserProjectFetchRouter = require('../routes/UserFetchingAdmin.Route');
const uploadRouter = require('../routes/upload.Route');
const userImageRouter = require('../routes/userImage.Route');

// database connection
const dbConnect = require('../configs/db');
dbConnect();

// middlware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions))

// routes
app.use(process.env.ADMIN_ROUTE, AdminRouter);
app.use(process.env.ADMIN_ROUTE, AdminPostRouter);
app.use(process.env.USER_ROUTE, UserProjectFetchRouter);
app.use(process.env.ADMIN_ROUTE, uploadRouter);
app.use(process.env.USER_ROUTE, userImageRouter);

module.exports = app;