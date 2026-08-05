import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children, onLoginSuccess, onLogoutSuccess }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch('/api/user');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      } catch (err) {
        console.log('Backend offline or error fetching user, using mock data.');
      }
    };
    fetchUser();
  }, []);

  const login = useCallback((email, password) => {
    setIsAuthenticated(true);
    setUser({
      ...INITIAL_USER,
      email: email || INITIAL_USER.email,
    });
    if (onLoginSuccess) {
      onLoginSuccess(INITIAL_USER.name);
    }
  }, [onLoginSuccess]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
  }, [onLogoutSuccess]);

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  }), [user, isAuthenticated, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
