import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Info,
  Copy,
  Check,
  Terminal,
  Shield,
  FileCode,
  GraduationCap,
  Maximize2,
  X,
  MapPin,
  Users,
  Facebook,
  Linkedin,
  Mail,
  Github,
  Camera,
} from 'lucide-react';
import { HeroSectionData, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';
import { PhotoUploadModal } from './PhotoUploadModal';
import jayedPhoto from '../assets/jayed.jpg';

interface HeroSectionProps {
  data: HeroSectionData;
  name: string;
  title: string;
  theme: ThemePreset;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const CURRENT_PHOTO_VERSION = 'july_photo_2026_v2';

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  name,
  title,
  theme,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const version = localStorage.getItem('jayed_photo_version');
      if (version === 'custom_user_upload') {
        const saved = localStorage.getItem('jayed_photo_url');
        if (saved && saved.startsWith('data:image')) {
          return saved;
        }
      } else {
        localStorage.removeItem('jayed_photo_url');
        localStorage.setItem('jayed_photo_version', CURRENT_PHOTO_VERSION);
      }
    } catch {
      // ignore
    }
    return jayedPhoto;
  });

  const themeConfig = themes[theme];
  const { showToast } = useToast();

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

  const handleCopyHeroCopy = () => {
    const text = `HEADLINE: ${data.headline}\nSUB-HEADLINE: ${data.subheadline}\nPRIMARY CTA: ${data.primaryCta}\nSECONDARY CTA: ${data.secondaryCta}\nTRUST BADGE: ${data.badge}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Hero copy copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadResume = () => {
    const resumeText = `MD JAYED - RESUME & CV
========================
Name: MD Jayed
Email: jayedcyberfinix@gmail.com
Location: Kushtia, Bangladesh
University: Islamic University, Bangladesh (IU)
Department: Computer Science & Engineering (CSE)
Degree: B.Sc. in Engineering

CAMPUS CLUBS & LEADERSHIP:
- Cybersecurity Club - Core Member & CTF Trainer
- CPU Club (Computer Programming Unit) - Competitive Programming
- Science Club - Tech Exhibition & Research Member

TECHNICAL SPECIALIZATIONS:
- Web Penetration Testing (OWASP Top 10, Port Scanning, Burp Suite, Nmap)
- Full-Stack Engineering (React, TypeScript, Node.js, Express, Tailwind CSS)
- AI Application Development (Google Gemini API, Automated Threat Triage)
- Digital Automation & Tools (Google Forms Design, Conditional Logic, Google Sheets Sync)

FEATURED PROJECTS:
1. Expense Tracker Web App (Live on Netlify: https://fancy-bienenstitch-fc0447.netlify.app/)
2. Batch Fund Management System (Live on Netlify: https://aesthetic-cat-9f1b44.netlify.app/)
3. Khata Ghor | খাতা ঘর - Stationery & Notebook E-Commerce (Live on Netlify: https://shimmering-churros-655895.netlify.app/)

CONTACT:
GitHub: https://github.com/users/jayedcyberfinix-blip/projects/1/views/1
LinkedIn: https://www.linkedin.com/in/jayed-molla-197a6b426?utm_source=share_via&utm_content=profile&utm_medium=member_android
Facebook: https://www.facebook.com/share/18Cv9YMVZm/
Email: jayedcyberfinix@gmail.com
`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MD_Jayed_CV_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Resume downloaded successfully!', 'success');
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Hero Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 1st Mention: Academic & Clubs Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-semibold text-slate-200 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              <span className="text-sky-300 font-bold">Islamic University (IU), Bangladesh</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Science Club</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">CPU Club</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-300 font-medium">Cybersecurity Club</span>
            </div>

            {/* Bold Attention-Grabbing Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Engineering Secure Systems,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                Ethical Hacking
              </span>{' '}
              & AI Web Apps.
            </h1>

            {/* 2nd (and final) Mention: Concise Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              I am <strong className="text-white font-bold">{name}</strong> — a Computer Science & Engineering student at <strong className="text-sky-300">Islamic University (IU), Bangladesh</strong>. Active in the <strong className="text-slate-200">Science Club, CPU Club, and Cybersecurity Club</strong>. I specialize in web penetration testing, secure software engineering, and AI systems.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onPrimaryClick}
                className="px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{data.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onSecondaryClick}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900/90 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 shadow-xs transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>{data.secondaryCta}</span>
              </button>

              <button
                onClick={handleDownloadResume}
                className="px-5 py-3.5 rounded-xl font-bold text-xs text-slate-300 bg-slate-800/80 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                title="Download MD Jayed's CV / Resume Summary"
              >
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Micro-Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Domains:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono text-[11px] text-sky-300">
                #EthicalHacking
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono text-[11px] text-slate-300">
                #WebSecurity
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono text-[11px] text-slate-300">
                #FullStack
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono text-[11px] text-emerald-400">
                #Gemini_AI
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono text-[11px] text-purple-300">
                #GoogleForms
              </span>
            </div>

            {/* Copy Button & Strategy Note */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setShowUxNote(!showUxNote)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>{showUxNote ? 'Hide UX Advice' : 'UX & Portfolio Advice'}</span>
              </button>

              <button
                onClick={handleCopyHeroCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            {showUxNote && (
              <div className="p-4 rounded-2xl bg-slate-900/95 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-xl animate-in fade-in">
                <span className="font-bold text-sky-400">MD Jayed Portfolio Architecture:</span> {data.uxLayoutNote}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Exact Photo Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Outer Decorative Cyber Glow Box */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />

              {/* Main Photo Card Container */}
              <div className="relative bg-slate-900 border-2 border-slate-700/80 group-hover:border-sky-400/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                {/* Photo Frame with 1:1 Aspect Ratio displaying the original photo */}
                <div
                  className="relative aspect-square overflow-hidden cursor-pointer bg-slate-950"
                  onClick={() => setIsPhotoModalOpen(true)}
                  title="Click to view full HD portrait"
                >
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
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />

                  {/* Subtle Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

                  {/* Top Action Buttons: Upload/Change Photo & Fullscreen Expand */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUploadModalOpen(true);
                      }}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-sky-400 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105"
                      title="ছবি পরিবর্তন বা আপলোড করুন"
                      aria-label="ছবি পরিবর্তন বা আপলোড করুন"
                    >
                      <Camera className="w-4 h-4 text-sky-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPhotoModalOpen(true);
                      }}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-sky-400 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105"
                      title="Click to view full HD portrait"
                      aria-label="Click to view full HD portrait"
                    >
                      <Maximize2 className="w-4 h-4 text-sky-400" />
                    </button>
                  </div>

                  {/* Live Status Pill at Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700 backdrop-blur-md text-xs font-bold text-white shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>MD Jayed</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-500/30 backdrop-blur-md">
                        CSE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">Kushtia, Bangladesh</span>
                      </div>
                      <span className="text-sky-400 font-bold shrink-0 ml-1">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Card Sub-Banner */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Ethical Hacker & Web Dev</p>
                      <p className="text-[10px] text-slate-400">Science • CPU • Cybersecurity Club</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const contactEl = document.getElementById('contact');
                      contactEl?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-sky-500/20 hover:bg-sky-500 hover:text-slate-950 text-sky-300 border border-sky-500/30 transition-colors"
                  >
                    Connect
                  </button>
                </div>
              </div>

              {/* Social Connect Quick Bar Directly Below Photo - Authentic Brand Badges */}
              <div className="mt-3.5 p-2 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md grid grid-cols-4 gap-2">
                {/* Facebook Original Brand Badge */}
                <a
                  href="https://www.facebook.com/share/18Cv9YMVZm/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-slate-950/90 hover:bg-[#1877F2]/15 border border-slate-800 hover:border-[#1877F2]/60 transition-all duration-200 group shadow-xs"
                  title="Facebook: MD Jayed"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shadow-md shadow-[#1877F2]/30 group-hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4 fill-white text-white" />
                  </div>
                  <span className="text-[10px] font-bold mt-1.5 text-slate-300 group-hover:text-[#1877F2] transition-colors">Facebook</span>
                </a>

                {/* LinkedIn Original Brand Badge */}
                <a
                  href="https://www.linkedin.com/in/jayed-molla-197a6b426?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-slate-950/90 hover:bg-[#0A66C2]/15 border border-slate-800 hover:border-[#0A66C2]/60 transition-all duration-200 group shadow-xs"
                  title="LinkedIn: Jayed Molla"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shadow-md shadow-[#0A66C2]/30 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4 fill-white text-white" />
                  </div>
                  <span className="text-[10px] font-bold mt-1.5 text-slate-300 group-hover:text-[#38bdf8] transition-colors">LinkedIn</span>
                </a>

                {/* Gmail Original Brand Badge */}
                <a
                  href="mailto:jayedcyberfinix@gmail.com"
                  className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-slate-950/90 hover:bg-[#EA4335]/15 border border-slate-800 hover:border-[#EA4335]/60 transition-all duration-200 group shadow-xs"
                  title="Gmail: jayedcyberfinix@gmail.com"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#EA4335] via-[#FBBC05] to-[#4285F4] p-[1.5px] shadow-md shadow-[#EA4335]/30 group-hover:scale-110 transition-transform">
                    <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold mt-1.5 text-slate-300 group-hover:text-[#EA4335] transition-colors">Gmail</span>
                </a>

                {/* GitHub Original Brand Badge */}
                <a
                  href="https://github.com/users/jayedcyberfinix-blip/projects/1/views/1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all duration-200 group shadow-xs"
                  title="GitHub Projects: jayedcyberfinix-blip"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#24292e] border border-slate-700 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    <Github className="w-4 h-4 fill-white text-white" />
                  </div>
                  <span className="text-[10px] font-bold mt-1.5 text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* End of Hero main grid */}
      </div>

      {/* High Definition Fullscreen Photo Lightbox Modal */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white text-sm">MD Jayed — Official Portrait</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="relative bg-slate-950 flex items-center justify-center max-h-[75vh] overflow-hidden">
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
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span>Computer Science & Engineering • Islamic University (IU), Bangladesh</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPhotoModalOpen(false);
                    setIsUploadModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>নতুন ছবি পরিবর্তন করুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload & Change Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentPhotoUrl={photoUrl}
        onPhotoUpdated={(newUrl) => setPhotoUrl(newUrl)}
      />
    </section>
  );
};
