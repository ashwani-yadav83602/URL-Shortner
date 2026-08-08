import React, { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(true)

  const toggleTheme = () => {
    setDark((value) => !value)
    document.documentElement.classList.toggle('dark', !dark)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}

export default ThemeToggle
