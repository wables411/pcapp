function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton h-64 rounded-lg mb-4"></div>
      <div className="skeleton h-4 w-3/4 rounded mb-2"></div>
      <div className="skeleton h-4 w-1/2 rounded"></div>
    </div>
  )
}

export default LoadingSkeleton

