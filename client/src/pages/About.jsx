import React, { useState, useEffect } from 'react';
import profile_pic from '../assets/profile_pic.png';
import ethicalHackingCert from '../assets/Ethical_hacking_certificate.png';
import deloitteJobSimulation from '/deloitte_job_simulation.png';
import HackerRankfrontendCertificate from '/Frontend_hacker_rank_certificate.png';

function About() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Smooth page load animation
    setTimeout(() => setIsLoaded(true), 100)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          } else {
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

  const skills = [
    { 
      category: 'Frontend', 
      icon: '🎨',
      color: 'from-blue-500 to-purple-500',
      items: [
        { name: 'React.js', icon: '⚛️' },
        { name: 'JavaScript (ES6+)', icon: '🟨' },
        { name: 'HTML5', icon: '🟧' },
        { name: 'CSS3', icon: '🔵' },
        { name: 'Tailwind CSS', icon: '💨' },
        { name: 'Responsive Design', icon: '📱' }
      ]
    },
    { 
      category: 'Backend', 
      icon: '⚙️',
      color: 'from-green-500 to-teal-500',
      items: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'RESTful APIs', icon: '🔗' },
        { name: 'Authentication', icon: '🔐' },
        { name: 'JWT', icon: '🎫' }
      ]
    },
    { 
      category: 'Tools & Others', 
      icon: '🛠️',
      color: 'from-orange-500 to-red-500',
      items: [
        { name: 'Git & GitHub', icon: '🐙' },
        { name: 'Postman', icon: '📮' },
        { name: 'Docker', icon: '🐋' },
        { name: 'Linux', icon: '🐧' },
        { name: 'Jira', icon: '📊' }
      ]
    }
  ]

  const Certificates = [
    {
      title: 'Ethical Hacking Certification Course',
      company: 'NIELIT Haridwar',
      period: 'August 2022 - September 2022',
      description: 'Comprehensive course covering ethical hacking fundamentals, penetration testing, vulnerability assessment, and cybersecurity best practices.',
      image: ethicalHackingCert,
    },
    {
      title: 'Deloitte Data Analytics Job Simulation',
      company: 'Forage',
      period: 'July 2025',
      description: 'Comprehensive course covering data analytics concepts, tools, and techniques used in the industry.',
      image: deloitteJobSimulation,
    },
    {
      title: 'Frontend Development Certification',
      company: 'HackerRank',
      period: 'July 2025',
      description: 'Comprehensive course covering frontend development concepts, tools, and techniques used in the industry.',
      image: HackerRankfrontendCertificate,
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
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
        
        @keyframes slideInFromBottom {
          0% { opacity: 0; transform: translateY(100px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes staggeredFadeIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: var(--progress-width); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-slideInFromBottom { animation: slideInFromBottom 0.8s ease-out forwards; }
        .animate-staggeredFadeIn { animation: staggeredFadeIn 0.6s ease-out forwards; }
        .animate-progressFill { animation: progressFill 2s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        
        .opacity-0-initial { opacity: 0; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .skill-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .skill-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .progress-bar {
          position: relative;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--tw-gradient-stops));
          border-radius: inherit;
          transition: width 2s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`} data-animate id="header">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            About{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
              Me
            </span>
          </h1>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
             style={{animationDelay: '0.2s'}}>
            Passionate developer with a love for creating innovative solutions and learning new technologies
          </p>
          <div className={`mt-8 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0-initial'}`}
               style={{animationDelay: '0.4s'}}>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20" data-animate id="personal-info">
          <div className={`space-y-6 ${visibleElements.has('personal-info') ? 'animate-fadeInLeft' : 'opacity-0-initial'}`}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">👨‍💻</span>Who I Am
            </h2>
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a dedicated <span className="text-blue-400 font-semibold">Full Stack Developer</span> with a passion for creating beautiful, functional, and user-friendly web applications. 
                My journey in web development started with curiosity and has evolved into a deep love for clean code and innovative solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community. I believe in <span className="text-purple-400 font-semibold">continuous learning</span> and staying updated 
                with the latest industry trends.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm always excited to take on new challenges and work on projects that make a real impact. 
                Whether it's building a small business website or a complex web application, I approach each project 
                with <span className="text-cyan-400 font-semibold">enthusiasm and attention to detail</span>.
              </p>
            </div>
          </div>
          <div className={`${visibleElements.has('personal-info') ? 'animate-fadeInRight' : 'opacity-0-initial'}`}>
            <div className="glass-effect rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Ashoke Maity</h3>
              <div className="flex justify-center">
                <div className="relative group">
                  <img 
                    src={profile_pic} 
                    alt="Ashoke Maity - Full Stack Developer" 
                    className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg transition-all duration-300 group-hover:border-purple-400 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256' fill='%23374151'%3E%3Ccircle cx='128' cy='128' r='128'/%3E%3Cpath d='M128 120c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0 16c26.5 0 48 21.5 48 48v8c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16v-8c0-26.5 21.5-48 48-48z' fill='%236B7280'/%3E%3C/svg%3E"
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 group-hover:from-blue-300/30 group-hover:to-purple-300/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30 animate-pulse group-hover:opacity-50"></div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-300 text-lg font-medium">Full Stack Developer</p>
                <p className="text-gray-400 mt-2">Passionate about creating innovative solutions</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20" data-animate id="skills">
          <div className={`text-center mb-12 ${visibleElements.has('skills') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}>
            <h2 className="text-3xl font-bold text-white mb-4">Skills & Technologies</h2>
            <p className="text-lg text-gray-400">My technical expertise and proficiency levels</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div 
                key={index} 
                className={`skill-card glass-effect rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 ${visibleElements.has('skills') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                style={{animationDelay: `${0.2 + index * 0.1}s`}}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skillGroup.color} flex items-center justify-center text-xl mr-4`}>
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{skillGroup.category}</h3>
                </div>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(`${index}-${skillIndex}`)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{skill.icon}</span>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mb-20" data-animate id="certificates">
          <div className={`text-center mb-12 ${visibleElements.has('certificates') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}>
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <span className="mr-3">🏆</span>Certificates
            </h2>
            <p className="text-lg text-gray-400">Professional certifications and achievements</p>
          </div>
          <div className="space-y-8">
            {Certificates.map((cert, index) => (
              <div 
                key={index} 
                className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300 ${visibleElements.has('certificates') ? 'animate-staggeredFadeIn' : 'opacity-0-initial'}`}
                style={{animationDelay: `${0.2 + index * 0.1}s`}}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Certificate Image */}
                  <div className="lg:col-span-1">
                    <div className="relative group">
                      <img 
                        src={cert.image} 
                        // alt={cert.title}
                        className="w-full h-64 object-contain bg-white rounded-lg border border-gray-600 cursor-pointer hover:border-blue-400 transition-all duration-300 group-hover:scale-105"
                        onClick={() => setSelectedCertificate(cert)}
                        onLoad={(e) => {
                          console.log('Certificate image loaded successfully:', e.target.src)
                        }}
                        onError={(e) => {
                          console.error('Error loading certificate image:', e.target.src)
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23374151'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Cpath d='M200 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 60c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z' fill='%236B7280'/%3E%3Cpath d='M160 200h80v20h-80z' fill='%236B7280'/%3E%3Cpath d='M170 230h60v10h-60z' fill='%236B7280'/%3E%3C/svg%3E"
                        }}
                      />
                      
                    </div>
                    <p className="text-center text-gray-400 text-sm mt-2">Click to view larger</p>
                  </div>
                  
                  {/* Certificate Details */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                        <p className="text-blue-400 font-medium">{cert.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0">
                        {cert.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{cert.description}</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified Certificate
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20" data-animate id="education">
          <div className={`glass-effect rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300 ${visibleElements.has('education') ? 'animate-fadeInUp' : 'opacity-0-initial'}`}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🎓</span>Education
            </h2>
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">B.Tech in Computer Science and Artificial Intelligence</h3>
                  <p className="text-blue-400 font-medium">Techno India University, West Bengal</p>
                </div>
                <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0">
                  July 2022 - July 2026
                </span>
              </div>
              <p className="text-gray-300 mb-6">
                Currently pursuing a Bachelor's degree in Computer Science and Artificial Intelligence, focusing on software development, machine learning, and data science.
              </p>
              
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🌟</span>Extra Curricular Activities:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="font-semibold text-blue-400">Graphic Designer and video editor</span> for Google Developer Group (GDG), Formerly Google developer students club (GDSC).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      Participated as a <span className="font-semibold text-purple-400">Technical Team assistance</span> in Smart India Hackathon 2023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fadeInUp">
            <div className="relative max-w-4xl max-h-[90vh] w-full animate-scaleIn">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Certificate Image */}
              <div className="bg-white rounded-lg p-4 shadow-2xl">
                <img 
                  src={selectedCertificate.image || '/certificate-placeholder.jpg'} 
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600' fill='%23374151'%3E%3Crect width='800' height='600' fill='%23374151'/%3E%3Cpath d='M400 240c-44.182 0-80 35.818-80 80s35.818 80 80 80 80-35.818 80-80-35.818-80-80-80zm0 120c-22.091 0-40-17.909-40-40s17.909-40 40-40 40 17.909 40 40-17.909 40-40 40z' fill='%236B7280'/%3E%3Cpath d='M320 400h160v40h-160z' fill='%236B7280'/%3E%3Cpath d='M340 460h120v20h-120z' fill='%236B7280'/%3E%3C/svg%3E"
                  }}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{selectedCertificate.title}</h3>
                  <p className="text-gray-600">{selectedCertificate.company} • {selectedCertificate.period}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default About 