import api from './client'

export const getPublications = (params = {}) => api.get('/publications', { params })
export const getPublication = (slug) => api.get(`/publications/${slug}`)
