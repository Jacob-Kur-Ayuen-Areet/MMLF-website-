import api from './client'

export const submitDonation = (data) => api.post('/donations', data)
