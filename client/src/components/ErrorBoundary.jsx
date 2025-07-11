import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Store error information in state for display
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please refresh the page or try again later.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  // Clear all localStorage and go to home
                  localStorage.clear()
                  window.location.href = '/'
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full"
              >
                Go to Home
              </button>
            </div>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-gray-400 hover:text-white mb-2">
                  Error Details (Development Mode)
                </summary>
                <div className="text-xs text-red-400 bg-gray-800 p-4 rounded overflow-auto max-h-40">
                  <div className="font-bold mb-2">Error:</div>
                  <div className="mb-4">{this.state.error.toString()}</div>
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold mb-2">Component Stack:</div>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary