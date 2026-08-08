import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

const GlassCard: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

export default GlassCard
