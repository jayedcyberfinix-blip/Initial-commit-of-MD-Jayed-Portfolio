import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Code2, Shield, GraduationCap, Menu, X, ChevronRight, Layers, FileDown, Wand2, Download, Github } from 'lucide-react';
import { ThemePreset, ViewMode } from '../types';
import { themes } from '../utils/theme';
import jayedPhoto from '../assets/jayed.jpg';

interface NavbarProps {
  name: string;
  title: string;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  currentTheme: ThemePreset;
  onThemeChange: (theme: ThemePreset) => void;
  onOpenStudio: () => void;
  onOpenExport: () => void;
}

const CURRENT_PHOTO_VERSION = 'july_photo_2026_v2';

export const Navbar: React.FC<NavbarProps> = ({
  name,
  title,
  activeView,
  onViewChange,
  currentTheme,
  onThemeChange,
  onOpenStudio,
  onOpenExport,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const version = localStorage.getItem('jayed_photo_version');
      if (version === 'custom_user_upload') {
        const saved = localStorage.getItem('jayed_photo_url');
        if (saved && saved.startsWith('data:image')) {
          return saved;
        }
      }
    } catch {
      // ignore
    }
    return jayedPhoto;
  });
  const themeConfig = themes[currentTheme];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const version = localStorage.getItem('jayed_photo_version');
      if (version === 'custom_user_upload') {
        const saved = localStorage.getItem('jayed_photo_url');
        if (saved && saved.startsWith('data:image')) {
          setPhotoUrl(saved);
          return;
        }
      }
      setPhotoUrl(jayedPhoto);
    } catch {
      setPhotoUrl(jayedPhoto);
    }
    const handlePhotoChanged = (e: any) => {
      if (e.detail) {
        setPhotoUrl(e.detail);
      }
    };
    window.addEventListener('jayed-photo-changed', handlePhotoChanged);
    return () => window.removeEventListener('jayed-photo-changed', handlePhotoChanged);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Endorsements', href: '#feedback' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 shadow-xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="flex items-center gap-2.5 group"
              onClick={() => {
                if (activeView !== 'live-portfolio') {
                  onViewChange('live-portfolio');
                }
              }}
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-sky-400/40 shadow-md group-hover:scale-105 transition-transform bg-slate-900">
                <img
                  src={photoUrl}
                  alt="MD Jayed"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== jayedPhoto) {
                      target.src = jayedPhoto;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-sky-300 transition-colors">
                    MD Jayed
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    CSE
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-[280px]">
                  Cybersecurity & AI Web Developer
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (activeView !== 'live-portfolio') {
                    onViewChange('live-portfolio');
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Mode Toggle: Live vs Spec */}
            <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => onViewChange('live-portfolio')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'live-portfolio'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => onViewChange('ux-spec')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'ux-spec'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                UX & Copy Spec
              </button>
            </div>

            {/* AI Copy Studio Trigger */}
            <button
              onClick={onOpenStudio}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 px-3 py-2 rounded-xl transition-all shadow-2xs"
              title="Open AI Copy Generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">AI Copy Studio</span>
              <span className="md:hidden">AI Copy</span>
            </button>

            {/* GitHub Projects Link */}
            <a
              href="https://github.com/users/jayedcyberfinix-blip/projects/1/views/1"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-2 rounded-xl transition-all shadow-2xs"
              title="GitHub Projects: jayedcyberfinix-blip"
            >
              <Github className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden xl:inline">GitHub</span>
            </a>

            {/* Export Code / Copy */}
            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 px-3.5 py-2 rounded-xl transition-all shadow-xs"
              title="Export Portfolio Code & Markdown"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (activeView !== 'live-portfolio') {
                    onViewChange('live-portfolio');
                  }
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onViewChange('live-portfolio');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                  activeView === 'live-portfolio'
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                Live Portfolio
              </button>
              <button
                onClick={() => {
                  onViewChange('ux-spec');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                  activeView === 'ux-spec'
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                UX & Copy Spec
              </button>
            </div>
            <a
              href="https://github.com/users/jayedcyberfinix-blip/projects/1/views/1"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-slate-950 text-slate-200 hover:text-white flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-sky-400" />
              <span>GitHub Projects Board</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
