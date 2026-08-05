import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { useUI } from '../context/UIContext';
import { 
  Sparkles, 
  Flame, 
  Play, 
  BookOpen, 
  Code2, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Layers
} from 'lucide-react';

const StudentDashboard = memo(() => {
  const { user } = useAuth();
  const { courses, setSelectedCourse } = useCourse();
  const { showToast } = useUI();
  const navigate = useNavigate();

  // Heatmap rows data matching Reference Image 1 grid
  const daysMon = [0,1,3,4,3,4,3,2,1,2,3,4,2,3,4,2,3,1,2,1];
  const daysWed = [1,2,3,0,2,0,3,4,3,4,3,2,1,2,3,4,2,3,2,1];
  const daysFri = [0,3,4,3,4,1,3,4,3,2,1,2,1,1,0,4,1,0,0,0];

  return (
    <div className="space-y-6 animate-fade-in-up pb-12 font-sans">
      
      {/* 
        ========================================================================
        1. HERO SPOTLIGHT WELCOME CARD (MOBILE & DESKTOP ENHANCED)
        ========================================================================
      */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1F1B2D] via-[#28213B] to-[#5B4E80] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-semibold border border-white/15 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              <span>{user.streak || 12}-Day Active Streak 🔥</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Welcome back, <span className="text-purple-200">{user.name}!</span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed font-normal">
              You're making great progress. Continue your Data Structures & System Design path today.
            </p>

            {/* Responsive Touch Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <button
                onClick={() => navigate('/courses')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6E56CF] to-[#5B4E80] hover:from-[#5B4E80] hover:to-[#4C4070] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Learning Path</span>
              </button>
              <button
                onClick={() => navigate('/practice')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>Open Practice Sandbox</span>
              </button>
            </div>
          </div>

          {/* Glass Trophy Illustration */}
          <div className="w-full md:w-44 h-24 sm:h-28 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-3 backdrop-blur-md shrink-0 shadow-inner">
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-1">
                <Trophy className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-mono text-[10px] text-purple-200 font-bold uppercase tracking-wider">Top 5% Rank</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        2. MIDDLE ROW: HEATMAP & AI SKILL INSIGHT
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 30-Day Activity & Submissions (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-[#EAEAEA] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1F1B2D]">
                  30-Day Activity & Submissions
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Consistent daily coding builds placement velocity.
                </p>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#6B7280]">
                <span>LESS</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#EAE5F5]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#C4B5FD]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#9333EA]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#6B5B95]" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4C1D95]" />
                <span>MORE</span>
              </div>
            </div>

            {/* Grid with Mon, Wed, Fri Labels */}
            <div className="mt-4 flex gap-3 items-center">
              <div className="flex flex-col justify-between h-14 text-[10px] font-semibold text-[#9CA3AF]">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex-1 space-y-1.5 overflow-x-auto pb-1 scrollbar-none">
                <div className="flex gap-1.5">
                  {daysMon.map((lvl, idx) => (
                    <div key={idx} className={`heatmap-cell heatmap-${lvl}`} title={`Mon Activity: Level ${lvl}`} />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {daysWed.map((lvl, idx) => (
                    <div key={idx} className={`heatmap-cell heatmap-${lvl}`} title={`Wed Activity: Level ${lvl}`} />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {daysFri.map((lvl, idx) => (
                    <div key={idx} className={`heatmap-cell heatmap-${lvl}`} title={`Fri Activity: Level ${lvl}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI SKILL INSIGHT Card (Col 4) */}
        <div className="lg:col-span-4 bg-[#F4F0FA] border border-[#EAE5F5] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-[#5B4E80]" />
              <span className="text-[10px] font-bold tracking-widest text-[#5B4E80] uppercase">
                AI SKILL INSIGHT
              </span>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Your recent sandbox telemetry indicates high efficiency in <strong className="text-[#1F1B2D]">Recursion & Trees</strong>. We recommend taking on Dynamic Programming challenge sets next.
            </p>
          </div>

          <button
            onClick={() => {
              showToast('Generated new Dynamic Programming sandbox challenge!', 'info');
              navigate('/practice');
            }}
            className="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#5B4E80] text-[#5B4E80] text-xs font-bold transition-all text-center shadow-xs cursor-pointer active:scale-95"
          >
            Generate Challenge
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        3. BOTTOM ROW: ENROLLED LEARNING MODULES & STATS
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Enrolled Learning Modules (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-[#EAEAEA] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#F3F4F6]">
            <h3 className="font-display font-bold text-base text-[#1F1B2D]">
              Enrolled Learning Paths
            </h3>
            <button
              onClick={() => navigate('/courses')}
              className="text-[11px] font-bold text-[#5B4E80] hover:underline tracking-wider uppercase cursor-pointer"
            >
              VIEW ALL
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 'dsa-mastery', title: 'Data Structures & Algorithms Mastery', desc: 'Trees, Graphs, and Dynamic Programming', progress: 72, color: 'bg-[#3B82F6]' },
              { id: 'dbms-internals', title: 'Database Management Systems & SQL Scaling', desc: 'SQL, Indexing, and Query Optimization', progress: 40, color: 'bg-[#10B981]' },
              { id: 'system-design', title: 'System Design for High Scale Applications', desc: 'Microservices, Caching, Load Balancing', progress: 15, color: 'bg-[#9333EA]' },
            ].map((mod, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/courses/${mod.id}`)}
                className="p-4 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#5B4E80] hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center font-bold shrink-0">
                      <Layers className="w-4 h-4 text-[#5B4E80]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1B2D] hover:text-[#5B4E80] transition-colors">{mod.title}</h4>
                      <p className="text-[11px] text-[#6B7280]">{mod.desc}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#5B4E80] shrink-0 ml-2">{mod.progress}%</span>
                </div>

                <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className={`h-full ${mod.color} rounded-full`} style={{ width: `${mod.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Metric Cards & Upcoming Focus (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Two Metric Cards Side-by-Side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white border border-[#EAEAEA] rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
              <Code2 className="w-5 h-5 text-[#5B4E80] mb-1" />
              <span className="font-display font-black text-xl sm:text-2xl text-[#1F1B2D]">142</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mt-1">PROBLEMS SOLVED</span>
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500 mb-1" />
              <span className="font-display font-black text-xl sm:text-2xl text-[#1F1B2D]">Top 5%</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mt-1 font-mono">GLOBAL RANK</span>
            </div>
          </div>

          {/* Upcoming Focus Card */}
          <div className="bg-white border border-[#EAEAEA] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-sm text-[#1F1B2D]">Upcoming Focus</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mt-0.5 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1F1B2D]">Weekly Coding Contest</h5>
                  <p className="text-[11px] text-[#6B7280]">Starts in 2 days (Sat, 10 AM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5B4E80]" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1F1B2D]">Submit DBMS Capstone</h5>
                  <p className="text-[11px] text-[#6B7280]">Due Next Wednesday</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
});

StudentDashboard.displayName = 'StudentDashboard';

export default StudentDashboard;
