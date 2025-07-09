import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [visitorCount, setVisitorCount] = useState(0)
  const [projects, setProjects] = useState([])
  const [adminInfo, setAdminInfo] = useState(null)
  const navigate = useNavigate()

  // Load admin info on component mount
  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail')
    const adminCredentials = localStorage.getItem('adminCredentials')
    
    if (adminCredentials) {
      const admin = JSON.parse(adminCredentials)
      setAdminInfo(admin)
    }
  }, [])

  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolioProjects')
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      // Default projects if none exist
      const defaultProjects = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration.',
          image: '🛒',
          thumbnail: null,
          status: 'completed',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
          features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Processing', 'Admin Dashboard'],
          github: 'https://github.com/yourusername/ecommerce-app',
          live: 'https://your-ecommerce-app.com',
          category: 'web-app',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          title: 'Task Management System',
          description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
          image: '📋',
          thumbnail: null,
          status: 'ongoing',
          technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
          features: ['Real-time Updates', 'Team Collaboration', 'Task Assignment', 'Progress Tracking', 'File Sharing'],
          github: 'https://github.com/yourusername/task-manager',
          live: null,
          category: 'web-app',
          createdAt: '2024-02-01'
        }
      ]
      setProjects(defaultProjects)
      localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects))
    }
  }, [])
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '💻',
    thumbnail: null,
    status: 'ongoing',
    technologies: [],
    features: [],
    github: '',
    live: '',
    category: 'web-app'
  })
  const [techInput, setTechInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  // Simulate visitor count increment
  useEffect(() => {
    const storedCount = localStorage.getItem('visitorCount') || 0
    const newCount = parseInt(storedCount) + 1
    localStorage.setItem('visitorCount', newCount.toString())
    setVisitorCount(newCount)
  }, [])

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (index) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index)
    })
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setNewProject({
        ...newProject,
        features: [...newProject.features, featureInput.trim()]
      })
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index) => {
    setNewProject({
      ...newProject,
      features: newProject.features.filter((_, i) => i !== index)
    })
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewProject({
          ...newProject,
          thumbnail: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProject = (e) => {
    e.preventDefault()
    const project = {
      ...newProject,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
    setNewProject({
      title: '',
      description: '',
      image: '💻',
      thumbnail: null,
      status: 'ongoing',
      technologies: [],
      features: [],
      github: '',
      live: '',
      category: 'web-app'
    })
  }

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminEmail')
    navigate('/login')
  }

  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Visitors</p>
              <p className="text-2xl font-bold text-white">{visitorCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold text-white">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Ongoing Projects</p>
              <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'ongoing').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{project.image}</div>
                <div>
                  <h4 className="text-white font-medium">{project.title}</h4>
                  <p className="text-gray-400 text-sm">{project.status}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{project.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const ProjectManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Project Management</h2>
      
      {/* Add New Project Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Project</h3>
        <form onSubmit={handleSubmitProject} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter project description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={newProject.github}
                onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo URL</label>
              <input
                type="url"
                value={newProject.live}
                onChange={(e) => setNewProject({...newProject, live: e.target.value})}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-project.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {newProject.thumbnail && (
              <div className="mt-2">
                <img src={newProject.thumbnail} alt="Thumbnail preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add technology"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newProject.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded-full flex items-center">
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(index)}
                    className="ml-2 text-blue-400 hover:text-blue-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newProject.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full flex items-center">
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-green-400 hover:text-green-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Existing Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} className="w-12 h-12 object-cover rounded-lg" />
                ) : (
                  <div className="text-2xl">{project.image}</div>
                )}
                <div>
                  <h4 className="text-white font-medium">{project.title}</h4>
                  <p className="text-gray-400 text-sm">{project.status} • {project.technologies.length} technologies</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400">Manage your portfolio and track visitors</p>
            {adminInfo && (
              <p className="text-sm text-blue-400">Logged in as: {adminInfo.name} ({adminInfo.email})</p>
            )}
          </div>
          <div className="flex space-x-3">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Portfolio
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Project Management
          </button>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'projects' && <ProjectManagement />}
      </div>
    </div>
  )
}

export default Admin 