import React, { useState, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Play, 
  Bookmark, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Star, 
  Users, 
  CheckCircle2, 
  X, 
  ChevronRight,
  Code2,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Eye
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const CourseCatalog = memo(() => {
  const { courses, setSelectedCourse, enrollCourse } = useCourse();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Paths');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity' | 'rating' | 'progress' | 'duration' | 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [detailModalCourse, setDetailModalCourse] = useState(null);

  const categories = ['All Paths', 'Core CS', 'Database', 'Architecture', 'Development'];
  const statuses = ['All Statuses', 'In Progress', 'Completed', 'New'];

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const getDomainColor = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('core')) {
      return {
        topBorder: 'border-t-4 border-t-[#3B82F6]',
        badge: 'bg-blue-50 text-blue-700 border border-blue-200/60',
        progressBar: 'bg-[#3B82F6]',
        lightBg: 'bg-blue-50/50'
      };
    }
    if (cat.includes('data') || cat.includes('dbms')) {
      return {
        topBorder: 'border-t-4 border-t-[#10B981]',
        badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        progressBar: 'bg-[#10B981]',
        lightBg: 'bg-emerald-50/50'
      };
    }
    if (cat.includes('arch') || cat.includes('system')) {
      return {
        topBorder: 'border-t-4 border-t-[#9333EA]',
        badge: 'bg-purple-50 text-purple-700 border border-purple-200/60',
        progressBar: 'bg-[#9333EA]',
        lightBg: 'bg-purple-50/50'
      };
    }
    return {
      topBorder: 'border-t-4 border-t-[#F59E0B]',
      badge: 'bg-amber-50 text-amber-700 border border-amber-200/60',
      progressBar: 'bg-[#F59E0B]',
      lightBg: 'bg-amber-50/50'
    };
  };

  // Filter and Sort Courses pipeline
  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.tags && course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        activeCategory === 'All Paths' ||
        course.category.toLowerCase().includes(activeCategory.toLowerCase());

      const matchesLevel =
        selectedLevel === 'All Levels' ||
        (course.difficulty && course.difficulty.toLowerCase().includes(selectedLevel.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'All Statuses' ||
        (selectedStatus === 'In Progress' && course.progress > 0 && course.progress < 100) ||
        (selectedStatus === 'Completed' && course.progress === 100) ||
        (selectedStatus === 'New' && (!course.progress || course.progress === 0));

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });

    // Apply Sorting
    return result.sort((a, b) => {
      if (sortBy === 'popularity') {
        return (b.studentsCount || 0) - (a.studentsCount || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'progress') {
        return (b.progress || 0) - (a.progress || 0);
      }
      if (sortBy === 'duration') {
        const durA = parseInt(a.duration || '0', 10);
        const durB = parseInt(b.duration || '0', 10);
        return durA - durB;
      }
      if (sortBy === 'newest') {
        return a.status === 'New' ? -1 : 1;
      }
      return 0;
    });
  }, [courses, searchQuery, activeCategory, selectedLevel, selectedStatus, sortBy]);

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-16">
      {/* 
        ========================================================================
        1. HERO SPOTLIGHT BANNER
        ========================================================================
      */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1F1B2D] via-[#28213B] to-[#5B4E80] p-6 md:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-semibold border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Computer Science Career Pathways</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Master Technical Architecture & CS Fundamentals
          </h1>

          <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed font-normal max-w-2xl">
            Deep-dive into production data structures, relational database internals, and high-scale system design built for tier-1 engineering interviews.
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-purple-200/90">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-purple-300" />
              <span>{courses.length} Active Courses</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>120,000+ Enrolled Learners</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        2. CONTROL TOOLBAR: SEARCH, FILTERS, SORT & VIEW SWITCHER
        ========================================================================
      */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-xs">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, professors, topics (e.g. Raft, System Design, SQL)..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#F9FAFC] border border-[#E5E7EB] rounded-xl text-xs text-[#1F1B2D] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#5B4E80] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1F1B2D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters & Layout View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Level Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#F9FAFC] border border-[#E5E7EB] rounded-xl px-3 py-2">
            <Filter className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-xs text-[#6B7280] font-medium">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent text-xs text-[#1F1B2D] font-bold focus:outline-none cursor-pointer"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#F9FAFC] border border-[#E5E7EB] rounded-xl px-3 py-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-xs text-[#6B7280] font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-[#1F1B2D] font-bold focus:outline-none cursor-pointer"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="progress">Progress High to Low</option>
              <option value="duration">Duration (Shortest)</option>
              <option value="newest">Newly Added</option>
            </select>
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Switch to Grid View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-xs text-[#1F1B2D]'
                  : 'text-[#6B7280] hover:text-[#1F1B2D]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              aria-label="Switch to List View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-xs text-[#1F1B2D]'
                  : 'text-[#6B7280] hover:text-[#1F1B2D]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        3. CATEGORY & STATUS FILTER PILLS
        ========================================================================
      */}
      <div className="space-y-3">
        {/* Domain Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count =
              cat === 'All Paths'
                ? courses.length
                : courses.filter((c) => c.category.toLowerCase().includes(cat.toLowerCase())).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#5B4E80] text-white shadow-md'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#D0C5E8] hover:bg-[#F9FAFC]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-mono text-[#9CA3AF] mr-1">Status:</span>
          {statuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F1B2D] text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                {st}
              </button>
            );
          })}
          <span className="ml-auto text-[11px] font-mono text-[#5B4E80] font-bold">
            Showing {filteredCourses.length} Courses
          </span>
        </div>
      </div>

      {/* 
        ========================================================================
        4. COURSE CARDS GRID / DENSE LIST
        ========================================================================
      */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F0EBFA] text-[#5B4E80] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-[#1F1B2D]">No matching courses found</h3>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            Try adjusting your search keywords, category pills, or level filters to explore available learning paths.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All Paths');
              setSelectedLevel('All Levels');
              setSelectedStatus('All Statuses');
              setSortBy('popularity');
            }}
            className="px-4 py-2 rounded-xl bg-[#5B4E80] text-white text-xs font-bold shadow-xs hover:bg-[#4C4070] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const styles = getDomainColor(course.category);
            const isBookmarked = bookmarkedIds.includes(course.id);
            const completed = course.completedModules || course.completed || 0;
            const total = course.modulesCount || course.total || 20;

            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  navigate(`/courses/${course.id}`);
                }}
                className={`group relative bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer ${styles.topBorder}`}
              >
                <div>
                  {/* Category Badge & Bookmark Button */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${styles.badge}`}>
                      {course.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(course.id, e)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
                      aria-label="Bookmark Course"
                      className="text-[#9CA3AF] hover:text-[#5B4E80] transition-colors p-1 cursor-pointer"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#5B4E80] text-[#5B4E80]' : ''}`} />
                    </button>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-display font-bold text-base md:text-lg text-[#1F1B2D] leading-snug group-hover:text-[#5B4E80] transition-colors mb-1.5">
                    {course.title}
                  </h3>

                  {/* Instructor Badge */}
                  <p className="text-[11px] text-[#5B4E80] font-mono font-medium flex items-center gap-1 mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-[#6E56CF]" />
                    <span>{course.instructor || 'Dr. Aris Thorne'}</span>
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-[#6B7280] mb-4 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Tech Tags */}
                  {course.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {course.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] text-[10px] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Course Footer & Progress */}
                <div className="pt-4 border-t border-[#F3F4F6] space-y-4">
                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>{course.duration || '30 Hours'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-[#5B4E80]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating || 4.9}</span>
                      <span className="text-[10px] text-[#9CA3AF] font-normal">({((course.studentsCount || 5000) / 1000).toFixed(1)}k)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-[#6B7280] font-mono mb-1.5">
                      <span>{completed} of {total} Modules</span>
                      <span className="font-bold text-[#5B4E80]">{course.progress || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.progressBar} rounded-full transition-all duration-500`}
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                        setDetailModalCourse(course);
                      }}
                      className="p-2.5 rounded-xl bg-[#F3F4F6] hover:bg-[#EAEAEA] text-[#4B5563] hover:text-[#1F1B2D] text-xs font-bold transition-all cursor-pointer"
                      title="Quick Peek Syllabus"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                        enrollCourse(course.id);
                        navigate(`/courses/${course.id}`);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#F3F4F6] group-hover:bg-[#5B4E80] group-hover:text-white text-[#1F1B2D] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{course.progress > 0 ? 'Continue Path' : 'Start Course'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DENSE LIST VIEW */
        <div className="space-y-3">
          {filteredCourses.map((course) => {
            const styles = getDomainColor(course.category);
            const isBookmarked = bookmarkedIds.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  navigate(`/courses/${course.id}`);
                }}
                className={`bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer ${styles.topBorder}`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${styles.badge}`}>
                      {course.category}
                    </span>
                    <span className="text-xs text-[#5B4E80] font-mono">• {course.instructor || 'Dr. Aris Thorne'}</span>
                    <span className="text-xs text-[#9CA3AF] font-mono">• {course.duration || '30 Hours'}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1F1B2D] hover:text-[#5B4E80] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-1">{course.description}</p>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <div className="w-32 hidden sm:block space-y-1">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-[#5B4E80]">
                      <span>Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.progressBar} rounded-full`}
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(course.id, e)}
                    className="text-[#9CA3AF] hover:text-[#5B4E80] p-1 cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#5B4E80] text-[#5B4E80]' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                      setDetailModalCourse(course);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#F3F4F6] hover:bg-[#EAEAEA] text-[#1F1B2D] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Peek
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                      navigate(`/courses/${course.id}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#5B4E80] hover:bg-[#4C4070] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Open Path</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 
        ========================================================================
        5. QUICK SYLLABUS PEEK MODAL
        ========================================================================
      */}
      {detailModalCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 border border-[#E5E7EB] animate-pop-in-br max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#EAEAEA] pb-4 shrink-0">
              <div>
                <span className="px-3 py-1 rounded-md bg-[#F0EBFA] text-[#5B4E80] text-[10px] font-extrabold uppercase">
                  {detailModalCourse.category}
                </span>
                <h2 className="font-display text-xl font-bold text-[#1F1B2D] mt-2">
                  {detailModalCourse.title}
                </h2>
                <p className="text-xs text-[#5B4E80] mt-1 font-mono flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-[#6E56CF]" />
                  <span>Instructor: {detailModalCourse.instructor || 'SkillForge Engineering Team'}</span>
                </p>
              </div>
              <button
                onClick={() => setDetailModalCourse(null)}
                aria-label="Close Syllabus Modal"
                className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#1F1B2D] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
              <div>
                <h4 className="font-bold text-[#1F1B2D] mb-1">About this Learning Path</h4>
                <p className="text-[#6B7280] leading-relaxed">
                  {detailModalCourse.description}
                </p>
              </div>

              {/* Curriculum Module Breakdown */}
              <div>
                <h4 className="font-bold text-[#1F1B2D] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#5B4E80]" />
                  <span>Curriculum Breakdown ({detailModalCourse.modules?.length || 3} Modules)</span>
                </h4>

                <div className="space-y-2">
                  {(detailModalCourse.modules || [
                    { id: 1, title: 'Fundamentals & Core Concepts', duration: '2h 30m', completed: false },
                    { id: 2, title: 'Advanced Algorithms & System Design', duration: '3h 15m', completed: false },
                    { id: 3, title: 'Capstone Implementation & Sandbox Test', duration: '4h 00m', completed: false },
                  ]).map((mod) => (
                    <div
                      key={mod.id}
                      className="p-3 rounded-2xl border bg-[#F9FAFC] border-[#E5E7EB] text-[#4B5563] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                        <span className="font-semibold text-xs">{mod.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#6B7280]">{mod.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#EAEAEA] flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setDetailModalCourse(null)}
                className="px-5 py-2.5 rounded-xl bg-[#F3F4F6] text-[#1F1B2D] text-xs font-bold hover:bg-[#EAEAEA] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const targetId = detailModalCourse.id;
                  setDetailModalCourse(null);
                  navigate(`/courses/${targetId}`);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Dedicated Course Page</span>
                <ChevronRight className="w-4 h-4" />
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
