import api from '../api/axios'

export async function shorten(url){
  const res = await api.post('/url/shorten', { url })
  return res.data
}

export async function fetchAll(){
  const res = await api.get('/url/all')
  return res.data
}

export async function del(id){
  const res = await api.delete(`/url/${id}`)
  return res.data
}

export default { shorten, fetchAll, del }
