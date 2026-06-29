import api from './client'

export const getNews = (params = {}) => api.get('/news', { params })
export const getNewsArticle = (slug) => api.get(`/news/${slug}`)
