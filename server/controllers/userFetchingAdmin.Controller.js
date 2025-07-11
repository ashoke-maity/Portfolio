const Project = require('../models/ProjectModel');

// User fetches all admin posts (projects)
const userFetchAdminPost = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate('createdBy', 'FullName Email') // Optionally populate admin info
      .exec();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('userFetchAdminPost error:', error);
    res.status(500).json({ success: false, msg: 'Failed to fetch projects.', error: error.message });
  }
};

module.exports = userFetchAdminPost;