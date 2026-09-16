import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Info,
  Copy,
  Check,
  GraduationCap,
  Shield,
  Code2,
  Lock,
  Cpu,
  Brain,
  CheckCircle2,
  Users,
  FlaskConical,
  Terminal,
  Award,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { AboutSectionData, ThemePreset, EducationItem } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';
import jayedPhoto from '../assets/jayed.jpg';

interface AboutSectionProps {
  data: AboutSectionData;
  theme: ThemePreset;
}

const CURRENT_PHOTO_VERSION = 'july_photo_official_v3';

export const AboutSection: React.FC<AboutSectionProps> = ({ data, theme }) => {
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'education' | 'clubs' | 'principles'>('bio');
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

  const handleCopyAbout = () => {
    const text = `ABOUT MD JAYED:

${data.bioParagraph1}

${data.bioParagraph2}

ACADEMIC BACKGROUND & EDUCATION:
• B.Sc. in Computer Science & Engineering (CSE) - Islamic University, Bangladesh (IU) [Undergraduate]
• Higher Secondary Certificate (HSC) - Govt. Yasin College (Science Group) | Result: GPA 4.75 / 5.00
• Secondary School Certificate (SSC) - Liaquat Ali Smriti School & College (Science Group) | Result: GPA 4.67 / 5.00

CAMPUS CLUBS:
• Cybersecurity Club (IUCC)
• CPU Club (Computer Programming Unit)
• Science Club (IUSC)

KEY STATS:
${data.stats
  .map((s) => `- ${s.label}: ${s.value} (${s.subtext})`)
  .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('About Section copy copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const principles = [
    {
      title: 'Offensive Insight, Defensive Rigor',
      desc: 'Understanding exploit mechanics and attacker mindsets to engineer bulletproof, zero-trust architectures.',
      icon: Shield,
    },
    {
      title: 'Algorithmic Foundation',
      desc: 'Grounded in core Computer Science fundamentals: time complexity, robust data structures, and clean code.',
      icon: Cpu,
    },
    {
      title: 'AI & Full-Stack Synergy',
      desc: 'Integrating Gemini AI and intelligent automation into high-speed, modern web products.',
      icon: Brain,
    },
    {
      title: 'Ethical Responsibility',
      desc: '100% committed to ethical hacking, responsible disclosure, and fostering campus cybersecurity awareness.',
      icon: Lock,
    },
  ];

  const clubsList = data.clubs || [
    {
      name: 'Cybersecurity Club (IUCC)',
      category: 'Cybersecurity & Ethical Hacking',
      role: 'Core Member & Security Researcher',
      description:
        'Active organizer and participant in CTF (Capture The Flag) competitions, vulnerability workshops, ethical hacking demonstrations, and digital security awareness campaigns.',
      highlights: [
        'CTF Challenges & Reconnaissance sessions',
        'OWASP Top 10 web security workshops',
        'Peer mentoring on Linux & penetration testing tools',
      ],
    },
    {
      name: 'CPU Club (Computer Programming Unit)',
      category: 'Competitive Programming & Development',
      role: 'Active Member & Problem Solver',
      description:
        'Engaging in algorithmic problem solving, competitive coding contests, Data Structures practice, and collaborative software development hackathons.',
      highlights: [
        'Algorithms & Data Structures training',
        'Inter-university programming contest prep',
        'Full-stack and open-source project sprints',
      ],
    },
    {
      name: 'Science Club (IUSC)',
      category: 'Science, Research & Innovation',
      role: 'Active Member & Tech Coordinator',
      description:
        'Promoting scientific curiosity, technological innovation, organizing science fairs, robotics exhibits, and technical seminars on campus.',
      highlights: [
        'Organizing Campus Science Fairs & Tech Talks',
        'AI & Emerging Technology seminars',
        'Collaborative tech exhibitions',
      ],
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 02
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Academic & Technical Profile
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About MD Jayed & Background
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUxNote(!showUxNote)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{showUxNote ? 'Hide UX Rationale' : 'UX Layout Advice'}</span>
            </button>
            <button
              onClick={handleCopyAbout}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy Bio'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">UX Architecture Rationale for About:</span> {data.uxLayoutNote}
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Bio & Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-slate-700 pb-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('bio')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    activeTab === 'bio'
                      ? 'bg-sky-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Personal Bio & Vision
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'education'
                      ? 'bg-sky-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Academic Background
                </button>
                <button
                  onClick={() => setActiveTab('clubs')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'clubs'
                      ? 'bg-sky-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Campus Clubs (3)
                </button>
                <button
                  onClick={() => setActiveTab('principles')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    activeTab === 'principles'
                      ? 'bg-sky-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Core Pillars
                </button>
              </div>

              {activeTab === 'bio' && (
                <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                  <p className="first-letter:text-4xl first-letter:font-extrabold first-letter:text-sky-400 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                    {data.bioParagraph1}
                  </p>
                  <p>{data.bioParagraph2}</p>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-3.5 text-slate-300 text-xs sm:text-sm">
                  {/* 1. B.Sc. in CSE */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-sky-500/40 transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            Bachelor of Science in Engineering (B.Sc. in CSE)
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="text-xs text-sky-300 font-semibold">
                              Islamic University (IU), Kushtia, Bangladesh
                            </span>
                            <a
                              href="https://www.iu.ac.bd"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
                            >
                              iu.ac.bd <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30 shrink-0">
                        Undergraduate (Ongoing)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-9">
                      Major in Computer Science & Engineering with core coursework in Data Structures, Algorithms, Computer Networks, DBMS, Operating Systems, Cryptography, and Software Engineering.
                    </p>
                  </div>

                  {/* 2. Higher Secondary Certificate (HSC) - Govt. Yasin College */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/40 transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              Higher Secondary Certificate (HSC)
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                              Science Group
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-200 font-semibold">
                              Govt. Yasin College
                            </span>
                            <a
                              href="https://www.facebook.com/share/g/1Awv9Z3tfW/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                            >
                              College Profile <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs">
                          GPA: 4.75 <span className="text-[10px] text-emerald-400/80 font-normal">/ 5.00</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-9">
                      Higher Secondary education in Science division with high marks in Higher Mathematics, Physics, Chemistry, and ICT.
                    </p>
                  </div>

                  {/* 3. Secondary School Certificate (SSC) - Liaquat Ali Smriti School & College */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-teal-500/40 transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              Secondary School Certificate (SSC)
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950/60 text-teal-300 border border-teal-500/30">
                              Science Group
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-200 font-semibold">
                              Liaquat Ali Smriti School & College
                            </span>
                            <a
                              href="https://www.facebook.com/share/18pNJTcQx9/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 hover:underline transition-colors"
                            >
                              School & College Page <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/40 shadow-xs">
                          GPA: 4.67 <span className="text-[10px] text-teal-400/80 font-normal">/ 5.00</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-9">
                      Secondary School education in Science division with strong academic merit across Mathematics, Science & Computing.
                    </p>
                  </div>

                  {/* Focus Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                      <p className="text-xs font-bold text-white">Cybersecurity & CTF</p>
                      <p className="text-[11px] text-slate-400">Web Exploitation, Cryptography, Packet Analysis</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                      <p className="text-xs font-bold text-white">AI, Web & Automation</p>
                      <p className="text-[11px] text-slate-400">React 19, Gemini API, Google Forms, Node.js</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'clubs' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Active participation and contributions across three campus student organizations:
                  </p>
                  <div className="space-y-3">
                    {clubsList.map((club, idx) => {
                      const icon =
                        idx === 0 ? Shield : idx === 1 ? Terminal : FlaskConical;
                      const Icon = icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/90 hover:border-sky-500/40 transition-colors space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{club.name}</h4>
                                <span className="text-[11px] text-sky-400 font-semibold">
                                  {club.role}
                                </span>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                              {club.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{club.description}</p>
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {club.highlights.map((h, hIdx) => (
                              <span
                                key={hIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800/90 text-slate-400 border border-slate-700/80"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'principles' && (
                <div className="space-y-4">
                  {principles.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 flex items-start gap-3.5"
                      >
                        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-sky-400 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Verified Credentials */}
              <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>B.Sc. in Computer Science & Engineering (IU)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Science Club • CPU Club • Cybersecurity Club</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image Card & Key Facts Grid */}
          <div className="lg:col-span-5 space-y-4">
            {/* Featured Portrait Card */}
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-4 group hover:border-sky-500/40 transition-all">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-sky-400/40 shrink-0 shadow-md bg-slate-900">
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base">MD Jayed</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    CSE
                  </span>
                </div>
                <p className="text-xs text-sky-400 font-medium">Cybersecurity & Web Dev</p>
                <p className="text-[11px] text-slate-400">Kushtia, Bangladesh</p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 border border-slate-700">
                    #ScienceClub
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 border border-slate-700">
                    #CPUClub
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-sky-400 border border-slate-700">
                    #CyberSecurity
                  </span>
                </div>
              </div>
            </div>

            {/* Key Facts Grid */}
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-md hover:border-slate-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <h4 className="mt-1 text-xs sm:text-sm font-bold text-slate-200 leading-snug">
                      {stat.label}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                    {stat.subtext}
                  </p>
                </div>
              ))}
            </div>

            {/* Inbound Callout Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-white shadow-lg flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Connect & Collaborate
                </p>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Available for Security Audits & Web Projects
                </p>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors shrink-0"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
