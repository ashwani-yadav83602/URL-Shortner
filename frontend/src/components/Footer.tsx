import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 px-4 py-12 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-black text-slate-950">
              AI
            </span>
            <div>
              <p className="text-lg font-semibold text-white">AI URL Shortener</p>
              <p className="text-sm text-slate-400">Premium short link infrastructure for modern teams.</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-slate-400">
            Fast, trustworthy, and beautifully designed link shortening for startups, creators, and product teams.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Product</p>
            <div className="space-y-2 text-sm text-slate-300">
              <Link to="/" className="block hover:text-white">Home</Link>
              <Link to="/analytics" className="block hover:text-white">Analytics</Link>
              <Link to="/about" className="block hover:text-white">About</Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="https://github.com" className="block hover:text-white">GitHub</a>
              <a href="mailto:support@example.com" className="block hover:text-white">Contact</a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</p>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="#" className="block hover:text-white">Privacy</a>
              <a href="#" className="block hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AI URL Shortener. Crafted for modern SaaS teams.
      </div>
    </footer>
  )
}

export default Footer
