import React from 'react'

const Shorten: React.FC = () => {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Shorten URL</p>
        <h1 className="text-3xl font-semibold text-white">Create your next short link</h1>
        <p className="max-w-2xl text-slate-400">
          Paste your destination URL and instantly generate a clean, brand-worthy short link with full backend routing support.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <button className="rounded-3xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          Start shortening
        </button>
        <button className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
          Explore features
        </button>
      </div>
    </div>
  )
}

export default Shorten
