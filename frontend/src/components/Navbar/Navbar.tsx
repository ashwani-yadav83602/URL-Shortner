import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_25px_80px_-60px_rgba(15,23,42,0.8)]">
      <div className="border-b border-white/5 bg-slate-950/75 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80 sm:px-6 lg:px-8">
        <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-cyan-400" />
        Ultra-fast redirection + premium SaaS design, now live.
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-3 text-white transition hover:text-cyan-300">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20 text-lg font-black text-slate-950">
            AI
          </span>
          <span className="text-lg font-semibold tracking-tight">AI URL Shortener</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex md:gap-6 lg:gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
          >
            View source
          </a>
          <Link
            to="/analytics"
            className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
          >
            Get started
          </Link>
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="space-y-3">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-white/5 hover:text-white'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/analytics"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-white/5 hover:text-white'}`
              }
            >
              Analytics
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-white/5 hover:text-white'}`
              }
            >
              About
            </NavLink>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              View source
            </a>
            <Link
              to="/analytics"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
