import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, COURSES_DATA, PRACTICE_PROBLEMS, NOTIFICATIONS_DATA } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('landing'); // landing, dashboard, courses, practice, resume-ai, leaderboard, signin, signup
  const [courses, setCourses] = useState(COURSES_DATA);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [practiceProblems, setPracticeProblems] = useState(PRACTICE_PROBLEMS);
  const [activeProblem, setActiveProblem] = useState(PRACTICE_PROBLEMS[0]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [unreadCount, setUnreadCount] = useState(2);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/user');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      } catch (err) {
        console.log('Backend offline or error fetching user, using mock data.');
      }

      try {
        const coursesRes = await fetch('/api/courses');
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
      } catch (err) {
        console.log('Backend offline or error fetching courses, using mock data.');
      }

      try {
        const practiceRes = await fetch('/api/practice');
        if (practiceRes.ok) {
          const practiceData = await practiceRes.json();
          setPracticeProblems(practiceData);
          if (practiceData.length > 0) {
            setActiveProblem(practiceData[0]);
          }
        }
      } catch (err) {
        console.log('Backend offline or error fetching practice problems, using mock data.');
      }

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

    fetchData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const authData = result.data;
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          setIsAuthenticated(true);
          setUser({
            id: authData.userId || INITIAL_USER.id,
            email: authData.email,
            name: authData.fullName || INITIAL_USER.name,
            role: authData.role,
            title: authData.role === 'ROLE_ADMIN' ? 'Administrator' : 'Student Developer',
          });
          setActiveTab('dashboard');
          showToast(`Welcome back, ${authData.fullName || 'User'}!`, 'success');
          return;
        }
      }
      
      const errResult = await response.json().catch(() => ({}));
      showToast(errResult.message || 'Invalid email or password', 'error');
    } catch (err) {
      console.warn('Real auth service offline, falling back to mock authentication:', err);
      // Fallback to mock auth
      setIsAuthenticated(true);
      setUser({
        ...INITIAL_USER,
        email: email || INITIAL_USER.email,
      });
      setActiveTab('dashboard');
      showToast(`Welcome back, ${INITIAL_USER.name} (Mock Mode)!`, 'success');
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const authData = result.data;
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          setIsAuthenticated(true);
          setUser({
            id: authData.userId || INITIAL_USER.id,
            email: authData.email,
            name: authData.fullName,
            role: authData.role,
            title: 'Student Developer',
          });
          setActiveTab('dashboard');
          showToast(`Account created successfully! Welcome, ${authData.fullName}!`, 'success');
          return;
        }
      }
      
      const errResult = await response.json().catch(() => ({}));
      showToast(errResult.message || 'Failed to create account', 'error');
    } catch (err) {
      console.warn('Real auth service offline, falling back to mock registration:', err);
      // Fallback to mock auth
      setIsAuthenticated(true);
      setUser({
        ...INITIAL_USER,
        name: fullName || INITIAL_USER.name,
        email: email || INITIAL_USER.email,
      });
      setActiveTab('dashboard');
      showToast(`Account created successfully (Mock Mode)!`, 'success');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setActiveTab('landing');
    showToast('Logged out successfully', 'info');
  };

  const enrollCourse = async (courseId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'In Progress', progress: Math.max(c.progress, 5) };
      }
      return c;
    }));

    try {
      await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
    } catch (err) {
      console.log('Backend offline, enrolled course updated locally.');
    }

    showToast('Enrolled in course successfully!', 'success');
  };

  const updateCourseProgress = (courseId, newProgress) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const isComp = newProgress >= 100;
        return {
          ...c,
          progress: newProgress,
          status: isComp ? 'Completed' : 'In Progress'
        };
      }
      return c;
    }));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      activeTab,
      setActiveTab,
      courses,
      selectedCourse,
      setSelectedCourse,
      enrollCourse,
      updateCourseProgress,
      practiceProblems,
      activeProblem,
      setActiveProblem,
      notifications,
      unreadCount,
      markAllNotificationsRead,
      login,
      signup,
      logout,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
