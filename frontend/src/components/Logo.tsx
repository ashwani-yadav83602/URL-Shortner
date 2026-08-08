import React from 'react'

interface LogoProps {
  compact?: boolean
}

const Logo: React.FC<LogoProps> = ({ compact = false }) => {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-black text-slate-950 shadow-[0_18px_40px_-24px_rgba(56,189,248,0.8)]">
        S
      </div>
      {!compact && (
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-tight text-white">ShortlyAI</p>
          <p className="text-xs text-slate-400">AI URL Shortener</p>
        </div>
      )}
    </div>
  )
}

export default Logo
