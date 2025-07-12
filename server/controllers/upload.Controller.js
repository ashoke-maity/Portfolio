const { storage } = require('../configs/appwrite.Config.JS');
const sdk = require("node-appwrite");

const uploadImageToAppwrite = async (file) => {
  try {
    // Convert buffer to File object for Appwrite
    const fileObject = sdk.InputFile.fromBuffer(file.buffer, file.originalname);
    
    const result = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      'unique()', // generates a unique file ID
      fileObject
    );
    return result; // result.$id or result.url (based on permissions)
  } catch (error) {
    console.error('Appwrite upload error:', error.message);
    throw error;
  }
};

module.exports = {
  uploadImageToAppwrite
};

