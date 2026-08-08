import React from 'react'

interface StorageCardProps {
  collapsed: boolean
}

const StorageCard: React.FC<StorageCardProps> = ({ collapsed }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.8)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">Storage Used</p>
          {!collapsed && <p className="text-xs text-slate-400">68% of 2GB</p>}
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          %
        </div>
      </div>
      <div className="mt-4 rounded-full bg-white/5 p-1">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" style={{ width: '68%' }} />
      </div>
      {!collapsed && (
        <button className="mt-4 w-full rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          Upgrade
        </button>
      )}
    </div>
  )
}

export default StorageCard
