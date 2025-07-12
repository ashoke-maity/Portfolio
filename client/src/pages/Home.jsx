import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Hi, I'm <span className="text-blue-400">Ashoke</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  Full Stack Developer
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  I create beautiful, functional, and user-friendly web applications. 
                  Passionate about clean code and innovative solutions that make a difference.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  View My Work
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">1+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Content - Profile Picture and Animated Elements */}
            <div className="relative flex flex-col items-center lg:items-end">
              {/* Profile Picture */}
              <div className="relative mb-8">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
                  {/* Replace the src with your actual profile picture */}
                  <img
                    src="client/public/profile_pic.png" // Update this path to your actual image
                    alt="Ashoke - Full Stack Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't load
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                    YN
                  </div>
                </div>
                
                {/* Decorative ring around profile picture */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-2 border-purple-400 opacity-20 animate-ping"></div>
              </div>

              {/* Floating Elements around profile picture */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-green-400 rounded-full opacity-30 animate-ping"></div>
              
              {/* Code & Create Card */}
              <div className="relative z-10 mt-8">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-3">💻</div>
                    <h3 className="text-lg font-semibold mb-2">Code & Create</h3>
                    <p className="text-blue-100 text-sm">Building the future, one line at a time, <br /> Always learning. Always building.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technologies I Work With</h2>
            <p className="text-lg text-gray-400">Modern tools and frameworks for building amazing applications</p>
          </div>

          {/* Web Development */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Web Development</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: 'ReactJS', svg: '/reactjs-svgrepo-com.svg', color: 'bg-blue-900' },
                { name: 'Vite', svg: '/vite.svg', color: 'bg-orange-900' },
                { name: 'Node.js', svg: '/nodejs-icon-logo-svgrepo-com.svg', color: 'bg-green-900' },
                { name: 'Express', svg: '/Express.svg', color: 'bg-gray-800' },
                { name: 'JavaScript', svg: '/javascript-svgrepo-com.svg', color: 'bg-yellow-900' },
                { name: 'MongoDB', svg: '/mongodb-svgrepo-com.svg', color: 'bg-green-900' },
                { name: 'Tailwind', svg: '/tailwind-svgrepo-com.svg', color: 'bg-blue-800' },
                { name: 'Three.js', svg: '/Three.js.svg', color: 'bg-gray-900' },
                { name: 'Nodemon', svg: '/Nodemon.svg', color: 'bg-green-800' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AIML */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">AI/ML & Data Science</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: 'Python', svg: '/python-svgrepo-com.svg', color: 'bg-green-800' },
                { name: 'NumPy', svg: '/NumPy.svg', color: 'bg-yellow-900' },
                { name: 'Matplotlib', svg: '/Matplotlib.svg', color: 'bg-purple-900' },
                { name: 'Scikit Learn', svg: '/scikit-learn.svg', color: 'bg-orange-900' },
                { name: 'Pandas', svg: '/Pandas.svg', color: 'bg-blue-900' },
                { name: 'Kaggle', svg: '/Kaggle.svg', color: 'bg-blue-800' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">DevOps</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: 'GitHub', svg: '/github-142-svgrepo-com.svg', color: 'bg-gray-900' },
                { name: 'Docker', svg: '/docker-svgrepo-com.svg', color: 'bg-blue-800' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Deployment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
              { name: 'Vercel', svg: '/vercel-logo-svgrepo-com.svg', color: 'bg-gray-900' },
              { name: 'Render', svg: '/render-icon.png', color: 'bg-blue-900' },
              { name: 'GitHub Actions', svg: '/github-142-svgrepo-com.svg', color: 'bg-gray-800' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editors */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Code Editors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: 'Cursor AI', svg: '/icons8-cursor-ai.svg', color: 'bg-blue-900' },
                { name: 'VS Code', svg: '/Visual Studio Code (VS Code).svg', color: 'bg-blue-800' },
                { name: 'Jupyter', svg: '/Jupyter.svg', color: 'bg-orange-800' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* UI/UX & Design */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">UI/UX & Design</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: 'Figma', svg: '/Figma.svg', color: 'bg-purple-900' },
                { name: 'Adobe After Effects', svg: '/After Effects.svg', color: 'bg-blue-900' },
                { name: 'Adobe Photoshop', svg: '/Adobe Photoshop.svg', color: 'bg-blue-800' },
                { name: 'Adobe Premiere Pro', svg: '/Adobe Premiere Pro.svg', color: 'bg-purple-800' },
                { name: 'Canva', svg: '/Canva.svg', color: 'bg-blue-700' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 border border-gray-700`}>
                    <img src={tech.svg} alt={tech.name} className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
