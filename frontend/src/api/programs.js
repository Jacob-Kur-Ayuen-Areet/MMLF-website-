import api from './client'

export const getPrograms = (params = {}) => api.get('/programs', { params })
export const getProgram = (slug) => api.get(`/programs/${slug}`)
