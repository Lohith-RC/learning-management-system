import React, { memo } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import StudentDashboard from './components/StudentDashboard';
import CourseCatalog from './components/CourseCatalog';
import CourseDetailPage from './components/CourseDetailPage';
import PracticeSandbox from './components/PracticeSandbox';
import ResumeAIOptimizer from './components/ResumeAIOptimizer';
import Leaderboard from './components/Leaderboard';
import AIChatbotWidget from './components/AIChatbotWidget';
import Toast from './components/Toast';

// Page transition wrapper for smooth route animations
const PageTransition = memo(({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';

// Layout shell for protected workspace routes
const ProtectedShellLayout = memo(() => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFC] dark:bg-[#090D16] text-[#1F1B2D] dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:ml-[260px] h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Main Canvas Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F9FAFC] dark:bg-[#090D16] transition-colors duration-300">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
});

ProtectedShellLayout.displayName = 'ProtectedShellLayout';

const AppContent = memo(() => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#F9FAFC] dark:bg-[#090D16] text-[#1F1B2D] dark:text-slate-100 transition-colors duration-300">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Unauthenticated Routes */}
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/signin" element={<PageTransition><SignInModal /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUpModal /></PageTransition>} />

          {/* Protected Routes nested in ProtectedRoute & ProtectedShellLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedShellLayout />}>
              <Route path="/dashboard" element={<PageTransition><StudentDashboard /></PageTransition>} />
              <Route path="/courses" element={<PageTransition><CourseCatalog /></PageTransition>} />
              <Route path="/courses/:courseId" element={<PageTransition><CourseDetailPage /></PageTransition>} />
              <Route path="/practice" element={<PageTransition><PracticeSandbox /></PageTransition>} />
              <Route path="/resume-ai" element={<PageTransition><ResumeAIOptimizer /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><ResumeAIOptimizer /></PageTransition>} />
              <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
            </Route>
          </Route>

          {/* Catch-all redirect to Landing Page */}
          <Route path="*" element={<PageTransition><Navigate to="/" replace /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {/* Global Persistent AI Assistant Floating Widget (Bottom-Right Viewport Fixed) */}
      <AIChatbotWidget />

      {/* Global Toast Notification Container */}
      <Toast />
    </div>
  );
});

AppContent.displayName = 'AppContent';

export default AppContent;
