import React from 'react'

const Privacy: React.FC = () => {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Privacy</p>
        <h1 className="text-3xl font-semibold text-white">Privacy policy</h1>
        <p className="max-w-2xl text-slate-400">We respect your data and keep your workflow secure.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-400">
        Privacy policy content is under construction.
      </div>
    </div>
  )
}

export default Privacy
