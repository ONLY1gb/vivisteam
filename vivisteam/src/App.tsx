import React, { useEffect, useMemo, useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProgramsSection from './sections/ProgramsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import GallerySection from './sections/GallerySection';
import TeamSection from './sections/TeamSection';
import PartnersSection from './sections/PartnersSection';
import ContactSection from './sections/ContactSection';
import CallToActionSection from './sections/CallToActionSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

type SectionConfig = {
  id: string;
  label: string;
};

const sectionConfig: SectionConfig[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'stories', label: 'Stories' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Team' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = useMemo(() => sectionConfig, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-brand-ink">
      <Navigation sections={sections} activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="space-y-24 pt-16">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <ProgramsSection />
        <TestimonialsSection />
        <GallerySection />
        <TeamSection />
        <PartnersSection />
        <ContactSection />
        <CallToActionSection />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
}

export default App;
