import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...' }) => {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search</span>
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
        <FiSearch size={18} />
      </span>
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-3xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-sm text-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.8)] outline-none transition duration-300 focus:border-cyan-300/40 focus:bg-slate-950/90 focus:ring-2 focus:ring-cyan-400/10"
      />
    </label>
  )
}

export default SearchBar
