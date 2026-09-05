import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => authService.getToken());
  const [admin, setAdmin] = useState(() => authService.getCurrentAdmin());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = authService.getToken();
    const storedAdmin = authService.getCurrentAdmin();

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(storedAdmin);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data.success && data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      setToken(data.token);
      setAdmin(data.admin);
      return data;
    }
    throw new Error(data.message || 'Login failed.');
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setAdmin(null);
  };

  const value = {
    token,
    admin,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
