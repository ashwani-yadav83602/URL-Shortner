import React, { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiUser } from 'react-icons/fi'

const menuItems = ['Profile', 'Settings', 'Logout']

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 text-slate-100 transition hover:bg-white/10"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-black text-slate-950">
          A
        </span>
        <span className="hidden text-sm font-medium lg:block">Alex</span>
        <FiChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-3xl border border-white/10 bg-slate-950/95 p-2 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              className="w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-white/5"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserMenu
