const express = require('express');
const router = express.Router();
const {AdminPosts,
  AdminExistingPost,
  AdminModifyExistingPost,
  AdminDeletePost,
} = require('../controllers/adminPost.Controller');
const { verifyToken } = require('../middlewares/adminAuth.Middlware');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.post('/admin/posts', verifyToken, upload.single('thumbnail'), AdminPosts);
router.get('/admin/existingposts/:id', verifyToken, AdminExistingPost);
router.put('/admin/modifyexistingpost/:projectId', verifyToken, AdminModifyExistingPost);
router.delete('/admin/deletepost/:projectId', verifyToken, AdminDeletePost);

module.exports = router;