const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// JWT Secret - In production, this should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Token expiration time (1 hour)
const TOKEN_EXPIRATION = '1h';

/**
 * Generate JWT token for admin
 * @param {Object} adminData - Admin data to include in token
 * @returns {String} JWT token
 */
const generateToken = (adminData) => {
  try {
    const payload = {
      adminId: adminData._id,
      email: adminData.Email,
      fullName: adminData.FullName,
      iat: Math.floor(Date.now() / 1000) // issued at time
    };

    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: TOKEN_EXPIRATION,
      algorithm: 'HS256'
    });
  } catch (error) {
    throw new Error('Token generation failed: ' + error.message);
  }
};

/**
 * Verify JWT token middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if admin still exists in database
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin not found.'
      });
    }

    // Add admin info to request object
    req.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
      fullName: decoded.fullName
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token has expired.',
        expired: true
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error during token verification.'
    });
  }
};

/**
 * Get token expiration info
 * @param {String} token - JWT token
 * @returns {Object} Token expiration info
 */
const getTokenInfo = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    const expirationTime = new Date(decoded.exp * 1000);
    const currentTime = new Date();
    const timeRemaining = expirationTime - currentTime;

    return {
      expiresAt: expirationTime,
      timeRemaining: Math.max(0, timeRemaining),
      isExpired: timeRemaining <= 0,
      issuedAt: new Date(decoded.iat * 1000)
    };
  } catch (error) {
    return null;
  }
};

/**
 * Refresh token middleware - generates new token if current one is valid
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const refreshToken = async (req, res, next) => {
  try {
    // This middleware should be used after verifyToken
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No admin data found.'
      });
    }

    // Get admin data from database
    const admin = await Admin.findById(req.admin.adminId);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin not found.'
      });
    }

    // Generate new token
    const newToken = generateToken(admin);
    
    // Add new token to response
    res.locals.newToken = newToken;
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during token refresh.'
    });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenInfo,
  refreshToken,
  JWT_SECRET
};