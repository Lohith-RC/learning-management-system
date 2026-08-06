import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { NOTIFICATIONS_DATA } from '../data/mockData';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing');
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [unreadCount, setUnreadCount] = useState(2);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsRes = await fetch('/api/notifications');
        if (notificationsRes.ok) {
          const notificationsData = await notificationsRes.json();
          setNotifications(notificationsData);
          setUnreadCount(notificationsData.filter(n => !n.read).length);
        }
      } catch (err) {
        console.log('Backend offline or error fetching notifications, using mock data.');
      }
    };
    fetchNotifications();
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const value = useMemo(() => ({
    activeTab,
    setActiveTab,
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount,
    markAllNotificationsRead,
    toast,
    setToast,
    showToast,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  }), [
    activeTab,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    toast,
    showToast,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  ]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
