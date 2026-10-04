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

import { FAQPage } from './pages/FAQPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import { TrackMatcherModal } from './components/TrackMatcherModal';

export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const openFAQ = () => navigate('/faq');

  return (
    <div className="min-h-screen flex flex-col bg-brand-gray-50 text-brand-navy overflow-x-hidden w-full max-w-full">
      <ScrollToTop />

      {/* Persistent Multi-Page Navigation */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenFAQ={openFAQ}
      />

      {/* Multi-Page Route Switcher */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
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
            element={<ApplyPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<RequireAuth><DashboardPage /></RequireAuth>}
          />
          <Route
            path="/admin"
            element={<RequireAuth admin><AdminPage /></RequireAuth>}
          />
          <Route
            path="/faq"
            element={<FAQPage onOpenQuiz={() => setIsQuizOpen(true)} />}
          />
        </Routes>
      </main>

      {/* Persistent Multi-Page Footer */}
      <Footer 
        onOpenFAQ={openFAQ}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
