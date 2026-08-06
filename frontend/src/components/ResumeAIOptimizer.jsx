import React, { useState, memo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Counting animation component
const CountUp = memo(({ value, duration = 1.5 }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [motionValue, value, duration]);

  return <motion.span>{rounded}</motion.span>;
});

CountUp.displayName = 'CountUp';

const ResumeAIOptimizer = memo(() => {
  const { user } = useAuth();
  const { showToast } = useUI();
  const [targetRole, setTargetRole] = useState('Full Stack Engineer (SDE-1)');
  const [resumeText, setResumeText] = useState(
    `Lohith R C | Computer Science Engineer | lohith.rc@skillforge.edu
SUMMARY: Enthusiastic Software Engineer with experience in React.js, Node.js, SQL databases, and algorithm optimization. Built scalable web applications and solved 80+ DSA challenges.

EXPERIENCE / PROJECTS:
- SkillForge Placement Platform: Developed React 19 frontend with glassmorphism design system & WebGL background shaders.
- Distributed Database Engine: Implemented B-Tree indexing and LRU cache eviction mechanism in Python.
- System Design Practice: Designed high-throughput microservices using Express & MongoDB.

SKILLS: JavaScript, TypeScript, Python, React.js, Node.js, SQL, Data Structures, Git.`
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState(88);
  const [optimized, setOptimized] = useState(false);

  const handleAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAtsScore(optimized ? 96 : 88);
      showToast('AI Chat ATS Audit completed!', 'success');
    }, 1200);
  };

  const handleApplyOptimizations = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setOptimized(true);
      setAtsScore(96);
      setResumeText(prev => prev + `\n- Microservices & Load Balancing: Configured NGINX reverse proxy & Docker containerization achieving 99.9% uptime.`);
      showToast('Applied AI Chat enhancements! ATS Score boosted to 96/100 🔥', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5B4E80] text-[24px]">description</span>
            <h1 className="font-display text-2xl md:text-3xl font-black text-[#1F1B2D]">
              AI Chat ATS Resume Auditor & Match Engine
            </h1>
          </div>
          <p className="text-sm text-[#6B7280] mt-1 font-normal">
            Analyze experience statements against target CS job roles to uncover keyword gaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#4B5563]">Target Role Track:</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="p-2.5 rounded-2xl border border-[#E5E7EB] text-xs font-bold text-[#1F1B2D] bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5B4E80]"
          >
            <option>Full Stack Engineer (SDE-1)</option>
            <option>Backend Systems Architect</option>
            <option>Frontend Specialist (React/Next)</option>
            <option>Data / ML Engineer</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Column (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-bold text-base text-[#1F1B2D]">
                Resume Content & Experience Statements
              </h3>
              <span className="text-[10px] text-[#9CA3AF] font-mono">Plain Text / Markdown</span>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={13}
              className="w-full p-4 rounded-2xl bg-[#F9FAFC] border border-[#E5E7EB] text-xs font-mono text-[#1F1B2D] focus:outline-none focus:ring-2 focus:ring-[#5B4E80] leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#6B7280] font-medium">
              Word Count: <strong className="text-[#1F1B2D] font-mono">{resumeText.split(/\s+/).filter(Boolean).length}</strong> Words
            </span>
            <motion.button
              onClick={handleAudit}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5B4E80] hover:bg-[#4C4070] text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
              whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAnalyzing ? 'sync' : 'psychology'}
              </span>
              <span>{isAnalyzing ? 'Analyzing with AI Chat...' : 'Run ATS Audit'}</span>
            </motion.button>
          </div>
        </div>

        {/* Right Audit Results Column (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Gauge Card */}
          <div className="bg-white rounded-3xl p-7 border border-[#E5E7EB] shadow-xs flex items-center justify-between relative overflow-hidden">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B4E80]">
                Target Role ATS Match Score
              </span>
              <h3 className="font-display text-xl font-extrabold text-[#1F1B2D] mt-1">
                {targetRole}
              </h3>
              <p className="text-xs text-emerald-600 font-bold mt-2">
                {atsScore >= 90 ? '✅ Exceptional Tier-1 Match' : '⚠️ Minor Keyword Gaps Found'}
              </p>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke={atsScore >= 90 ? "#10B981" : "#5B4E80"}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 38}
                  strokeDashoffset={2 * Math.PI * 38 * (1 - atsScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-display font-black text-2xl text-[#1F1B2D]">
                  <CountUp value={atsScore} duration={1.2} />
                </span>
                <span className="text-[9px] font-mono font-bold text-[#9CA3AF]">/ 100</span>
              </div>
            </div>
          </div>

          {/* AI Keyword Match Card */}
          <div className="bg-white rounded-3xl p-7 border border-[#E5E7EB] shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-3">
              <h4 className="font-display font-bold text-sm text-[#1F1B2D]">
                AI Chat Keyword Analysis
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F0EBFA] text-[#5B4E80] text-[10px] font-bold">
                ATS Filters
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#4B5563] block mb-2">
                  ✅ Matched Role Keywords (8)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Node.js', 'SQL', 'Data Structures', 'Python', 'B-Tree', 'LRU Cache', 'JavaScript'].map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#4B5563] block mb-2">
                  ⚡ High-Impact Keywords to Add (2)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Docker Containerization', 'Load Balancing / NGINX'].map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 animate-pulse">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleApplyOptimizations}
              disabled={isAnalyzing || optimized}
              className="w-full py-3.5 rounded-2xl bg-[#5B4E80] hover:bg-[#4C4070] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              whileHover={{ scale: (isAnalyzing || optimized) ? 1 : 1.02 }}
              whileTap={{ scale: (isAnalyzing || optimized) ? 1 : 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              <span>{optimized ? 'Enhancements Applied (Score: 96/100)' : 'Auto-Inject Missing Keywords'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
});

ResumeAIOptimizer.displayName = 'ResumeAIOptimizer';

export default ResumeAIOptimizer;
