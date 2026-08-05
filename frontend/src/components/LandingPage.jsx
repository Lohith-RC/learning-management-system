import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F9FAFC] text-[#1F1B2D] font-sans selection:bg-[#5B4E80] selection:text-white">
      {/* Header Nav with Official SkillForge Logo */}
      <nav className="w-full bg-white border-b border-[#EAEAEA] px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/skillforge-logo.png" 
            alt="SkillForge Logo" 
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="font-display text-xl font-black tracking-tight text-[#1F1B2D]">SkillForge</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => navigate('/signin')}
            className="text-xs font-bold uppercase tracking-wider text-[#4B5563] hover:text-[#5B4E80] transition-colors"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-xs font-bold uppercase tracking-wider text-white px-5 sm:px-6 py-2.5 rounded-full bg-[#5B4E80] hover:bg-[#4C4070] transition-all shadow-xs active:scale-95"
          >
            GET STARTED FREE
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-5xl mx-auto px-6 pt-16 sm:pt-20 pb-24 flex flex-col items-center justify-center text-center">
        
        {/* Centered Hero Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#EAE5F5] bg-[#F0EBFA]/60 text-[#5B4E80] text-xs font-bold uppercase tracking-widest mb-8 sm:mb-10 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#5B4E80]" />
          <span>100% FREE COMPUTER SCIENCE PLACEMENT ENGINE</span>
        </div>

        {/* Hero Title with Wavy Underline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#1F1B2D] leading-[1.15] tracking-tight max-w-4xl mb-6">
          Master CS Core, Practice Sandboxes <br />
          <span className="relative inline-block text-[#5B4E80]">
            & Audit ATS Resumes.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#9333EA]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 25 5, 50 15 T 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[#6B7280] text-sm sm:text-base max-w-2xl font-normal leading-relaxed mb-10">
          Structured learning modules, automated code test runners, and Groq AI resume matching — built exclusively for CS students.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#5B4E80] hover:bg-[#4C4070] text-white font-bold text-sm transition-all shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            <span>Launch Student Workspace</span>
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-[#5B4E80] text-[#5B4E80] hover:bg-[#F0EBFA] font-bold text-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Browse Courses</span>
          </button>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {[
            {
              icon: 'menu_book',
              title: 'Structured CS Paths',
              desc: 'Data Structures, OS, System Design & SQL modules.'
            },
            {
              icon: 'code',
              title: 'Live Practice Sandbox',
              desc: 'Multi-language test runner with automated assertions.'
            },
            {
              icon: 'troubleshoot',
              title: 'Groq AI ATS Audit',
              desc: 'Instant keyword matching and resume match scoring.'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
              </div>
              <h3 className="font-display font-bold text-base text-[#1F1B2D] mb-2">{card.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Component with Official Logo */}
      <footer className="w-full bg-white border-t border-[#EAEAEA] py-8 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/skillforge-logo.png" alt="SkillForge Logo" className="w-7 h-7 object-contain" />
            <span className="font-display font-bold text-sm text-[#1F1B2D]">SkillForge Placement Platform</span>
          </div>
          <p className="text-xs text-[#9CA3AF]">
            © 2026 SkillForge Education Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
