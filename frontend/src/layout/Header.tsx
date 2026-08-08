import React from 'react'
import { FiBell, FiGithub, FiMenu } from 'react-icons/fi'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import ThemeToggle from '../components/ThemeToggle'
import UserMenu from '../components/UserMenu'

interface HeaderProps {
  onMobileToggle: () => void
  isSidebarCollapsed: boolean
  onCollapseToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ onMobileToggle, isSidebarCollapsed, onCollapseToggle }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMobileToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu size={20} />
        </button>

        <div className="hidden md:flex items-center gap-3">
          <Logo compact={false} />
          <button
            type="button"
            onClick={onCollapseToggle}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            {isSidebarCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        <div className="flex-1">
          <SearchBar placeholder="Search your URLs..." />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
            aria-label="Notifications"
          >
            <FiBell size={20} />
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
