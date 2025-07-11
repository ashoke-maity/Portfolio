const express = require("express");
const { uploadImage } = require("../controllers/upload.Controller");

const router = express.Router();

router.post("/upload", uploadImage);

module.exports = router;
