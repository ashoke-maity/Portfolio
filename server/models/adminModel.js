const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
