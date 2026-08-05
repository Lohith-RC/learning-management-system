import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';

const CourseCatalog = memo(() => {
  const { courses, setSelectedCourse } = useCourse();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All Paths');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [detailModalCourse, setDetailModalCourse] = useState(null);

  const categories = ['All Paths', 'Core CS', 'Database', 'Architecture', 'Machine Learning', 'Web Dev'];

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-12">
      {/* Title Section matching Reference Image 2 */}
      <div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#1F1B2D] tracking-tight">
          Computer Science Learning Paths
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-3">
          <p className="text-sm text-[#4B5563] max-w-3xl leading-relaxed font-normal">
            Master fundamental concepts, deep-dive into complex architectures, and prepare for top-tier engineering interviews with our structured curriculum.
          </p>

          {/* Level Dropdown matching Reference Image 2 */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-1.5 text-xs text-[#1F1B2D] font-semibold focus:outline-none focus:ring-2 focus:ring-[#5B4E80] shadow-xs"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills matching Reference Image 2 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#5B4E80] text-white shadow-xs'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#EAEAEA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid matching Reference Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: 'c1',
            title: 'Data Structures & Algorithms Mastery',
            category: 'CORE CS',
            completed: 17,
            total: 24,
            progress: 72,
            accentColor: 'border-t-4 border-t-[#3B82F6]',
            badgeColor: 'bg-blue-50 text-blue-700',
            barColor: 'bg-[#3B82F6]'
          },
          {
            id: 'c2',
            title: 'Database Management Systems & SQL Scaling',
            category: 'DATABASE',
            completed: 6,
            total: 16,
            progress: 40,
            accentColor: 'border-t-4 border-t-[#10B981]',
            badgeColor: 'bg-emerald-50 text-emerald-700',
            barColor: 'bg-[#10B981]'
          },
          {
            id: 'c3',
            title: 'System Design for High Scale Applications',
            category: 'ARCHITECTURE',
            completed: 3,
            total: 20,
            progress: 15,
            accentColor: 'border-t-4 border-t-[#9333EA]',
            badgeColor: 'bg-purple-50 text-purple-700',
            barColor: 'bg-[#9333EA]'
          }
        ].map((course) => (
          <div
            key={course.id}
            className={`bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-xs flex flex-col justify-between ${course.accentColor} hover:shadow-md transition-shadow`}
          >
            <div>
              {/* Category Badge & Progress % */}
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${course.badgeColor}`}>
                  {course.category}
                </span>
                <span className="font-mono font-bold text-xs text-[#5B4E80]">
                  {course.progress}%
                </span>
              </div>

              {/* Title & Module Subtitle */}
              <h3 className="font-display font-bold text-lg text-[#1F1B2D] leading-snug mb-2">
                {course.title}
              </h3>
              <p className="text-xs text-[#6B7280] mb-6">
                {course.completed} of {course.total} Modules Completed
              </p>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden mb-6">
                <div className={`h-full ${course.barColor} rounded-full`} style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            {/* Bottom Continue Module Pill Button matching Reference Image 2 */}
            <button
              onClick={() => {
                const found = courses.find(c => c.id === course.id) || courses[0];
                setSelectedCourse(found);
                setDetailModalCourse(found);
              }}
              className="w-full py-3 rounded-2xl bg-[#F3F4F6] hover:bg-[#5B4E80] hover:text-white text-[#1F1B2D] text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              <span>Continue Module</span>
            </button>
          </div>
        ))}
      </div>

      {/* Syllabus Modal */}
      {detailModalCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl space-y-6 border border-[#E5E7EB]">
            <div className="flex justify-between items-start border-b border-[#EAEAEA] pb-4">
              <div>
                <span className="px-3 py-1 rounded-md bg-[#F0EBFA] text-[#5B4E80] text-[10px] font-bold uppercase">
                  {detailModalCourse.category}
                </span>
                <h2 className="font-display text-xl font-bold text-[#1F1B2D] mt-2">
                  {detailModalCourse.title}
                </h2>
              </div>
              <button
                onClick={() => setDetailModalCourse(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed">
              {detailModalCourse.description}
            </p>

            <div className="pt-4 border-t border-[#EAEAEA] flex justify-end gap-3">
              <button
                onClick={() => setDetailModalCourse(null)}
                className="px-5 py-2 rounded-xl bg-[#F3F4F6] text-[#1F1B2D] text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDetailModalCourse(null);
                  navigate('/practice');
                }}
                className="px-5 py-2 rounded-xl bg-[#5B4E80] text-white text-xs font-bold shadow-xs"
              >
                Practice Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CourseCatalog.displayName = 'CourseCatalog';

export default CourseCatalog;
