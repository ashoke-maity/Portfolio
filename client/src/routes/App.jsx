import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Admin from '../pages/Admin'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// Removed ProtectedRoute import since the file is deleted
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/projects" element={
            <>
              <Navbar />
              <main>
                <Projects />
              </main>
              <Footer />
            </>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
              <Admin />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App