import React from 'react';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ExploreProgramsSection } from '../components/ExploreProgramsSection';
import { ForCompaniesSection } from '../components/ForCompaniesSection';
import { ForPartnersSection } from '../components/ForPartnersSection';
import { ScholarshipBanner } from '../components/ScholarshipBanner';
import { SubscribeSection } from '../components/SubscribeSection';

interface HomePageProps {
  onOpenQuiz?: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Why Choose BrandoraX? */}
      <WhyChooseUs />

      {/* 3. Explore Our Programs */}
      <ExploreProgramsSection />

      {/* 4. For Companies */}
      <ForCompaniesSection />

      {/* 5. For Partners */}
      <ForPartnersSection />

      {/* 6. Scholarships Available */}
      <ScholarshipBanner />

      {/* 7. Subscribe to BrandoraX updates */}
      <SubscribeSection />
    </div>
  );
};
