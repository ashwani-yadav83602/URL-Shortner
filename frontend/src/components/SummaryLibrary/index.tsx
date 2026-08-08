import React from 'react'
import SummaryCard from '../SummaryCard'
import type { UrlSummaryItem } from '../../hooks/useSummary'

interface SummaryLibraryProps {
  items: UrlSummaryItem[]
  onSummary: (id: string) => Promise<void>
  onCopy: (text: string) => Promise<void>
  onOpen: (url: string) => void
}

const SummaryLibrary: React.FC<SummaryLibraryProps> = ({ items, onSummary, onCopy, onOpen }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <SummaryCard
          key={item.id}
          item={item}
          onSummary={() => onSummary(item.id)}
          onCopy={onCopy}
          onOpen={() => onOpen(item.shortUrl)}
        />
      ))}
    </div>
  )
}

export default React.memo(SummaryLibrary)
