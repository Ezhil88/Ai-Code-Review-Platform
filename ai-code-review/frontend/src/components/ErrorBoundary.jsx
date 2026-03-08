import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
          <div
            className="max-w-2xl w-full rounded-xl p-8 text-center"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Oops! Something went wrong
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              The application encounteblue an error. Please refresh the page to try again.
            </p>
            
            {/* Error Details (for development) */}
            {this.state.error && (
              <details
                className="text-left rounded-lg p-4 mt-4"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <summary className="text-sm cursor-pointer transition" style={{ color: 'var(--text-tertiary)' }}>
                  Show error details (for debugging)
                </summary>
                <div className="mt-3 space-y-2">
                  <div className="text-xs text-orange-700 font-mono">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div className="text-xs font-mono overflow-auto max-h-40" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Stack trace:</strong>
                      <pre className="mt-1">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="mt-6 button-gradient font-semibold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


