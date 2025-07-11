const express = require('express');
const router = express.Router();
const userFetchAdminPost = require('../controllers/userFetchingAdmin.Controller');

router.get("/user/projects", userFetchAdminPost);

module.exports = router;