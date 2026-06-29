import api from './client'

export const getSettings = () => api.get('/settings')
