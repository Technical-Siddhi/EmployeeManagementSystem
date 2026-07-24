import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy to backend localhost:5000
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const storage = localStorage.getItem('auth-storage');
  const token = storage ? JSON.parse(storage).state?.token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

