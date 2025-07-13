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
    const { ProjectTitle, Description, GithubRespoLink, LiveDemoURL, Status, TechnologiesUsed, Features } = req.body;

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

    // Handle thumbnail upload
    let thumbnailUrl = '';
    if (req.file) {
      const { uploadImageToAppwrite } = require('./upload.Controller');
      try {
        const appwriteResult = await uploadImageToAppwrite(req.file);
        // You may need to construct the URL based on your Appwrite setup
        // For example, if public read is enabled:
        thumbnailUrl = appwriteResult?.$id
          ? `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${appwriteResult.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`
          : '';
      } catch (err) {
        return res.status(500).json({ success: false, msg: 'Thumbnail upload failed.', error: err.message });
      }
    } else {
      return res.status(400).json({ success: false, msg: 'Thumbnail image is required.' });
    }

    const newProject = new Project({
      ProjectTitle,
      Description,
      GithubRespoLink,
      LiveDemoURL,
      Status: Status || 'Ongoing',
      ThumbnailImage: thumbnailUrl,
      TechnologiesUsed: technologies,
      Features: features,
      createdBy: req.admin.adminId
    });
    await newProject.save();

    res.status(201).json({ success: true, msg: 'Project posted successfully.', project: newProject });
  } catch (error) {

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
      TechnologiesUsed,
      Features
    } = req.body;

    // Find the project and ensure it belongs to the admin
    const project = await Project.findOne({ _id: projectId, createdBy: req.admin.adminId });
    if (!project) {
      return res.status(404).json({ success: false, msg: 'Project not found or unauthorized.' });
    }

    // Handle thumbnail upload if a new file is provided
    let thumbnailUrl = project.ThumbnailImage; // Keep existing image by default
    if (req.file) {
      const { uploadImageToAppwrite, deleteImageFromAppwrite, extractFileIdFromUrl } = require('./upload.Controller');
      try {
        // First, try to delete the old image if it exists
        if (project.ThumbnailImage) {
          const oldFileId = extractFileIdFromUrl(project.ThumbnailImage);
          if (oldFileId) {
            try {
              await deleteImageFromAppwrite(oldFileId);
            } catch (deleteError) {
              // Continue with upload even if delete fails
            }
          }
        }
        
        // Upload the new image
        const appwriteResult = await uploadImageToAppwrite(req.file);
        thumbnailUrl = appwriteResult?.$id
          ? `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${appwriteResult.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`
          : project.ThumbnailImage; // Keep existing if upload fails
      } catch (err) {
        // Don't return error, just keep existing image
      }
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

    // Update fields if provided
    if (ProjectTitle !== undefined) project.ProjectTitle = ProjectTitle;
    if (Description !== undefined) project.Description = Description;
    if (GithubRespoLink !== undefined) project.GithubRespoLink = GithubRespoLink;
    if (LiveDemoURL !== undefined) project.LiveDemoURL = LiveDemoURL;
    if (Status !== undefined) project.Status = Status;
    project.ThumbnailImage = thumbnailUrl; // Always update with either new or existing URL
    if (technologies !== undefined) project.TechnologiesUsed = technologies;
    if (features !== undefined) project.Features = features;

    await project.save();

    res.status(200).json({ success: true, msg: 'Project updated successfully.', project });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to update project.', error: error.message });
  }
};

// Admin can delete an existing project
const AdminDeletePost = async (req, res) => {
  try {
    console.log('Delete request received for project:', req.params.projectId);
    
    if (!req.admin) {
      console.log('Unauthorized delete attempt');
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const { projectId } = req.params;
    console.log('Admin ID:', req.admin.adminId, 'Project ID:', projectId);
    
    // First find the project to get the image info
    const project = await Project.findOne({ _id: projectId, createdBy: req.admin.adminId });
    if (!project) {
      console.log('Project not found or unauthorized');
      return res.status(404).json({ success: false, msg: 'Project not found or unauthorized.' });
    }
    
    console.log('Project found:', project.ProjectTitle);
    
    // Delete the associated image from Appwrite if it exists
    if (project.ThumbnailImage) {
      const { deleteImageFromAppwrite, extractFileIdFromUrl } = require('./upload.Controller');
      const fileId = extractFileIdFromUrl(project.ThumbnailImage);
      console.log('Extracted file ID:', fileId);
      if (fileId) {
        try {
          await deleteImageFromAppwrite(fileId);
          console.log('Image deleted successfully from Appwrite');
        } catch (deleteError) {
          console.error('Failed to delete image from Appwrite:', deleteError.message);
          // Continue with project deletion even if image deletion fails
        }
      }
    }
    
    // Now delete the project
    const deletedProject = await Project.findOneAndDelete({ _id: projectId, createdBy: req.admin.adminId });
    console.log('Project deleted from database:', deletedProject ? 'Success' : 'Failed');

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