import { useCallback, useMemo, useState } from 'react'
import urlService from '../services/urlService'
import summaryService, { SummaryResponse } from '../services/summaryService'

export type SummaryStatus = 'ready' | 'generating' | 'available' | 'failed'

export interface UrlSummaryItem {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt?: string
  summary?: SummaryResponse
  summaryStatus: SummaryStatus
  loading: boolean
  error?: string
}

interface UseSummaryReturn {
  urls: UrlSummaryItem[]
  adding: boolean
  addUrl: (url: string) => Promise<UrlSummaryItem | null>
  getOrGenerateSummary: (id: string, forceRefresh?: boolean) => Promise<SummaryResponse | null>
  refreshSummary: (id: string) => Promise<SummaryResponse | null>
  updateUrl: (id: string, update: Partial<UrlSummaryItem>) => void
}

const createUrlItem = (data: any): UrlSummaryItem => ({
  id: data._id || data.id || '',
  originalUrl: data.originalUrl || data.url || '',
  shortUrl: data.shortUrl || data.shortUrl || '',
  createdAt: data.createdAt || new Date().toISOString(),
  summary: data.summary || undefined,
  summaryStatus: data.summary ? 'available' : 'ready',
  loading: false,
  error: undefined,
})

export default function useSummary(): UseSummaryReturn {
  const [urls, setUrls] = useState<UrlSummaryItem[]>([])
  const [adding, setAdding] = useState(false)

  const addUrl = useCallback(async (url: string) => {
    setAdding(true)
    try {
      const response = await urlService.shorten(url)
      const item = createUrlItem(response.data || response)
      setUrls((current) => [item, ...current])
      return item
    } catch (error) {
      return null
    } finally {
      setAdding(false)
    }
  }, [])

  const updateUrl = useCallback((id: string, update: Partial<UrlSummaryItem>) => {
    setUrls((current) => current.map((item) => (item.id === id ? { ...item, ...update } : item)))
  }, [])

  const getOrGenerateSummary = useCallback(
    async (id: string, forceRefresh = false) => {
      const item = urls.find((url) => url.id === id)
      if (!item) {
        return null
      }

      if (item.summary && !forceRefresh) {
        return item.summary
      }

      updateUrl(id, { summaryStatus: 'generating', loading: true, error: undefined })
      try {
        const summary = await summaryService.generateSummary(id)
        updateUrl(id, { summary, summaryStatus: 'available', loading: false })
        return summary
      } catch (error) {
        updateUrl(id, { summaryStatus: 'failed', loading: false, error: 'Unable to generate AI summary right now.' })
        return null
      }
    },
    [urls, updateUrl],
  )

  const refreshSummary = useCallback(async (id: string) => getOrGenerateSummary(id, true), [getOrGenerateSummary])

  const memoized = useMemo(
    () => ({ urls, adding, addUrl, getOrGenerateSummary, refreshSummary, updateUrl }),
    [urls, adding, addUrl, getOrGenerateSummary, refreshSummary, updateUrl],
  )

  return memoized
}
