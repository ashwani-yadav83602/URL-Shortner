import React from 'react'

const AnimatedBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-20%] top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-blob" />
      <div
        className="absolute right-[-10%] top-1/4 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl animate-blob"
        style={{ animationDelay: '1.4s' }}
      />
      <div
        className="absolute left-1/3 bottom-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl animate-blob"
        style={{ animationDelay: '2.8s' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-slate-950/90 to-transparent" />
    </div>
  )
}

export default AnimatedBackground
