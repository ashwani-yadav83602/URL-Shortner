import { useCallback, useState } from 'react'

export default function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
      return true
    } catch {
      setCopied(false)
      return false
    }
  }, [])

  return { copied, copyText }
}
