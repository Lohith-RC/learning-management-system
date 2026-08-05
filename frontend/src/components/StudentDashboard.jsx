import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { useUI } from '../context/UIContext';

const StudentDashboard = memo(() => {
  const { user } = useAuth();
  const { courses, setSelectedCourse } = useCourse();
  const { showToast } = useUI();
  const navigate = useNavigate();

  const [hoveredHeatmap, setHoveredHeatmap] = useState(null);

  // Heatmap rows data matching Reference Image 1 grid
  const daysMon = [0,1,3,4,3,4,3,2,1,2,3,4,2,3,4,2,3,1,2,1];
  const daysWed = [1,2,3,0,2,0,3,4,3,4,3,2,1,2,3,4,2,3,2,1];
  const daysFri = [0,3,4,3,4,1,3,4,3,2,1,2,1,1,0,4,1,0,0,0];

  return (
    <div className="space-y-6 animate-fade-in-up pb-12 font-sans">
      
      {/* 1. Hero Card matching Reference Image 1 */}
      <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="max-w-xl space-y-3">
            <h1 className="font-display text-3xl font-black text-[#1F1B2D] tracking-tight">
              Welcome back, <span className="text-[#5B4E80]">{user.name}!</span>
            </h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              You're on a {user.streak}-day streak. Keep the momentum going on your Data Structures track today.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => navigate('/courses')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B4E80] hover:bg-[#4C4070] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Resume Module</span>
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="px-6 py-3 rounded-xl border border-[#5B4E80] text-[#5B4E80] hover:bg-[#F0EBFA] text-xs font-bold transition-colors"
              >
                View Learning Path
              </button>
            </div>
          </div>

          {/* 3D Glass Cube Illustration matching Reference Image 1 */}
          <div className="w-48 h-28 rounded-2xl bg-gradient-to-tr from-slate-100 to-indigo-50 border border-slate-200/60 flex items-center justify-center p-3 shadow-inner">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#9333EA]/20 rounded-2xl blur-md animate-pulse" />
              <span className="material-symbols-outlined text-4xl text-[#5B4E80] relative z-10">
                view_in_ar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Heatmap & AI Skill Insight matching Reference Image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 30-Day Activity & Submissions (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-display font-bold text-lg text-[#1F1B2D]">
                  30-Day Activity & Submissions
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Consistent effort yields elite results.
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

              <div className="flex-1 space-y-1.5 overflow-x-auto pb-1">
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
        <div className="lg:col-span-4 bg-[#F4F0FA] border border-[#EAE5F5] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#5B4E80] uppercase block mb-3">
              . AI SKILL INSIGHT
            </span>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Your recent sandbox performance indicates strong proficiency in <strong className="text-[#1F1B2D]">Recursion</strong>. We recommend tackling harder DP problems next.
            </p>
          </div>

          <button
            onClick={() => {
              showToast('Generated new Dynamic Programming challenge!', 'info');
              navigate('/practice');
            }}
            className="w-full mt-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#5B4E80] text-[#5B4E80] text-xs font-bold transition-all text-center shadow-xs"
          >
            Generate Challenge
          </button>
        </div>
      </div>

      {/* 3. Bottom Row: Enrolled Learning Modules & Stats matching Reference Image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Enrolled Learning Modules (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#F3F4F6]">
            <h3 className="font-display font-bold text-base text-[#1F1B2D]">
              Enrolled Learning Modules
            </h3>
            <button
              onClick={() => navigate('/courses')}
              className="text-[11px] font-bold text-[#5B4E80] hover:underline tracking-wider uppercase"
            >
              VIEW ALL
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Advanced Data Structures', desc: 'Trees, Graphs, and Dynamic Programming', progress: 68, color: 'bg-[#5B4E80]' },
              { title: 'Database Management Systems', desc: 'SQL, NoSQL, and Query Optimization', progress: 32, color: 'bg-[#6E56CF]' },
              { title: 'Scalable System Design', desc: 'Microservices, Caching, Load Balancing', progress: 15, color: 'bg-[#9333EA]' },
            ].map((mod, i) => (
              <div key={i} className="p-4 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col justify-between gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">dataset</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1B2D]">{mod.title}</h4>
                      <p className="text-[11px] text-[#6B7280]">{mod.desc}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#5B4E80]">{mod.progress}%</span>
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
          
          {/* Two Metric Cards Side-by-Side matching Reference Image 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#EAEAEA] rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#5B4E80] text-[22px] mb-1">code_blocks</span>
              <span className="font-display font-black text-2xl text-[#1F1B2D]">142</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mt-1">PROBLEMS SOLVED</span>
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
              <span className="font-display font-black text-2xl text-[#1F1B2D] mt-2">Top 5%</span>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider mt-1">GLOBAL RANK</span>
            </div>
          </div>

          {/* Upcoming Focus Card matching Reference Image 1 */}
          <div className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-sm text-[#1F1B2D]">Upcoming Focus</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                </div>
                <div>
                  <h5 className="font-bold text-[#1F1B2D]">Weekly Coding Contest</h5>
                  <p className="text-[11px] text-[#6B7280]">Starts in 2 days (Sat, 10 AM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                </div>
                <div>
                  <h5 className="font-bold text-[#1F1B2D]">Submit DBMS Project</h5>
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
