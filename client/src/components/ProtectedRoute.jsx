import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // Check if admin is logged in
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
  
  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute 