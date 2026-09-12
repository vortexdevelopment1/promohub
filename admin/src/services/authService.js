
import API from './api';

/**
 * ==========================================================
 * ADMIN AUTHENTICATION SERVICE
 * ==========================================================
 */
export const authService = {
  login: async (email, password) => {
    const response = await API.post('/admin/login', { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  },

  getToken: () => {
    return localStorage.getItem('adminToken');
  },

  getCurrentAdmin: () => {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  },
};

export default authService;
