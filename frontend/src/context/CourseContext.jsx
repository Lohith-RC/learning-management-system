import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { COURSES_DATA, PRACTICE_PROBLEMS } from '../data/mockData';

const CourseContext = createContext();

export const CourseProvider = ({ children, showToast }) => {
  const [courses, setCourses] = useState(COURSES_DATA);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [practiceProblems, setPracticeProblems] = useState(PRACTICE_PROBLEMS);
  const [activeProblem, setActiveProblem] = useState(PRACTICE_PROBLEMS[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await fetch('/api/courses');
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
      } catch (err) {
        console.log('Backend offline or error fetching courses, using mock data.');
      }

      try {
        const practiceRes = await fetch('/api/practice');
        if (practiceRes.ok) {
          const practiceData = await practiceRes.json();
          setPracticeProblems(practiceData);
          if (practiceData.length > 0) {
            setActiveProblem(practiceData[0]);
          }
        }
      } catch (err) {
        console.log('Backend offline or error fetching practice problems, using mock data.');
      }
    };

    fetchData();
  }, []);

  const enrollCourse = useCallback(async (courseId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'In Progress', progress: Math.max(c.progress, 5) };
      }
      return c;
    }));

    try {
      await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
    } catch (err) {
      console.log('Backend offline, enrolled course updated locally.');
    }

    if (showToast) {
      showToast('Enrolled in course successfully!', 'success');
    }
  }, [showToast]);

  const updateCourseProgress = useCallback((courseId, newProgress) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const isComp = newProgress >= 100;
        return {
          ...c,
          progress: newProgress,
          status: isComp ? 'Completed' : 'In Progress'
        };
      }
      return c;
    }));
  }, []);

  const value = useMemo(() => ({
    courses,
    setCourses,
    selectedCourse,
    setSelectedCourse,
    enrollCourse,
    updateCourseProgress,
    practiceProblems,
    setPracticeProblems,
    activeProblem,
    setActiveProblem,
  }), [
    courses,
    selectedCourse,
    enrollCourse,
    updateCourseProgress,
    practiceProblems,
    activeProblem,
  ]);

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export default CourseContext;
