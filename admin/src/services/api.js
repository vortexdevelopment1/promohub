import axios from 'axios';

/**
 * ==========================================================
 * ADMIN AXIOS API CLIENT
 * ==========================================================
 * Automatically injects the JWT token from localStorage into
 * the Authorization header for all admin backend calls.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/admin/login') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
