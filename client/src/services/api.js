import axios from 'axios';

/**
 * ==========================================================
 * AXIOS API CLIENT
 * ==========================================================
 * Centralized Axios instance configured with the backend API base URL.
 * Automatically injects the JWT token into the `Authorization` header
 * for all authenticated admin requests.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request Interceptor: Automatically attach Bearer token from localStorage if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear localStorage (except if on login page)
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
