const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Admin = require('../models/adminModel');
const { generateToken, getTokenInfo } = require('../middlewares/adminAuth.Middlware');

// Register Admin
const AdminRegister = async (req, res) => {
  try {
    const { FullName, Email, Password } = req.body;
    if (!FullName || !Email || !Password) {
      return res.status(400).json({ success: false, msg: 'Full name, email, and password are required.' });
    }
    const existingAdmin = await Admin.findOne({ Email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, msg: 'Admin with this email already exists.' });
    }
    const hashedPassword = await bcryptjs.hash(Password, 10);
    const newAdmin = new Admin({ FullName, Email, Password: hashedPassword });
    await newAdmin.save();
    const token = generateToken(newAdmin);
    const tokenInfo = getTokenInfo(token);
    res.status(201).json({
      success: true,
      msg: 'Admin registered successfully.',
      data: {
        admin: {
          id: newAdmin._id,
          fullName: newAdmin.FullName,
          email: newAdmin.Email,
        },
        token,
        tokenInfo: {
          expiresAt: tokenInfo.expiresAt,
          expiresIn: '1 hour',
        },
      },
    });
  } catch (error) {
    console.error('Register api error:', error);
    res.status(500).json({ success: false, msg: 'Registration failed.', error: error.message });
  }
};

// Login Admin
const AdminLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ success: false, msg: 'Email and password are required.' });
    }
    const admin = await Admin.findOne({ Email });
    if (!admin) {
      return res.status(404).json({ success: false, msg: 'Admin not found.' });
    }
    const isMatch = await bcryptjs.compare(Password, admin.Password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Incorrect password.' });
    }
    const token = generateToken(admin);
    const tokenInfo = getTokenInfo(token);
    res.status(200).json({
      success: true,
      msg: 'Login successful.',
      data: {
        admin: {
          id: admin._id,
          fullName: admin.FullName,
          email: admin.Email,
        },
        token,
        tokenInfo: {
          expiresAt: tokenInfo.expiresAt,
          expiresIn: '1 hour',
        },
      },
    });
  } catch (error) {
    console.error('Login api error:', error);
    res.status(500).json({ success: false, msg: 'Login failed.', error: error.message });
  }
};

// Admin Dashboard
const AdminDashboard = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized.' });
    }
    res.status(200).json({
      success: true,
      msg: `Welcome to the dashboard, ${admin.FullName}`,
      admin: {
        id: admin._id,
        fullName: admin.FullName,
        email: admin.Email,
      },
    });
  } catch (error) {
    console.error('Dashboard api error:', error);
    res.status(500).json({ success: false, msg: 'Server Error.' });
  }
};

// Admin Profile
const AdminProfile = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized.' });
    }
    res.status(200).json({
      success: true,
      msg: `Welcome to your profile, ${admin.FullName}`,
      admin: {
        id: admin._id,
        fullName: admin.FullName,
        email: admin.Email,
      },
    });
  } catch (error) {
    console.error('Profile api error:', error);
    res.status(500).json({ success: false, msg: 'Server Error.' });
  }
};

// Admin Logout
const AdminLogout = async (req, res) => {
  try {
    res.status(200).json({ success: true, msg: 'Admin logged out successfully.' });
  } catch (error) {
    console.error('Logout api error:', error);
    res.status(500).json({ success: false, msg: 'Server Error.' });
  }
};

module.exports = {
  AdminRegister,
  AdminLogin,
  AdminDashboard,
  AdminProfile,
  AdminLogout,
};
