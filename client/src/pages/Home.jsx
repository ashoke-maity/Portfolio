import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import profile_pic from '../assets/profile_pic.png'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Smooth page load animation
    setTimeout(() => setIsLoaded(true), 100)

    // Intersection Observer for scroll animations - triggers every time
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add to visible elements when entering viewport
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          } else {
            // Remove from visible elements when leaving viewport
            setVisibleElements(prev => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach(section => observer.observe(section))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
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
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(60px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInLeft {
          0% { 
            opacity: 0; 
            transform: translateX(-60px); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInRight {
          0% { 
            opacity: 0; 
            transform: translateX(60px); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes scaleIn {
          0% { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes slideInFromBottom {
          0% { 
            opacity: 0; 
            transform: translateY(100px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes staggeredFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        /* Animation classes */
        .animate-fadeInUp { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        
        .animate-fadeInLeft { 
          animation: fadeInLeft 0.8s ease-out forwards; 
        }
        
        .animate-fadeInRight { 
          animation: fadeInRight 0.8s ease-out forwards; 
        }
        
        .animate-scaleIn { 
          animation: scaleIn 0.6s ease-out forwards; 
        }
        
        .animate-slideInFromBottom { 
          animation: slideInFromBottom 0.8s ease-out forwards; 
        }
        
        .animate-staggeredFadeIn { 
          animation: staggeredFadeIn 0.6s ease-out forwards; 
        }
        
        /* Initial hidden states */
        .opacity-0-initial { 
          opacity: 0; 
        }
        
        /* Utility classes */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .tech-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .tech-card:hover {
          transform: rotateY(10deg) rotateX(10deg) scale(1.05);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        
        .holographic {
          position: relative;
          overflow: hidden;
        }
        
        .holographic::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .holographic:hover::before {
          left: 100%;
        }
        
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32" data-animate id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-fadeInLeft' : 'opacity-0-initial'}`}>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Hi, I'm{' '}
                  <span className="text-blue-400">Ashoke Maity</span>
                </h1>
                
                <h2 className={`text-2xl lg:text-3xl font-semibold text-gray-300 ${isLoaded ? 'animate-fadeInLeft' : 'opacity-0-initial'}`}
                    style={{animationDelay: '0.2s'}}>
                  Full Stack Developer
                </h2>
                
                <p className={`text-lg text-gray-400 leading-relaxed ${isLoaded ? 'animate-fadeInLeft' : 'opacity-0-initial'}`}
                   style={{animationDelay: '0.4s'}}>
                  I create beautiful, functional, and user-friendly web applications. 
                  Passionate about clean code and innovative solutions that make a difference.
                </p>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fadeInLeft' : 'opacity-0-initial'}`}
                   style={{animationDelay: '0.6s'}}>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View My Work
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Content - Profile Picture */}
            <div className={`relative flex flex-col items-center lg:items-end ${isLoaded ? 'animate-fadeInRight' : 'opacity-0-initial'}`}>
              {/* Profile Picture */}
              <div className={`relative mb-8 ${isLoaded ? 'animate-scaleIn' : 'opacity-0-initial'}`}
                   style={{animationDelay: '0.3s'}}>
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105">
                  <img
                    src={profile_pic}
                    alt="Ashoke - Full Stack Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                    AM
                  </div>
                </div>
                
                {/* Subtle decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30 animate-pulse"></div>
              </div>

              {/* Simple Info Card */}
              <div className={`relative z-10 mt-8 ${isLoaded ? 'animate-slideInFromBottom' : 'opacity-0-initial'}`}
                   style={{animationDelay: '0.8s'}}>
                <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-all duration-300 hover:border-blue-400 hover:shadow-3xl">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-3">💻</div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Code & Create</h3>
                    <p className="text-gray-300 text-sm">
                      Building the future, one line at a time.<br />
                      Always learning. Always building.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 relative" data-animate id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}>
            <h2 className="text-3xl font-bold text-white mb-4 holographic">
              Technologies I Work With
            </h2>
            <p className="text-lg text-gray-400">Modern tools and frameworks for building amazing applications</p>
          </div>

          {/* Interactive Tech Categories */}
          <div className="space-y-12">
            {/* Web Development */}
            <div className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
                 style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center">
                <span className="mr-3">🌐</span>Web Development
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: 'ReactJS', svg: '/reactjs-svgrepo-com.svg', color: 'from-blue-500 to-blue-600', description: 'Frontend Library' },
                  { name: 'Vite', svg: '/vite.svg', color: 'from-orange-500 to-orange-600', description: 'Build Tool' },
                  { name: 'Node.js', svg: '/nodejs-icon-logo-svgrepo-com.svg', color: 'from-green-500 to-green-600', description: 'Runtime Environment' },
                  { name: 'Express', svg: '/Express.svg', color: 'from-gray-500 to-gray-600', description: 'Backend Framework' },
                  { name: 'JavaScript', svg: '/javascript-svgrepo-com.svg', color: 'from-yellow-500 to-yellow-600', description: 'Programming Language' },
                  { name: 'MongoDB', svg: '/mongodb-svgrepo-com.svg', color: 'from-green-500 to-green-600', description: 'Database' },
                  { name: 'Tailwind', svg: '/tailwind-svgrepo-com.svg', color: 'from-blue-500 to-teal-500', description: 'CSS Framework' },
                  { name: 'Three.js', svg: '/Three.js.svg', color: 'from-gray-500 to-gray-600', description: '3D Graphics' },
                  { name: 'Nodemon', svg: '/Nodemon.svg', color: 'from-green-500 to-green-600', description: 'Development Tool' }
                ].map((tech, index) => (
                  <div 
                    key={index} 
                    className={`text-center group ${visibleElements.has('skills') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                    style={{animationDelay: `${0.4 + index * 0.1}s`}}
                  >
                    <div className={`tech-card bg-gradient-to-br ${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-600 relative overflow-hidden`}>
                      <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain relative z-10" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI/ML & Data Science */}
            <div className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-purple-400 transition-all duration-300 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
                 style={{animationDelay: '0.4s'}}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center">
                <span className="mr-3">🤖</span>AI/ML & Data Science
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: 'Python', svg: '/python-svgrepo-com.svg', color: 'from-green-500 to-blue-500', description: 'Programming Language' },
                  { name: 'NumPy', svg: '/NumPy.svg', color: 'from-yellow-500 to-orange-500', description: 'Scientific Computing' },
                  { name: 'Matplotlib', svg: '/Matplotlib.svg', color: 'from-purple-500 to-pink-500', description: 'Data Visualization' },
                  { name: 'Scikit Learn', svg: '/scikit-learn.svg', color: 'from-orange-500 to-red-500', description: 'Machine Learning' },
                  { name: 'Pandas', svg: '/Pandas.svg', color: 'from-blue-500 to-purple-500', description: 'Data Analysis' },
                  { name: 'Kaggle', svg: '/Kaggle.svg', color: 'from-blue-500 to-cyan-500', description: 'ML Platform' }
                ].map((tech, index) => (
                  <div 
                    key={index} 
                    className={`text-center group ${visibleElements.has('skills') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                    style={{animationDelay: `${0.6 + index * 0.1}s`}}
                  >
                    <div className={`tech-card bg-gradient-to-br ${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-600 relative overflow-hidden`}>
                      <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain relative z-10" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps & Deployment */}
            <div className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-300 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
                 style={{animationDelay: '0.6s'}}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center">
                <span className="mr-3">🚀</span>DevOps & Deployment
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: 'GitHub', svg: '/github-142-svgrepo-com.svg', color: 'from-gray-500 to-gray-600', description: 'Version Control' },
                  { name: 'Docker', svg: '/docker-svgrepo-com.svg', color: 'from-blue-500 to-blue-600', description: 'Containerization' },
                  { name: 'Vercel', svg: '/vercel-logo-svgrepo-com.svg', color: 'from-gray-500 to-gray-600', description: 'Deployment Platform' },
                  { name: 'Render', svg: '/render-icon.png', color: 'from-blue-500 to-purple-500', description: 'Cloud Platform' },
                  { name: 'GitHub Actions', svg: '/github-142-svgrepo-com.svg', color: 'from-gray-500 to-blue-500', description: 'CI/CD' }
                ].map((tech, index) => (
                  <div 
                    key={index} 
                    className={`text-center group ${visibleElements.has('skills') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                    style={{animationDelay: `${0.8 + index * 0.1}s`}}
                  >
                    <div className={`tech-card bg-gradient-to-br ${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-600 relative overflow-hidden`}>
                      <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain relative z-10" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Tools & Design */}
            <div className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-pink-400 transition-all duration-300 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
                 style={{animationDelay: '0.8s'}}>
              <h3 className="text-xl font-semibold text-pink-400 mb-6 flex items-center">
                <span className="mr-3">🎨</span>Development Tools & Design
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: 'Cursor AI', svg: '/icons8-cursor-ai.svg', color: 'from-blue-500 to-purple-500', description: 'AI Code Editor' },
                  { name: 'VS Code', svg: '/Visual Studio Code (VS Code).svg', color: 'from-blue-500 to-blue-600', description: 'Code Editor' },
                  { name: 'Jupyter', svg: '/Jupyter.svg', color: 'from-orange-500 to-orange-600', description: 'Notebook Environment' },
                  { name: 'Postman', svg: '/Postman.svg', color: 'from-orange-500 to-red-500', description: 'API Testing Tool' },
                  { name: 'Figma', svg: '/Figma.svg', color: 'from-purple-500 to-pink-500', description: 'Design Tool' },
                  { name: 'Adobe After Effects', svg: '/After Effects.svg', color: 'from-blue-500 to-purple-500', description: 'Motion Graphics' },
                  { name: 'Adobe Photoshop', svg: '/Adobe Photoshop.svg', color: 'from-blue-500 to-blue-600', description: 'Image Editor' },
                  { name: 'Adobe Premiere Pro', svg: '/Adobe Premiere Pro.svg', color: 'from-purple-500 to-pink-500', description: 'Video Editor' },
                  { name: 'Canva', svg: '/Canva.svg', color: 'from-blue-500 to-cyan-500', description: 'Graphic Design' }
                ].map((tech, index) => (
                  <div 
                    key={index} 
                    className={`text-center group ${visibleElements.has('skills') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                    style={{animationDelay: `${1.0 + index * 0.1}s`}}
                  >
                    <div className={`tech-card bg-gradient-to-br ${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-600 relative overflow-hidden`}>
                      <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain relative z-10" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
