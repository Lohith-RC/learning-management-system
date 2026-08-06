import React, { memo } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
  return (
    <div className="relative min-h-screen bg-[#F9FAFC] dark:bg-[#090D16] text-[#1F1B2D] dark:text-slate-100 transition-colors duration-300">
      <Routes>
        {/* Public Unauthenticated Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInModal />} />
        <Route path="/signup" element={<SignUpModal />} />

        {/* Protected Routes nested in ProtectedRoute & ProtectedShellLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedShellLayout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/practice" element={<PracticeSandbox />} />
            <Route path="/resume-ai" element={<ResumeAIOptimizer />} />
            <Route path="/profile" element={<ResumeAIOptimizer />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>

        {/* Catch-all redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Persistent AI Assistant Floating Widget (Bottom-Right Viewport Fixed) */}
      <AIChatbotWidget />

      {/* Global Toast Notification Container */}
      <Toast />
    </div>
  );
});

AppContent.displayName = 'AppContent';

export default AppContent;
