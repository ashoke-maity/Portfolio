const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const Project = require('../models/ProjectModel');

// Admin can post a new project
const AdminPosts = async (req, res) => {
  try {
    // Only allow if admin is authenticated
    if (!req.admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    // Get project data from request body
    const { title, description, imageUrl, liveUrl, githubUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, msg: 'Title and description are required.' });
    }

    // Create new project
    const newProject = new Project({
      title,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
      createdBy: req.admin.adminId
    });
    await newProject.save();

    res.status(201).json({ success: true, msg: 'Project posted successfully.', project: newProject });
  } catch (error) {
    console.error('AdminPosts error:', error);
    res.status(500).json({ success: false, msg: 'Failed to post project.', error: error.message });
  }
};

// Admin fetches their existing posts
const AdminExistingPost = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    // Find all projects created by this admin
    const projects = await Project.find({ createdBy: req.admin.adminId });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('AdminExistingPost error:', error);
    res.status(500).json({ success: false, msg: 'Failed to fetch projects.', error: error.message });
  }
};

// Admin can modify an existing project
const AdminModifyExistingPost = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const { projectId } = req.params;
    const {
      status,
      title,
      description,
      githubUrl,
      liveUrl,
      imageUrl,
      technologies,
      features
    } = req.body;

    // Find the project and ensure it belongs to the admin
    const project = await Project.findOne({ _id: projectId, createdBy: req.admin.adminId });
    if (!project) {
      return res.status(404).json({ success: false, msg: 'Project not found or unauthorized.' });
    }

    // Update fields if provided
    if (status !== undefined) project.status = status;
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (imageUrl !== undefined) project.imageUrl = imageUrl;
    if (technologies !== undefined) project.technologies = technologies;
    if (features !== undefined) project.features = features;

    await project.save();

    res.status(200).json({ success: true, msg: 'Project updated successfully.', project });
  } catch (error) {
    console.error('AdminModifyExistingPost error:', error);
    res.status(500).json({ success: false, msg: 'Failed to update project.', error: error.message });
  }
};

// Admin can delete an existing project
const AdminDeletePost = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const { projectId } = req.params;
    // Find and delete the project if it belongs to the admin
    const deletedProject = await Project.findOneAndDelete({ _id: projectId, createdBy: req.admin.adminId });
    if (!deletedProject) {
      return res.status(404).json({ success: false, msg: 'Project not found or unauthorized.' });
    }

    res.status(200).json({ success: true, msg: 'Project deleted successfully.', project: deletedProject });
  } catch (error) {
    console.error('AdminDeletePost error:', error);
    res.status(500).json({ success: false, msg: 'Failed to delete project.', error: error.message });
  }
};

module.exports = {
  AdminPosts,
  AdminExistingPost,
  AdminModifyExistingPost,
  AdminDeletePost,
};