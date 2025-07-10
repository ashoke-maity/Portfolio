const mongoose = require('mongoose');
const dbConnect = async() => {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to Database Successfully ✅")
}

module.exports = dbConnect;