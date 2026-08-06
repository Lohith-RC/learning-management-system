import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { CourseProvider, useCourse } from './CourseContext';
import { UIProvider, useUI } from './UIContext';

export { AuthProvider, useAuth } from './AuthContext';
export { CourseProvider, useCourse } from './CourseContext';
export { UIProvider, useUI } from './UIContext';

const AppProviderInner = ({ children }) => {
  const { showToast } = useUI();
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback((name) => {
    navigate('/dashboard');
    showToast(`Welcome back, ${name}!`, 'success');
  }, [navigate, showToast]);

  const handleLogoutSuccess = useCallback(() => {
    navigate('/');
    showToast('Logged out successfully', 'info');
  }, [navigate, showToast]);

  return (
    <AuthProvider onLoginSuccess={handleLoginSuccess} onLogoutSuccess={handleLogoutSuccess}>
      <CourseProvider showToast={showToast}>
        {children}
      </CourseProvider>
    </AuthProvider>
  );
};

export const AppProvider = ({ children }) => {
  return (
    <UIProvider>
      <AppProviderInner>
        {children}
      </AppProviderInner>
    </UIProvider>
  );
};

export const useApp = () => {
  const auth = useAuth();
  const course = useCourse();
  const ui = useUI();

  return {
    ...auth,
    ...course,
    ...ui,
  };
};

export default AppProvider;
