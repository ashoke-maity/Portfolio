const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    ProjectTitle: {
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true,
        enum:['Ongoing','Completed'],
        default:'Completed'
    },
    Description:{
        type:String,
        required:true,
    },
    GithubRespoLink:{
        type:String,
        required:true,
    },
    LiveDemoURL:{
        type:String,
        required:true,
    },
    ThumbnailImage:{
        type:String,
        required:true,
    },
    TechnologiesUsed:{
        type:[String],
        required:true,
    },
    Features:{
        type:[String],
        required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
})

const ProjectModel = mongoose.model("Project",projectSchema);
module.exports = ProjectModel;