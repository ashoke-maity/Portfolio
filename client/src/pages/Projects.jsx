import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get API base URL from environment variable
  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await axios.get(`${SERVER_URL}/portfolio/user/user/projects`)
        
        if (response.data.success) {
          setProjects(response.data.projects)
        } else {
          setError('Failed to fetch projects')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [SERVER_URL])

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter)

  return (
    <div className="min-h-screen py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-2 border border-gray-700">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-blue-400'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'ongoing'
                  ? 'bg-yellow-600 text-white'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400">Projects will appear here once they are added.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? 'No projects have been added yet.' 
                : 'No projects match the selected filter.'}
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            I'm always interested in new opportunities and exciting projects.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Let's Work Together
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Projects 