import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = memo(() => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'courses', path: '/courses', label: 'Course Catalog', icon: 'menu_book' },
    { id: 'practice', path: '/practice', label: 'Practice Sandbox', icon: 'code' },
    { id: 'resume-ai', path: '/resume-ai', altPath: '/profile', label: 'Resume AI', icon: 'description' },
    { id: 'leaderboard', path: '/leaderboard', label: 'Leaderboard', icon: 'bar_chart' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-white flex flex-col py-6 z-40 hidden md:flex border-r border-[#EAEAEA] font-sans">
      {/* Brand Header with Transparent Logo Image */}
      <div 
        onClick={() => navigate('/')}
        className="px-6 mb-8 flex items-center gap-3 cursor-pointer group"
      >
        <img src="/skillforge-logo.png" alt="SkillForge Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
        <div>
          <h1 className="font-display font-black text-xl text-[#1F1B2D] tracking-tight">
            SkillForge
          </h1>
          <p className="font-sans text-[9px] text-[#8E8A9F] font-bold tracking-widest uppercase">
            ELITE TALENT ENGINE
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.altPath && location.pathname === item.altPath);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-[#F0EBFA] text-[#5B4E80] font-bold'
                  : 'text-[#6B7280] hover:bg-[#F9FAFC] hover:text-[#1F1B2D]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#5B4E80]' : 'text-[#9CA3AF]'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Free Access Card */}
      <div className="px-4 mt-auto space-y-3">
        <div className="p-4 rounded-2xl bg-[#F4F0FA] border border-[#EAE5F5]">
          <div className="flex items-center gap-2 text-[#5B4E80] text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>100% Free & Open Access</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-relaxed">
            Built for CS engineering placement prep.
          </p>
        </div>

        <div className="pt-2 border-t border-[#EAEAEA] space-y-0.5">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-[#6B7280] hover:bg-[#F9FAFC] text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Help & Documentation
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
