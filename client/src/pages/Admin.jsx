import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [visitorCount, setVisitorCount] = useState(0)
  const [projects, setProjects] = useState([])
  const [adminInfo, setAdminInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [initializing, setInitializing] = useState(true)
  const [criticalError, setCriticalError] = useState(null)
  const navigate = useNavigate()

  // Get admin route from environment variable
  const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_ROUTE

  // Set up axios interceptors
  useEffect(() => {
    // Request interceptor to add token to all requests
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle common errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log('401 error detected, clearing auth data and redirecting to login')
          localStorage.removeItem('token')
          localStorage.removeItem('adminCredentials')
          localStorage.removeItem('adminData')
          localStorage.removeItem('adminLoggedIn')
          localStorage.removeItem('adminEmail')
          // Use window.location to avoid navigation loops
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  // Load admin info on component mount
  useEffect(() => {
    let isMounted = true
    
    const initializeAdmin = async () => {
      try {
        console.log('Initializing admin...')
        if (!isMounted) return
        
        const adminEmail = localStorage.getItem('adminEmail')
        const adminCredentials = localStorage.getItem('adminCredentials')
        const token = localStorage.getItem('token')
        
        console.log('Admin initialization - Token exists:', !!token)
        console.log('Admin initialization - Admin credentials exist:', !!adminCredentials)
        
        if (!token) {
          console.log('No token found, redirecting to login')
          if (isMounted) {
            setInitializing(false)
            navigate('/login')
          }
          return
        }
        
        if (adminCredentials) {
          try {
            const admin = JSON.parse(adminCredentials)
            console.log('Admin credentials parsed successfully:', admin)
            if (isMounted) {
              setAdminInfo(admin)
              setInitializing(false)
              console.log('Admin initialized successfully')
            }
          } catch (error) {
            console.error('Error parsing admin credentials:', error)
            if (isMounted) {
              setInitializing(false)
              navigate('/login')
            }
            return
          }
        } else {
          console.log('No admin credentials found, redirecting to login')
          if (isMounted) {
            setInitializing(false)
            navigate('/login')
          }
          return
        }
      } catch (error) {
        console.error('Error initializing admin:', error)
        if (isMounted) {
          setCriticalError('Failed to initialize admin panel')
          setInitializing(false)
        }
      }
    }

    initializeAdmin()
    
    return () => {
      isMounted = false
    }
  }, [])

  // Load projects from database on component mount
  useEffect(() => {
    console.log('useEffect for fetchProjects triggered')
    console.log('adminInfo:', adminInfo)
    if (adminInfo && (adminInfo.adminId || adminInfo.id)) {
      console.log('Calling fetchProjects...')
      fetchProjects()
    } else {
      console.log('Not calling fetchProjects - admin info not ready')
    }
  }, [adminInfo])

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      // Ensure adminInfo is available
      if (!adminInfo || (!adminInfo.adminId && !adminInfo.id)) {
        console.log('Admin info not available, skipping fetch')
        console.log('adminInfo:', adminInfo)
        setLoading(false)
        return
      }

      const adminId = adminInfo.adminId || adminInfo.id
      console.log('Fetching projects for admin ID:', adminId)
      console.log('Making API call to:', `${ADMIN_ROUTE}/admin/existingposts/${adminId}`)
      
      const response = await axios.get(`${ADMIN_ROUTE}/admin/existingposts/${adminId}`)
      
      console.log('API response:', response.data)

      if (response.data.success) {
        setProjects(response.data.projects || [])
        setError('')
        console.log('Projects fetched successfully:', response.data.projects)
      } else {
        setError(response.data.msg || 'Failed to fetch projects')
        console.log('API error:', response.data.msg)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      console.log('Error status:', error.response?.status)
      console.log('Error data:', error.response?.data)
      setError(error.response?.data?.msg || 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    status: 'Completed',
    technologies: [],
    features: [],
    githubUrl: '',
    liveUrl: ''
  })
  const [techInput, setTechInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [editingProject, setEditingProject] = useState(null)

  // Simulate visitor count increment
  useEffect(() => {
    const updateVisitorCount = () => {
      const storedCount = localStorage.getItem('visitorCount') || 0
      const count = parseInt(storedCount) || 0
      
      // Only increment if it's a new session (check if user just logged in)
      const lastVisit = localStorage.getItem('lastVisit')
      const now = Date.now()
      
      if (!lastVisit || now - parseInt(lastVisit) > 30000) { // 30 seconds
        const newCount = count + 1
        localStorage.setItem('visitorCount', newCount.toString())
        localStorage.setItem('lastVisit', now.toString())
        setVisitorCount(newCount)
      } else {
        setVisitorCount(count)
      }
    }
    
    const timeoutId = setTimeout(updateVisitorCount, 500)
    return () => clearTimeout(timeoutId)
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
          imageUrl: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.post(`${ADMIN_ROUTE}/admin/posts`, {
        title: newProject.title,
        description: newProject.description,
        imageUrl: newProject.imageUrl,
        githubUrl: newProject.githubUrl,
        liveUrl: newProject.liveUrl,
        status: newProject.status,
        technologies: newProject.technologies,
        features: newProject.features
      })

      if (response.data.success) {
        // Reset form
        setNewProject({
          title: '',
          description: '',
          imageUrl: '',
          status: 'ongoing',
          technologies: [],
          features: [],
          githubUrl: '',
          liveUrl: ''
        })
        // Refresh projects list
        fetchProjects()
        setError('')
      } else {
        setError(response.data.msg || 'Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      setError(error.response?.data?.msg || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (projectId, updatedData) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.put(`${ADMIN_ROUTE}/admin/modifyexistingpost/${projectId}`, updatedData)

      if (response.data.success) {
        // Refresh projects list
        fetchProjects()
        setError('')
        setEditingProject(null)
      } else {
        setError(response.data.msg || 'Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      setError(error.response?.data?.msg || 'Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.delete(`${ADMIN_ROUTE}/admin/deletepost/${id}`)

      if (response.data.success) {
        // Refresh projects list
        fetchProjects()
        setError('')
      } else {
        setError(response.data.msg || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      setError(error.response?.data?.msg || 'Failed to delete project')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('adminData')
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminCredentials')
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
        {loading ? (
          <div className="text-center py-4">
            <div className="text-gray-400">Loading projects...</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-gray-400">No projects found. Create your first project!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">💻</div>
                  <div>
                    <h4 className="text-white font-medium">{project.title}</h4>
                    <p className="text-gray-400 text-sm">{project.status}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">
                  {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            ))}
          </div>
        )}
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
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo URL</label>
              <input
                type="url"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
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
            {newProject.imageUrl && (
              <div className="mt-2">
                <img src={newProject.imageUrl} alt="Thumbnail preview" className="w-32 h-32 object-cover rounded-lg" />
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

          {error && (
            <div className="p-4 bg-red-900 border border-red-700 rounded-lg">
              <div className="text-red-300 text-sm">{error}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              loading 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Existing Projects</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading projects...</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">No projects found. Create your first project above!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-12 h-12 object-cover rounded-lg" />
                  ) : (
                    <div className="text-2xl">💻</div>
                  )}
                  <div>
                    <h4 className="text-white font-medium">{project.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {project.status} • {project.technologies ? project.technologies.length : 0} technologies
                    </p>
                    <div className="flex space-x-2 mt-1">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-green-400 hover:text-green-300"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    disabled={loading}
                    className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                      loading 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    disabled={loading}
                    className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                      loading 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Edit Project</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleUpdateProject(editingProject._id, {
                title: editingProject.title,
                description: editingProject.description,
                imageUrl: editingProject.imageUrl,
                githubUrl: editingProject.githubUrl,
                liveUrl: editingProject.liveUrl,
                status: editingProject.status,
                technologies: editingProject.technologies || [],
                features: editingProject.features || []
              })
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({...editingProject, githubUrl: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                <input
                  type="url"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({...editingProject, liveUrl: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    loading 
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  // Show critical error screen
  if (criticalError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{criticalError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  // Show loading screen while initializing
  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-white mt-4">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">Manage your portfolio and track visitors</p>
              {adminInfo && (
                <p className="text-sm text-blue-400">Logged in as: {adminInfo.name || adminInfo.email}</p>
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
  } catch (error) {
    console.error('Critical error in Admin component:', error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">An unexpected error occurred. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }
}

export default Admin 