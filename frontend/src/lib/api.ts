import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const charactersApi = {
  list: () => api.get('/api/characters'),
  get: (id: string) => api.get(`/api/characters/${id}`),
  create: (data: any) => api.post('/api/characters', data),
  update: (id: string, data: any) => api.put(`/api/characters/${id}`, data),
  delete: (id: string) => api.delete(`/api/characters/${id}`),
  generate: (preferences?: any) => api.post('/api/characters/generate', preferences),
};
