import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 px-4 py-8 text-sm text-slate-300 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">© 2026 ShortlyAI</p>
          <p className="text-xs text-slate-500">
            Built with <span aria-hidden="true">❤️</span> using React & Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <Link to="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="transition hover:text-white">
            Terms
          </Link>
          <Link to="/documentation" className="transition hover:text-white">
            Documentation
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
