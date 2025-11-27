import { FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center neon-border p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-heading font-bold mb-4 neon-text">Error</h2>
        <p className="text-red-400 mb-4 font-body">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-neon-green text-black font-heading font-bold rounded-lg hover:neon-glow glitch-hover transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorFallback

