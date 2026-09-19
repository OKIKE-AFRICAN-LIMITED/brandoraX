import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AcademyPage } from './pages/AcademyPage';
import { TrackDetailPage } from './pages/TrackDetailPage';
import { TalentPipelinePage } from './pages/TalentPipelinePage';
import { CommunityPage } from './pages/CommunityPage';
import { AboutPage } from './pages/AboutPage';
import { ApplyPage } from './pages/ApplyPage';
import { DashboardPage } from './pages/DashboardPage';

import { TrackMatcherModal } from './components/TrackMatcherModal';
import { StudentProfile } from './types';

export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('brandorax_student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleEnrollSuccess = (newStudent: StudentProfile) => {
    setStudent(newStudent);
    try {
      localStorage.setItem('brandorax_student', JSON.stringify(newStudent));
    } catch {
      // LocalStorage fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-gray-50 text-brand-navy">
      <ScrollToTop />

      {/* Persistent Multi-Page Navigation */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        student={student}
      />

      {/* Multi-Page Route Switcher */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenQuiz={() => setIsQuizOpen(true)} />}
          />
          <Route
            path="/academy"
            element={<AcademyPage onOpenQuiz={() => setIsQuizOpen(true)} />}
          />
          <Route
            path="/academy/:slug"
            element={<TrackDetailPage />}
          />
          <Route
            path="/talent-pipeline"
            element={<TalentPipelinePage />}
          />
          <Route
            path="/community"
            element={<CommunityPage />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/apply"
            element={<ApplyPage onEnrollSuccess={handleEnrollSuccess} />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage student={student} />}
          />
        </Routes>
      </main>

      {/* Persistent Multi-Page Footer */}
      <Footer />

      {/* Interactive Global Quiz Modal */}
      <TrackMatcherModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectTrack={(id) => {
          navigate(`/academy/${id}`);
        }}
        onOpenEnroll={(id) => {
          navigate(`/apply?track=${id}`);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
