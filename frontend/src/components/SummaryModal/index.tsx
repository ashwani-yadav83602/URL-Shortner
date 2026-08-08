import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertCircle, FiRefreshCw, FiCopy, FiX } from 'react-icons/fi'
import useClipboard from '../../hooks/useClipboard'
import type { SummaryResponse } from '../../services/summaryService'

interface SummaryModalProps {
  open: boolean
  summary: SummaryResponse | null
  loading: boolean
  error?: string
  onClose: () => void
  onRefresh: () => Promise<void>
}

const SummaryModal: React.FC<SummaryModalProps> = ({ open, summary, loading, error, onClose, onRefresh }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const { copied, copyText } = useClipboard()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    modalRef.current?.focus()
    return () => previous?.focus()
  }, [open])

  const handleCopy = async () => {
    if (!summary) return
    await copyText(JSON.stringify(summary, null, 2))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-6 overflow-y-auto backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-950/80" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-3xl rounded-[1rem] sm:rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 sm:p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                  <FiAlertCircle size={16} /> AI Generated Summary
                </div>
                <h2 className="text-2xl font-semibold text-white">AI Generated Summary</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
                aria-label="Close summary modal"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {loading && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
                  Generating your summary… Please wait.
                </div>
              )}

              {error && (
                <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-rose-100">
                  <p className="font-semibold">Unable to generate summary</p>
                  <p className="mt-2 text-sm text-rose-100/80">{error}</p>
                </div>
              )}

              {summary && !loading && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Title</p>
                      <p className="mt-2 text-lg font-semibold text-white">{summary.title}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Reading time</p>
                      <p className="mt-2 text-lg font-semibold text-white">{summary.readingTime}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Purpose</p>
                      <p className="mt-2 text-white">{summary.purpose}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Objective</p>
                      <p className="mt-2 text-white">{summary.objective}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">About</p>
                    <p className="mt-2 leading-7 text-slate-300">{summary.about}</p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Key points</p>
                    <ul className="mt-3 space-y-2 list-inside list-disc text-slate-300">
                      {summary.keyPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Website</p>
                    <p className="mt-2 text-white">{summary.website}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <FiCopy className="mr-2" /> {copied ? 'Copied!' : 'Copy Summary'}
              </button>
              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <FiRefreshCw className="mr-2" /> Refresh Summary
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SummaryModal
