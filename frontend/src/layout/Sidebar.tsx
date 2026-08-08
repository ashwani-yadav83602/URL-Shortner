import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiHome,
  FiBarChart2,
  FiClock,
  FiStar,
  FiZap,
  FiSettings,
  FiHelpCircle,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import SidebarItem from '../components/SidebarItem'
import StorageCard from '../components/StorageCard'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCollapseToggle: () => void
  onMobileClose: () => void
}

const menuItems = [
  { label: 'Dashboard', icon: <FiHome size={18} />, path: '/' },
  { label: 'Shorten URL', icon: <FiZap size={18} />, path: '/shorten' },
  { label: 'Analytics', icon: <FiBarChart2 size={18} />, path: '/analytics' },
  { label: 'History', icon: <FiClock size={18} />, path: '/history' },
  { label: 'Favorites', icon: <FiStar size={18} />, path: '/favorites' },
  { label: 'AI Summary', icon: <FiLayers size={18} />, path: '/summary' },
  { label: 'Settings', icon: <FiSettings size={18} />, path: '/settings' },
  { label: 'Help', icon: <FiHelpCircle size={18} />, path: '/help' },
]

const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onCollapseToggle, onMobileClose }) => {
  return (
    <>
      <div className={`hidden md:fixed md:inset-y-0 md:z-20 md:flex md:flex-col ${collapsed ? 'md:w-20' : 'md:w-72'}`}>
        <aside className="flex h-full flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl px-3 py-5 shadow-[0_24px_80px_-56px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between gap-3 px-2 pb-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-black text-slate-950">
                S
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-semibold text-white">ShortlyAI</p>
                  <p className="text-xs text-slate-400">AI link suite</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onCollapseToggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-1 pb-5">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                onClick={onMobileClose}
              />
            ))}
          </nav>

          <div className="mt-auto px-2">
            <StorageCard collapsed={collapsed} />
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onMobileClose} />
            <motion.aside
              className="absolute left-0 top-0 h-full w-80 border-r border-white/10 bg-slate-950/95 backdrop-blur-2xl p-5"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between gap-3 pb-5">
                <div>
                  <p className="text-sm font-semibold text-white">ShortlyAI</p>
                  <p className="text-xs text-slate-400">AI URL Suite</p>
                </div>
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                  aria-label="Close sidebar"
                >
                  <FiChevronLeft size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    to={item.path}
                    icon={item.icon}
                    label={item.label}
                    collapsed={false}
                    onClick={onMobileClose}
                  />
                ))}
              </nav>

              <div className="mt-6">
                <StorageCard collapsed={false} />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
