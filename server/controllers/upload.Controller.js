const { storage } = require('../configs/appwrite.Config.JS');
const { InputFile } = require('node-appwrite/file');
const { ID } = require('node-appwrite');

const uploadImageToAppwrite = async (file) => {
  try {
    // Convert buffer to InputFile object for Appwrite
    const fileObject = InputFile.fromBuffer(file.buffer, file.originalname);
    
    const result = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      ID.unique(), // generates a unique file ID
      fileObject
    );
    return result; // result.$id or result.url (based on permissions)
  } catch (error) {
    console.error('Appwrite upload error:', error.message);
    throw error;
  }
};

const deleteImageFromAppwrite = async (fileId) => {
  try {
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET_ID,
      fileId
    );
    return true;
  } catch (error) {
    console.error('Appwrite delete error:', error.message);
    throw error;
  }
};

// Helper function to extract file ID from Appwrite URL
const extractFileIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  try {
    // URL format: https://your-appwrite-endpoint/storage/buckets/bucket-id/files/file-id/view?project=project-id
    // Also handle URLs without view or query parameters
    const matches = url.match(/\/files\/([a-zA-Z0-9_-]+)/);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('Error extracting file ID from URL:', error);
    return null;
  }
};

module.exports = {
  uploadImageToAppwrite,
  deleteImageFromAppwrite,
  extractFileIdFromUrl
};

