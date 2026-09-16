import React, { useState } from 'react';
import { defaultPortfolioData as initialPortfolioData } from './data/initialData';
import { PortfolioData, ThemePreset, ViewMode } from './types';
import { themes } from './utils/theme';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { UXSpecView } from './components/UXSpecView';
import { CopyStudioDrawer } from './components/CopyStudioDrawer';
import { CodeExportModal } from './components/CodeExportModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>('slate');
  const [activeView, setActiveView] = useState<ViewMode>('live-portfolio');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  const themeConfig = themes[currentTheme];

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    if (activeView !== 'live-portfolio') {
      setActiveView('live-portfolio');
    }
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectProjectForContact = (projectTitle: string) => {
    setPrefilledService(`Project Inquiry: ${projectTitle}`);
    if (activeView !== 'live-portfolio') {
      setActiveView('live-portfolio');
    }
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToastProvider>
      <div className={`min-h-screen bg-[#0F172A] text-slate-200 selection:bg-sky-500/30 selection:text-white font-sans transition-colors duration-300 relative`}>
        {/* Navigation Bar */}
        <Navbar
          name={portfolioData.profile.name}
          title={portfolioData.profile.title}
          activeView={activeView}
          onViewChange={setActiveView}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onOpenStudio={() => setIsStudioOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
        />

        {/* Main Content Area */}
        <main className="relative">
          {activeView === 'live-portfolio' ? (
            <div>
              {/* 1. Hero Section */}
              <HeroSection
                data={portfolioData.hero}
                name={portfolioData.profile.name}
                title={portfolioData.profile.title}
                theme={currentTheme}
                onPrimaryClick={() => {
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                onSecondaryClick={() => {
                  const projectsEl = document.getElementById('projects');
                  projectsEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 2. About Me Section */}
              <AboutSection
                data={portfolioData.about}
                name={portfolioData.profile.name}
                title={portfolioData.profile.title}
                theme={currentTheme}
              />

              {/* 3. Skills & Expertise Section */}
              <SkillsSection
                data={portfolioData.skills}
                theme={currentTheme}
              />

              {/* 4. Featured Projects Section */}
              <ProjectsSection
                data={portfolioData.projects}
                theme={currentTheme}
                onSelectProjectForContact={handleSelectProjectForContact}
              />

              {/* 5. Services Offered Section */}
              <ServicesSection
                data={portfolioData.services}
                theme={currentTheme}
                onSelectServiceForInquiry={handleSelectServiceForInquiry}
              />

              {/* 6. Testimonials Section */}
              <TestimonialsSection
                data={portfolioData.testimonials}
                theme={currentTheme}
              />

              {/* 7. Contact Me Section */}
              <ContactSection
                data={portfolioData.contact}
                name={portfolioData.profile.name}
                theme={currentTheme}
                prefilledService={prefilledService}
              />
            </div>
          ) : (
            /* Conversion Copywriting & UX Specifications Blueprint View */
            <UXSpecView data={portfolioData} />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 font-extrabold flex items-center justify-center text-xs">
                {portfolioData.profile.name.split(' ').map((n) => n[0]).join('') || 'AR'}
              </div>
              <div>
                <p className="font-bold text-white">
                  {portfolioData.profile.name} • {portfolioData.profile.title}
                </p>
                <p className="text-[11px] text-slate-500">
                  Engineered with React 19, TypeScript & Tailwind CSS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <button
                onClick={() => {
                  setActiveView('live-portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                Portfolio
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Scroll to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>

        {/* AI Copy Studio Drawer */}
        <CopyStudioDrawer
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          portfolioData={portfolioData}
          onUpdatePortfolioData={setPortfolioData}
        />

        {/* Code & Copy Export Modal */}
        <CodeExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          data={portfolioData}
        />
      </div>
    </ToastProvider>
  );
}
