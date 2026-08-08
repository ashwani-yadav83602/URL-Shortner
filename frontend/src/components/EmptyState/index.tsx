import React from 'react'
import { FiFolder } from 'react-icons/fi'

const EmptyState: React.FC = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-200">
        <FiFolder size={28} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-white">No URLs have been shortened yet</h2>
      <p className="mt-3 max-w-xl mx-auto text-sm text-slate-400">
        Create your first shortened link to begin generating intelligent AI summaries. Your library will appear here instantly.
      </p>
    </div>
  )
}

export default EmptyState
