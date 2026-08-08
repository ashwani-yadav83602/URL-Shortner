import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-4">404 — Not Found</h2>
      <p className="mb-6 text-white/80">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-md">Go Home</Link>
    </div>
  )
}

export default NotFound
