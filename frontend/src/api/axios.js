import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

// Request interceptor
instance.interceptors.request.use(cfg => {
  return cfg
}, err => Promise.reject(err))

// Response interceptor
instance.interceptors.response.use(res => res, async err => {
  if (!err.response) {
    const config = err.config
    if (!config.__retry) {
      config.__retry = true
      try {
        const resp = await instance(config)
        return resp
      } catch (e) {
        toast.error('Network error. Please try again.')
        return Promise.reject(e)
      }
    }
  }
  const status = err.response?.status
  const msg = status === 400 ? 'Bad request' :
              status === 401 ? 'Unauthorized' :
              status === 403 ? 'Forbidden' :
              status === 404 ? 'Not found' :
              status === 408 ? 'Request timeout' :
              status === 429 ? 'Too many requests' :
              status >= 500 ? 'Server error' : 'Request failed'
  toast.error(msg)
  return Promise.reject(err)
})

export default instance
