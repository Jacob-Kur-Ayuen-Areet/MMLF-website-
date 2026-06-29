import api from './client'

export const submitContact = (data) => api.post('/contact', data)
