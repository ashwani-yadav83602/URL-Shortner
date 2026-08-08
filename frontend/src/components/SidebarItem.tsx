import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

interface SidebarItemProps {
  to: string
  icon: React.ReactNode
  label: string
  collapsed: boolean
  onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, collapsed, onClick }) => {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) =>
      `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-400/10 text-cyan-300 shadow-[0_12px_40px_-24px_rgba(56,189,248,0.9)]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
    }>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
        {icon}
      </span>
      {!collapsed && (
        <span className="truncate">{label}</span>
      )}
    </NavLink>
  )
}

export default SidebarItem
