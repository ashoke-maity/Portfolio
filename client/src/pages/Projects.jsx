import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedProject, setExpandedProject] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Animation setup
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Smooth page load animation
    setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

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
    : projects.filter(project => {
        const status = project.Status || project.status;
        if (filter === 'completed') {
          return status === 'Completed' || status === 'completed';
        }
        return status === filter;
      })

  return (
    <div className="min-h-screen py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Interactive Light Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        
        .opacity-0-initial { opacity: 0; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes polaroidDrop {
          0% {
            opacity: 0;
            transform: translateY(-100px) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(10px) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }
        
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
          height: 400px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .polaroid {
          background: linear-gradient(145deg, #374151, #1f2937);
          padding: 20px 20px 60px 20px;
          transform: rotate(0deg);
          transition: all 0.3s ease;
          position: relative;
          animation: polaroidDrop 0.8s ease-out;
          border: 2px solid #4b5563;
        }
        
        .polaroid::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          border-radius: 15px;
          pointer-events: none;
        }
        
        .polaroid:hover {
          transform: rotate(1deg) scale(1.05);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }
        
        .polaroid-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 25px;
          background: linear-gradient(45deg, #ffd700, #ffed4a);
          border-radius: 3px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          opacity: 0.8;
        }
        
        .polaroid-tape::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 1px;
          background: rgba(0,0,0,0.1);
        }
        
        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation: typewriter 2s steps(20) infinite alternate;
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl lg:text-6xl font-bold text-white mb-4 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`}>
            My{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
              Projects
            </span>
          </h1>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
             style={{animationDelay: '0.2s'}}>
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
          <div className={`mt-8 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
               style={{animationDelay: '0.4s'}}>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>
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
              onClick={() => setFilter('Ongoing')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'Ongoing'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProjects.map((project, index) => {
              // Map backend fields to frontend expectations
              const title = project.ProjectTitle || project.title;
              const description = project.Description || project.description;
              const status = project.Status || project.status;
              const thumbnail = project.ThumbnailImage || project.thumbnail;
              const technologies = project.TechnologiesUsed || project.technologies || [];
              const features = project.Features || project.features || [];
              const githubUrl = project.GithubRespoLink || project.github;
              const liveUrl = project.LiveDemoURL || project.live;

              return (
                <div 
                  key={project._id || project.id}
                  className={`flip-card floating ${expandedProject === index ? 'flipped' : ''}`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="flip-card-inner">
                    {/* Front Side - Polaroid Style */}
                    <div className="flip-card-front">
                      <div className="polaroid" style={{
                        transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3)}deg)`
                      }}>
                        {/* Polaroid Tape */}
                        <div className="polaroid-tape"></div>
                        
                        {/* Project Image */}
                        <div className="relative mb-4 bg-gray-700 rounded-lg overflow-hidden shadow-inner border border-gray-500">
                          <img 
                            src={thumbnail || '/project-placeholder.jpg'} 
                            alt={title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23374151'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Cpath d='M200 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 60c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z' fill='%236B7280'/%3E%3Cpath d='M160 200h80v20h-80z' fill='%236B7280'/%3E%3Cpath d='M170 230h60v10h-60z' fill='%236B7280'/%3E%3Ctext x='200' y='260' text-anchor='middle' fill='%236B7280' font-size='24' font-family='Arial'>💻%3C/text%3E%3C/svg%3E"
                            }}
                          />
                          
                          {/* Corner Stickers */}
                          <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                          <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-500 rounded-full opacity-80"></div>
                        </div>
                        
                        {/* Handwritten Style Title */}
                        <div className="text-center">
                          <h3 className="text-white font-bold text-lg mb-2 typewriter-text" style={{
                            fontFamily: 'Courier New, monospace'
                          }}>
                            {title}
                          </h3>
                          
                          {/* Status Badge */}
                          <div className="inline-flex items-center mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === 'Completed' 
                                ? 'bg-green-500 text-green-100' 
                                : 'bg-yellow-500 text-yellow-100'
                            }`}>
                              {status === 'Completed' ? '✓ Completed' : '⚡ Ongoing'}
                            </span>
                          </div>
                          
                          {/* Click to flip instruction */}
                          <p className="text-gray-300 text-sm italic">
                            Click to flip for details →
                          </p>
                        </div>
                        
                        {/* Click handler for flip */}
                        <div 
                          className="absolute inset-0 cursor-pointer"
                          onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                        ></div>
                      </div>
                    </div>

                    {/* Back Side - Detailed Info */}
                    <div className="flip-card-back">
                      <div className="polaroid bg-gray-800 text-white h-full flex flex-col">
                        {/* Back Header */}
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-blue-400">{title}</h3>
                          <button 
                            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                            onClick={() => setExpandedProject(null)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Description */}
                        <div className="mb-4 flex-1">
                          <h4 className="text-sm font-semibold text-blue-300 mb-2">📝 Description</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                        </div>
                        
                        {/* Technologies */}
                        {technologies.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-blue-300 mb-2">⚡ Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Features */}
                        {features.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-blue-300 mb-2">🎯 Features</h4>
                            <div className="space-y-1">
                              {features.slice(0, 3).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                              {features.length > 3 && (
                                <div className="text-sm text-gray-400">
                                  +{features.length - 3} more features...
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-3 mt-auto">
                          {githubUrl && (
                            <a
                              href={githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              Code
                            </a>
                          )}
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
      </div>
    </div>
  )
}

export default Projects 