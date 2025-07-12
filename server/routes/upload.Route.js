const express = require('express');
const router = express.Router();
const { uploadImageToAppwrite } = require('../controllers/upload.Controller');
const { uploadSingleImage, handleMulterError } = require('../middlewares/multer.Middleware');

// Route to handle image upload (Admin only)
router.post('/upload-image', uploadSingleImage, async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;

    // Upload file to Appwrite
    const fileUpload = await uploadImageToAppwrite(file);

    // Generate image URL
    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    res.status(200).json({ 
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      fileId: fileUpload.$id 
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});



// Apply multer error handling middleware
router.use(handleMulterError);

module.exports = router;