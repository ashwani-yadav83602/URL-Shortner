import React, { useCallback, useMemo, useState } from 'react'
import UrlForm from '../../components/UrlForm'
import SummaryLibrary from '../../components/SummaryLibrary'
import SummaryModal from '../../components/SummaryModal'
import EmptyState from '../../components/EmptyState'
import useSummary from '../../hooks/useSummary'
import toast from 'react-hot-toast'

const Home: React.FC = () => {
  const { urls, adding, addUrl, getOrGenerateSummary, refreshSummary } = useSummary()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | undefined>(undefined)
  const [currentSummary, setCurrentSummary] = useState<any>(null)

  const handleSubmit = useCallback(async (url: string) => {
    const item = await addUrl(url)
    if (!item) {
      toast.error('Unable to shorten the URL. Please try again.')
      return
    }
    toast.success('URL shortened successfully!')
    // Automatically open AI summary modal for the newly created item
    try {
      await openSummary(item.id)
    } catch (e) {
      // already handled inside openSummary
    }
  }, [addUrl])

  const openSummary = useCallback(async (id: string) => {
    const item = urls.find((entry) => entry.id === id)
    if (!item) {
      toast.error('Summary item not found.')
      return
    }

    setSelectedId(id)
    setModalError(undefined)
    setModalLoading(true)
    setModalOpen(true)

    try {
      const summary = await getOrGenerateSummary(id)
      if (!summary) {
        setModalError('Unable to generate the summary right now. Please try again later.')
        return
      }
      setCurrentSummary(summary)
    } catch {
      setModalError('Unable to generate the summary right now. Please try again later.')
    } finally {
      setModalLoading(false)
    }
  }, [getOrGenerateSummary, urls])

  const handleRefresh = useCallback(async () => {
    if (!selectedId) return
    setModalLoading(true)
    setModalError(undefined)

    try {
      const summary = await refreshSummary(selectedId)
      if (!summary) {
        setModalError('Unable to refresh the summary right now.')
        return
      }
      setCurrentSummary(summary)
      toast.success('AI summary refreshed.')
    } catch {
      setModalError('Unable to refresh the summary right now.')
    } finally {
      setModalLoading(false)
    }
  }, [refreshSummary, selectedId])

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Unable to copy to clipboard')
    }
  }, [])

  const handleOpen = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

  const recentCount = useMemo(() => urls.length, [urls.length])

  return (
    <div className="relative isolate overflow-hidden py-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_25%),radial-gradient(circle_at_45%_20%,_rgba(168,85,247,0.16),_transparent_18%),radial-gradient(circle_at_right,_rgba(56,189,248,0.08),_transparent_20%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_22%),radial-gradient(circle_at_60%_75%,_rgba(16,185,129,0.12),_transparent_22%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <div className="mb-6 space-y-3 text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">AI Summary Workflow</p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Shorten, summarize, and explore links with AI.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-400">
              Paste a long URL, create a short link instantly, and generate an intelligent AI summary in a polished glassmorphism library.
            </p>
          </div>

          <UrlForm onSubmit={handleSubmit} loading={adding} />
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">AI Summary Library</h2>
            <p className="text-sm text-slate-400">Your recently shortened URLs are available here. Click AI Summary to generate an intelligent overview.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            {recentCount} link{recentCount === 1 ? '' : 's'} saved
          </div>
        </div>

        {urls.length === 0 ? (
          <EmptyState />
        ) : (
          <SummaryLibrary
            items={urls}
            onSummary={openSummary}
            onCopy={handleCopy}
            onOpen={handleOpen}
          />
        )}
      </div>

      <SummaryModal
        open={modalOpen}
        summary={currentSummary}
        loading={modalLoading}
        error={modalError}
        onClose={() => setModalOpen(false)}
        onRefresh={handleRefresh}
      />
    </div>
  )
}

export default Home
