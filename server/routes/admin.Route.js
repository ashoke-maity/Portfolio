const express = require("express");
const router = express.Router();
const {
  AdminRegister,
  AdminLogin,
  AdminDashboard,
  AdminLogout 
} = require("../controllers/admin.Controller");
const {
  verifyToken,
} = require("../middlewares/adminAuth.Middlware");

// Public routes (no authentication required)
router.post("/login", AdminLogin);
router.post("/register", AdminRegister);

// Protected routes (require JWT authentication)
router.get("/dashboard", verifyToken, AdminDashboard);

module.exports = router;
