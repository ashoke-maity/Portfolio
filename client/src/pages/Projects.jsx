import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState([])

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

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProjects = localStorage.getItem('portfolioProjects')
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">No projects match the selected filter.</p>
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