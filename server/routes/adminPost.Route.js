const express = require('express');
const router = express.Router();
const {AdminPosts,
  AdminExistingPost,
  AdminModifyExistingPost,
  AdminDeletePost,
} = require('../controllers/adminPost.Controller');
const { verifyToken } = require('../middlewares/adminAuth.Middlware');

router.post('/admin/posts', verifyToken, AdminPosts);
router.get('/admin/existingposts/:id', verifyToken, AdminExistingPost);
router.put('/admin/modifyexistingpost/:projectId', verifyToken, AdminModifyExistingPost);
router.delete('/admin/deletepost/:projectId', verifyToken, AdminDeletePost);

module.exports = router;