import React from 'react'

function About() {
  const skills = [
    { category: 'Frontend', items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Authentication', 'JWT'] },
    { category: 'Tools & Others', items: ['Git & GitHub', 'VS Code', 'Postman', 'npm', 'Webpack', 'Agile/Scrum'] }
  ]

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Building web applications using modern technologies. Working with clients to deliver high-quality, scalable solutions.',
      achievements: ['Developed responsive web applications', 'Implemented user authentication systems', 'Optimized application performance']
    },
    {
      title: 'Web Developer Intern',
      company: 'Tech Company',
      period: '2023',
      description: 'Gained hands-on experience in web development and learned industry best practices.',
      achievements: ['Collaborated with senior developers', 'Learned modern development workflows', 'Contributed to team projects']
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate developer with a love for creating innovative solutions and learning new technologies
          </p>
        </div>

        {/* Personal Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Who I Am</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a dedicated Full Stack Developer with a passion for creating beautiful, functional, and user-friendly web applications. 
              My journey in web development started with curiosity and has evolved into a deep love for clean code and innovative solutions.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I believe in continuous learning and staying updated 
              with the latest industry trends.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm always excited to take on new challenges and work on projects that make a real impact. 
              Whether it's building a small business website or a complex web application, I approach each project 
              with enthusiasm and attention to detail.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Based in Your City, Country</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Available for freelance opportunities</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Passionate about clean code</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Always learning new technologies</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Team player and problem solver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">{skillGroup.category}</h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Bachelor's Degree in Computer Science</h3>
                <p className="text-blue-400 font-medium">Your University Name</p>
              </div>
              <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0">
                2020 - 2024
              </span>
            </div>
            <p className="text-gray-300">
              Studied computer science fundamentals, algorithms, data structures, and software engineering principles. 
              Graduated with honors and completed several projects using modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 