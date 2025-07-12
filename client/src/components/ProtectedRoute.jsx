import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      
      const token = localStorage.getItem('token')
      const adminCredentials = localStorage.getItem('adminCredentials')
      
      // Simple check: if both token and admin credentials exist, user is authenticated
      if (token && adminCredentials) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      
      setIsLoading(false)

    }

    // Check authentication immediately
    checkAuth()
    
    // Fallback timeout - if still loading after 3 seconds, assume not authenticated
    const fallbackTimeout = setTimeout(() => {
      if (isLoading) {
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }, 3000)

    return () => clearTimeout(fallbackTimeout)
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Verifying authentication...</p>
          <p className="text-gray-500 mt-2 text-sm">If this takes too long, please refresh the page</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute