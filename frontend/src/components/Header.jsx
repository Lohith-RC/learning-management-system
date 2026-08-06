import React, { useState, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

const Header = memo(() => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllNotificationsRead, toggleMobileMenu, theme, toggleTheme } = useUI();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/courses');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-[#EAEAEA] dark:border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 w-full font-sans transition-colors duration-300">
      {/* Search Input */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, concepts..."
            className="w-full bg-[#F3F4F6] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-full py-2 pl-10 pr-4 text-xs text-[#1F1B2D] dark:text-slate-100 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#5B4E80] dark:focus:ring-purple-500 transition-all"
          />
        </form>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {/* Quick Launch Sandbox Button */}
        <button
          onClick={() => navigate('/practice')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5B4E80] hover:bg-[#4C4070] dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">code</span>
          <span>Open Sandbox</span>
        </button>

        {/* Theme Toggle Button (Light/Dark Mode) */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2 rounded-full text-[#4B5563] dark:text-slate-300 hover:text-[#5B4E80] dark:hover:text-purple-300 hover:bg-[#F3F4F6] dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-90"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform duration-300 hover:rotate-12">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-[#4B5563] dark:text-slate-300 hover:text-[#5B4E80] dark:hover:text-purple-300 hover:bg-[#F3F4F6] dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5B4E80] dark:bg-purple-400 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-[#EAEAEA] dark:border-slate-800 p-4 z-50 animate-fade-in-up">
              <div className="flex justify-between items-center pb-3 border-b border-[#EAEAEA] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-[#1F1B2D] dark:text-slate-100">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#F0EBFA] dark:bg-purple-950/60 text-[#5B4E80] dark:text-purple-300 text-[10px] font-bold">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-[#5B4E80] dark:text-purple-400 hover:underline font-semibold cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="divide-y divide-[#EAEAEA] dark:divide-slate-800 max-h-80 overflow-y-auto my-2">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`py-3 px-2 rounded-xl transition-colors ${
                      item.read ? 'opacity-70' : 'bg-[#F9FAFC] dark:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-xs text-[#1F1B2D] dark:text-slate-100">{item.title}</span>
                      <span className="text-[10px] text-[#9CA3AF] font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-slate-300 leading-snug">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-3 border-l border-[#EAEAEA] dark:border-slate-800 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#5B4E80] dark:bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user.avatar}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-[#1F1B2D] dark:text-slate-100 group-hover:text-[#5B4E80] dark:group-hover:text-purple-300 transition-colors">
                {user.name}
              </p>
              <p className="text-[10px] text-[#6B7280] dark:text-slate-400 font-medium">12-Day Streak 🔥</p>
            </div>
            <span className="material-symbols-outlined text-[#9CA3AF] text-[18px]">
              expand_more
            </span>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-[#EAEAEA] dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-3 border-b border-[#EAEAEA] dark:border-slate-800">
                <p className="font-bold text-xs text-[#1F1B2D] dark:text-slate-100">{user.name}</p>
                <p className="text-[11px] text-[#6B7280] dark:text-slate-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-[#4B5563] dark:text-slate-300 hover:bg-[#F9FAFC] dark:hover:bg-slate-800 flex items-center gap-2 font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                Dashboard Overview
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-[#4B5563] dark:text-slate-300 hover:bg-[#F9FAFC] dark:hover:bg-slate-800 flex items-center gap-2 font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                My ATS Resume Score
              </button>
              <div className="border-t border-[#EAEAEA] dark:border-slate-800 my-1" />
              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
