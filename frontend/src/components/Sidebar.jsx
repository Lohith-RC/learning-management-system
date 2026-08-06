import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { X } from 'lucide-react';

const Sidebar = memo(() => {
  const { logout } = useAuth();
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'courses', path: '/courses', label: 'Course Catalog', icon: 'menu_book' },
    { id: 'practice', path: '/practice', label: 'Practice Sandbox', icon: 'code' },
    { id: 'resume-ai', path: '/resume-ai', altPath: '/profile', label: 'Resume AI', icon: 'description' },
    { id: 'leaderboard', path: '/leaderboard', label: 'Leaderboard', icon: 'bar_chart' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full py-6 font-sans">
      {/* Brand Header with Close Button on Mobile */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <div 
          onClick={() => handleNavigation('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src="/skillforge-logo.png" alt="SkillForge Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-display font-black text-xl text-[#1F1B2D] dark:text-slate-100 tracking-tight">
              SkillForge
            </h1>
            <p className="font-sans text-[9px] text-[#8E8A9F] dark:text-purple-400/80 font-bold tracking-widest uppercase">
              ELITE TALENT ENGINE
            </p>
          </div>
        </div>

        {/* Mobile Close Icon */}
        <button
          onClick={closeMobileMenu}
          aria-label="Close Navigation Menu"
          className="md:hidden p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#1F1B2D] dark:hover:text-slate-100 hover:bg-[#F3F4F6] dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.altPath && location.pathname === item.altPath);
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#F0EBFA] dark:bg-purple-950/60 text-[#5B4E80] dark:text-purple-300 font-bold shadow-xs'
                  : 'text-[#6B7280] dark:text-slate-400 hover:bg-[#F9FAFC] dark:hover:bg-slate-800 hover:text-[#1F1B2D] dark:hover:text-slate-100'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#5B4E80] dark:text-purple-300' : 'text-[#9CA3AF] dark:text-slate-500'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Free Access Card */}
      <div className="px-4 mt-auto space-y-3">
        <div className="p-4 rounded-2xl bg-[#F4F0FA] dark:bg-slate-800/70 border border-[#EAE5F5] dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-[#5B4E80] dark:text-purple-300 text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>100% Free & Open Access</span>
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
            Built for CS engineering placement prep.
          </p>
        </div>

        <div className="pt-2 border-t border-[#EAEAEA] dark:border-slate-800 space-y-0.5">
          <button
            onClick={() => handleNavigation('/')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-[#6B7280] dark:text-slate-400 hover:bg-[#F9FAFC] dark:hover:bg-slate-800 hover:text-[#1F1B2D] dark:hover:text-slate-100 text-xs font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Help & Documentation
          </button>
          <button
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar (Laptop & Desktop Screens >= 768px) */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-900 hidden md:flex flex-col z-40 border-r border-[#EAEAEA] dark:border-slate-800 transition-colors duration-300">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Blur */}
          <div 
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Drawer Sheet */}
          <div className="relative w-[280px] max-w-[80vw] bg-white dark:bg-slate-900 h-full shadow-2xl z-10 animate-slide-in-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
