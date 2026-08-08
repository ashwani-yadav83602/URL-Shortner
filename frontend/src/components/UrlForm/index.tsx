import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface UrlFormProps {
  onSubmit: (url: string) => Promise<void>
  loading: boolean
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!url.trim()) {
      toast.error('Please enter a valid URL.')
      return
    }
    await onSubmit(url.trim())
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
      <label className="relative block w-full">
        <span className="sr-only">Enter URL</span>
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste a long URL to shorten"
          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/10"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Shortening…' : 'Shorten URL'}
      </button>
    </form>
  )
}

export default UrlForm
