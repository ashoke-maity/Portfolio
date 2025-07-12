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

    // Parse fields directly from req.body
    const { ProjectTitle, Description, GithubRespoLink, LiveDemoURL, Status, ThumbnailImage, TechnologiesUsed, Features } = req.body;

    if (!ProjectTitle || !Description) {
      return res.status(400).json({ success: false, msg: 'Project title and description are required.' });
    }

    // Parse arrays if sent as JSON strings
    let technologies = TechnologiesUsed;
    let features = Features;
    if (typeof technologies === 'string') {
      try { technologies = JSON.parse(technologies); } catch {}
    }
    if (typeof features === 'string') {
      try { features = JSON.parse(features); } catch {}
    }

    const newProject = new Project({
      ProjectTitle,
      Description,
      GithubRespoLink,
      LiveDemoURL,
      Status: Status || 'Ongoing',
      ThumbnailImage,
      TechnologiesUsed: technologies,
      Features: features,
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
      ProjectTitle,
      Description,
      GithubRespoLink,
      LiveDemoURL,
      Status,
      ThumbnailImage,
      TechnologiesUsed,
      Features
    } = req.body;

    // Find the project and ensure it belongs to the admin
    const project = await Project.findOne({ _id: projectId, createdBy: req.admin.adminId });
    if (!project) {
      return res.status(404).json({ success: false, msg: 'Project not found or unauthorized.' });
    }

    // Update fields if provided
    if (ProjectTitle !== undefined) project.ProjectTitle = ProjectTitle;
    if (Description !== undefined) project.Description = Description;
    if (GithubRespoLink !== undefined) project.GithubRespoLink = GithubRespoLink;
    if (LiveDemoURL !== undefined) project.LiveDemoURL = LiveDemoURL;
    if (Status !== undefined) project.Status = Status;
    if (ThumbnailImage !== undefined) project.ThumbnailImage = ThumbnailImage;
    if (TechnologiesUsed !== undefined) project.TechnologiesUsed = typeof TechnologiesUsed === 'string' ? JSON.parse(TechnologiesUsed) : TechnologiesUsed;
    if (Features !== undefined) project.Features = typeof Features === 'string' ? JSON.parse(Features) : Features;

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