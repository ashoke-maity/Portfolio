const express = require('express');
const router = express.Router();

// Route to get image URL by file ID (for users)
router.get('/image/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    
    res.status(200).json({ 
      imageUrl: imageUrl,
      fileId: fileId 
    });
  } catch (err) {
    console.error('Image fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Route to get all images (for users) - optional
router.get('/images', async (req, res) => {
  try {
    // This would require implementing a list function in the controller
    // For now, returning a placeholder response
    res.status(200).json({ 
      message: 'Images list endpoint - implement as needed',
      endpoint: 'GET /images'
    });
  } catch (err) {
    console.error('Images list error:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;