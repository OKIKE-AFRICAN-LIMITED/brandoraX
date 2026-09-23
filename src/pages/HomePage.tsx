import React from 'react';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ExploreProgramsSection } from '../components/ExploreProgramsSection';
import { ScholarshipBanner } from '../components/ScholarshipBanner';
import { SubscribeSection } from '../components/SubscribeSection';

interface HomePageProps {
  onOpenQuiz?: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="bg-white text-gray-900 w-full overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Why Choose BrandoraX? */}
      <WhyChooseUs />

      {/* 3. Explore Our Programs */}
      <ExploreProgramsSection />

      {/* 4. Scholarships Available */}
      <ScholarshipBanner />

      {/* 5. Subscribe to BrandoraX Updates */}
      <SubscribeSection />
    </div>
  );
};
