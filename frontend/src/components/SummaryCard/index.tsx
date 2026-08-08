import React, { useMemo } from 'react'
import { FiExternalLink, FiCopy, FiPlay, FiClock } from 'react-icons/fi'
import type { UrlSummaryItem } from '../../hooks/useSummary'

interface SummaryCardProps {
  item: UrlSummaryItem
  onSummary: () => Promise<void>
  onCopy: (text: string) => Promise<void>
  onOpen: () => void
}

const statusLabel = {
  ready: 'Ready',
  generating: 'Generating Summary',
  available: 'Summary Available',
  failed: 'Failed',
}

const statusStyle = {
  ready: 'bg-white/10 text-slate-100',
  generating: 'bg-amber-500/15 text-amber-300',
  available: 'bg-emerald-500/15 text-emerald-300',
  failed: 'bg-rose-500/15 text-rose-300',
}

const SummaryCard: React.FC<SummaryCardProps> = ({ item, onSummary, onCopy, onOpen }) => {
  const truncatedUrl = useMemo(() => {
    return item.originalUrl.length > 38 ? `${item.originalUrl.slice(0, 36)}...` : item.originalUrl
  }, [item.originalUrl])

  const handleCopy = async () => {
    await onCopy(item.shortUrl)
  }

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20">
      {item.loading && (
        <div className="absolute inset-0 z-10 rounded-3xl bg-slate-950/80 backdrop-blur-xl" />
      )}
      <div className="relative z-20 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
            <FiExternalLink size={18} />
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.summaryStatus]}`}>
            {statusLabel[item.summaryStatus]}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Original URL</p>
          <p className="max-w-full break-words text-sm text-slate-200" title={item.originalUrl}>
            {truncatedUrl}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Short URL</p>
          <a
            href={item.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-medium text-cyan-300 transition hover:text-cyan-100"
          >
            {item.shortUrl}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <div className="inline-flex items-center gap-2">
            <FiClock size={16} />
            <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs uppercase tracking-[0.26em] text-slate-300">ID {item.id.slice(-6)}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            aria-label="Copy short URL"
          >
            <FiCopy size={16} /> Copy
          </button>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            aria-label="Open short URL"
          >
            <FiExternalLink size={16} /> Open
          </button>
          <button
            type="button"
            onClick={onSummary}
            disabled={item.loading}
            className={`inline-flex items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm font-semibold transition ${item.loading ? 'bg-slate-700 text-slate-200' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'}`}
            aria-label="Generate AI summary"
          >
            <FiPlay size={16} />
            {item.loading ? 'Generating...' : 'AI Summary'}
          </button>
        </div>

        {item.error && <p className="text-sm text-rose-300">{item.error}</p>}
      </div>
    </article>
  )
}

export default React.memo(SummaryCard)
