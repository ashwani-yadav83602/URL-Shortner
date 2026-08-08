import React from 'react'

const Terms: React.FC = () => {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Terms</p>
        <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
        <p className="max-w-2xl text-slate-400">Understand the rules that keep your AI URL management secure and reliable.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-400">
        Terms content is currently a placeholder.
      </div>
    </div>
  )
}

export default Terms
