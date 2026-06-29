import api from './client'

export const getReports = (params = {}) => api.get('/reports', { params })
export const getReport = (id) => api.get(`/reports/${id}`)
