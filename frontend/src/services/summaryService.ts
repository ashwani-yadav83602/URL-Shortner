import api from '../api/axios'

export interface SummaryResponse {
  title: string
  about: string
  purpose: string
  objective: string
  keyPoints: string[]
  readingTime: string
  website: string
}

export async function generateSummary(id: string) {
  const res = await api.post(`/summary/${id}`)
  return res.data.data.summary as SummaryResponse
}

export default { generateSummary }
