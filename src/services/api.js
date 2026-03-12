import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(req => {
  console.log('🚀 API Request:', req.method, req.url);
  return req;
});

api.interceptors.response.use(
  res => { console.log('✅ API Response:', res.status); return res; },
  err => { console.error('❌ API Error:', err.response?.data || err.message); return Promise.reject(err); }
);

export default api;
