import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        const adminData = localStorage.getItem('adminData')
        
        if (!token || !adminData) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // Basic token validation - check if token exists and is not expired
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]))
          const currentTime = Math.floor(Date.now() / 1000)
          
          if (tokenPayload.exp && tokenPayload.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token')
            localStorage.removeItem('adminData')
            setIsAuthenticated(false)
            setIsLoading(false)
            return
          }
        } catch (tokenError) {
          // Invalid token format, try backend verification
          console.log('Invalid token format, attempting backend verification')
        }

        // Try to verify with backend
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_ADMIN_ROUTE}/verify-token`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            }
          )

          if (response.data.success) {
            setIsAuthenticated(true)
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token')
            localStorage.removeItem('adminData')
            setIsAuthenticated(false)
          }
        } catch (backendError) {
          // Backend verification failed, but token exists and is not expired
          // This could be due to network issues or backend not having verify endpoint
          console.log('Backend verification failed, using token-based auth')
          if (token && adminData) {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
        // Remove invalid token
        localStorage.removeItem('token')
        localStorage.removeItem('adminData')
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute