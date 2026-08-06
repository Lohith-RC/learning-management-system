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

  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const authData = result.data;
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          setUser({
            email: authData.email,
            name: authData.fullName || INITIAL_USER.name,
            role: authData.role,
          });
          setIsAuthenticated(true);
          if (onLoginSuccess) onLoginSuccess(authData.fullName || INITIAL_USER.name);
          return;
        }
      }
    } catch (err) {
      console.log('Backend authentication offline, using fallback mock login.', err);
    }

    // Graceful Fallback
    setIsAuthenticated(true);
    setUser({
      ...INITIAL_USER,
      email: email || INITIAL_USER.email,
    });
    if (onLoginSuccess) {
      onLoginSuccess(INITIAL_USER.name);
    }
  }, [onLoginSuccess]);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, password })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const authData = result.data;
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          setUser({
            email: authData.email,
            name: authData.fullName,
            role: authData.role,
          });
          setIsAuthenticated(true);
          if (onLoginSuccess) onLoginSuccess(authData.fullName);
          return;
        }
      }
    } catch (err) {
      console.log('Backend registration offline, using fallback mock register.', err);
    }

    setIsAuthenticated(true);
    setUser({
      ...INITIAL_USER,
      name: name || INITIAL_USER.name,
      email: email || INITIAL_USER.email,
    });
    if (onLoginSuccess) {
      onLoginSuccess(name || INITIAL_USER.name);
    }
  }, [onLoginSuccess]);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('skillforge_token');
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
    register,
    logout,
  }), [user, isAuthenticated, login, register, logout]);

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
