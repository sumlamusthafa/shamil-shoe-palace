import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setAdmin(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const loginAdmin = (token, user) => {
    localStorage.setItem('token', token);
    setAdmin(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
