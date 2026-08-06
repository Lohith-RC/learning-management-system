import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, BookOpen, Code2, CheckCircle2, ShieldCheck, ArrowRight, Star } from 'lucide-react';

const LandingPage = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F9FAFC] text-[#1F1B2D] font-sans selection:bg-[#5B4E80] selection:text-white">
      {/* Header Nav with Official SkillForge Logo */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-[#EAEAEA] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img 
            src="/skillforge-logo.png" 
            alt="SkillForge Logo" 
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" 
          />
          <div>
            <span className="font-display text-lg sm:text-xl font-black tracking-tight text-[#1F1B2D]">SkillForge</span>
            <span className="hidden sm:block text-[8px] font-mono font-bold text-[#5B4E80] uppercase tracking-widest">Placement Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <motion.button
            onClick={() => navigate('/signin')}
            className="text-xs font-bold uppercase tracking-wider text-[#4B5563] hover:text-[#5B4E80] px-3 py-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            SIGN IN
          </motion.button>
          <motion.button
            onClick={() => navigate('/signup')}
            className="text-xs font-bold uppercase tracking-wider text-white px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] hover:from-[#4C4070] hover:to-[#5B4E80] shadow-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            GET STARTED
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-20 flex flex-col items-center justify-center text-center">
        
        {/* Ambient Glow Orbs for Mobile Depth */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Centered Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EAE5F5] bg-[#F0EBFA]/80 backdrop-blur-md text-[#5B4E80] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-6 sm:mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>100% FREE COMPUTER SCIENCE PLACEMENT ENGINE</span>
        </div>

        {/* Hero Title with Wavy Underline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-[#1F1B2D] leading-[1.18] tracking-tight max-w-4xl mb-6">
          Master CS Core, Practice Sandboxes <br className="hidden sm:block" />
          <span className="relative inline-block text-[#5B4E80]">
            & Audit ATS Resumes.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#9333EA]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 25 5, 50 15 T 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[#6B7280] text-xs sm:text-base max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10 px-2">
          Structured learning paths, multi-language code test runners, and Groq AI resume matching — engineered specifically for CS undergraduates targeting tier-1 software roles.
        </p>

        {/* Hero Action Buttons - Full Width on Mobile */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-12 sm:mb-16">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] hover:from-[#4C4070] hover:to-[#5B4E80] text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 24px -8px rgba(91, 78, 128, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Rocket className="w-4 h-4" />
            <span>Launch Student Workspace</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.button>

          <motion.button
            onClick={() => navigate('/courses')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl sm:rounded-full border border-[#5B4E80] text-[#5B4E80] hover:bg-[#F0EBFA] font-bold text-xs sm:text-sm bg-white cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px -6px rgba(91, 78, 128, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BookOpen className="w-4 h-4 text-[#5B4E80]" />
            <span>Explore 20+ Courses</span>
          </motion.button>
        </div>

        {/* Mobile Quick Stats Banner */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs mb-12 text-center">
          <div className="space-y-0.5">
            <span className="font-display font-black text-lg sm:text-2xl text-[#1F1B2D]">20+</span>
            <p className="text-[10px] sm:text-xs text-[#6B7280] font-mono">CS Courses</p>
          </div>
          <div className="space-y-0.5 border-x border-[#F3F4F6]">
            <span className="font-display font-black text-lg sm:text-2xl text-[#5B4E80]">120k+</span>
            <p className="text-[10px] sm:text-xs text-[#6B7280] font-mono">Learners</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-display font-black text-lg sm:text-2xl text-emerald-600">98%</span>
            <p className="text-[10px] sm:text-xs text-[#6B7280] font-mono">Pass Rate</p>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full text-left">
          {[
            {
              icon: <BookOpen className="w-6 h-6 text-[#5B4E80]" />,
              title: 'Structured CS Pathways',
              desc: 'Data Structures, Relational DBMS Internals, OS Concurrency & High-Scale System Design.'
            },
            {
              icon: <Code2 className="w-6 h-6 text-[#5B4E80]" />,
              title: 'Interactive Practice Sandbox',
              desc: 'Multi-language code execution runner with automated test case assertions in Python, JS & C++.'
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#5B4E80]" />,
              title: 'Groq AI ATS Resume Audit',
              desc: 'Instant match scoring, skill gap diagnostics, and targeted keyword placement optimization.'
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs group"
              whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(91, 78, 128, 0.25)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl bg-[#F0EBFA] flex items-center justify-center mb-5"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {card.icon}
              </motion.div>
              <h3 className="font-display font-bold text-base text-[#1F1B2D] mb-2">{card.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Component with Official Logo */}
      <footer className="w-full bg-white border-t border-[#EAEAEA] py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/skillforge-logo.png" alt="SkillForge Logo" className="w-7 h-7 object-contain" />
            <span className="font-display font-bold text-xs sm:text-sm text-[#1F1B2D]">SkillForge Learning Platform</span>
          </div>
          <p className="text-[11px] text-[#9CA3AF] font-mono">
            © 2026 SkillForge Education Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
