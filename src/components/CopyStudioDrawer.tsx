import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, User, Code2, Mail, GraduationCap, Shield } from 'lucide-react';
import { PortfolioData } from '../types';
import { useToast } from './Toast';

interface CopyStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onUpdatePortfolioData?: (data: PortfolioData) => void;
}

export const CopyStudioDrawer: React.FC<CopyStudioDrawerProps> = ({
  isOpen,
  onClose,
  portfolioData,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  // Generate full markdown/plain profile details
  const fullProfileDetails = `# ${portfolioData.profile.name}
${portfolioData.profile.title}

## Academic Background & Education
- Degree: Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)
- Institution: Islamic University (IU), Kushtia, Bangladesh
- Focus: Cybersecurity, Ethical Hacking, Web Development & AI

## Professional Headline
${portfolioData.hero.headline}
${portfolioData.hero.subheadline}

## About Me / Bio
${portfolioData.about.bioParagraph1}

${portfolioData.about.bioParagraph2}

## Core Technical Skills
${portfolioData.skills.categories
  .map(
    (c) =>
      `### ${c.categoryName}\n` +
      c.skillsList.map((s) => `- ${s.name} (${s.level}): ${s.context}`).join('\n')
  )
  .join('\n\n')}

## Featured Projects
${portfolioData.projects.projectList
  .map(
    (p) =>
      `### ${p.title} [${p.category}]\n${p.description}\nImpact: ${p.impact}\nTools: ${p.tools.join(', ')}`
  )
  .join('\n\n')}

## Services & Expertise
${portfolioData.services.serviceList
  .map((s) => `- ${s.title}: ${s.valueProposition}`)
  .join('\n')}

## Contact Details
- Direct Email: ${portfolioData.contact.directEmail}
- GitHub: https://github.com/users/jayedcyberfinix-blip/projects/1/views/1
- Location / Campus: Islamic University (IU), Kushtia, Bangladesh
`;

  const fullBioText = `${portfolioData.about.bioParagraph1}\n\n${portfolioData.about.bioParagraph2}`;

  const allSkillsText = portfolioData.skills.categories
    .map(
      (c) =>
        `${c.categoryName}:\n` +
        c.skillsList.map((s) => `• ${s.name} (${s.level}) - ${s.context}`).join('\n')
    )
    .join('\n\n');

  const allProjectsText = portfolioData.projects.projectList
    .map(
      (p) =>
        `Project: ${p.title} (${p.category})\nDescription: ${p.description}\nImpact: ${p.impact}\nTech Stack: ${p.tools.join(', ')}`
    )
    .join('\n\n');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between text-slate-200">
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>AI Copy Studio</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20">
                    Details Copy
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Quick 1-click copy for MD Jayed's details, bio, skills & contact
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Master Copy Button Bar */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-200">All Profile Details</p>
              <p className="text-[11px] text-slate-400">Copy entire portfolio profile in structured format</p>
            </div>
            <button
              onClick={() => copyToClipboard(fullProfileDetails, 'All Profile Details', 'all-details')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                copiedKey === 'all-details'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
              }`}
            >
              {copiedKey === 'all-details' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'all-details' ? 'Copied All!' : 'Copy All Details'}</span>
            </button>
          </div>

          {/* Drawer Body - Pure Read & Copy Sections */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* 1. Basic Info & Headline */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <User className="w-4 h-4" />
                  <span>Profile & Academic Details</span>
                </div>
              </div>

              {/* Name */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Full Name</p>
                  <p className="text-xs font-semibold text-white truncate">{portfolioData.profile.name}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.profile.name, 'Name', 'name')}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'name' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'name' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Title */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Professional Title</p>
                  <p className="text-xs font-semibold text-white truncate">{portfolioData.profile.title}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.profile.title, 'Professional Title', 'title')}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'title' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Education */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">University & Degree</p>
                  <p className="text-xs font-semibold text-white">
                    B.Sc. in CSE • Islamic University (IU), Kushtia, Bangladesh
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE) - Islamic University (IU), Kushtia, Bangladesh',
                      'Education',
                      'education'
                    )
                  }
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'education' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'education' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Headline */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Headline & Pitch</p>
                  <button
                    onClick={() => copyToClipboard(portfolioData.hero.headline, 'Headline', 'headline')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'headline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'headline' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {portfolioData.hero.headline}
                </p>
              </div>
            </div>

            {/* 2. Bio & About Me */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>About Me & Bio</span>
                </div>
                <button
                  onClick={() => copyToClipboard(fullBioText, 'Bio / About Me', 'bio')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'bio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'bio' ? 'Copied Bio' : 'Copy Bio'}</span>
                </button>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>{portfolioData.about.bioParagraph1}</p>
                <p>{portfolioData.about.bioParagraph2}</p>
              </div>
            </div>

            {/* 3. Core Technical Skills */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Shield className="w-4 h-4" />
                  <span>Core Skills & Cybersecurity Stack</span>
                </div>
                <button
                  onClick={() => copyToClipboard(allSkillsText, 'Skills List', 'skills')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'skills' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'skills' ? 'Copied Skills' : 'Copy Skills'}</span>
                </button>
              </div>
              <div className="space-y-2">
                {portfolioData.skills.categories.map((cat) => (
                  <div key={cat.categoryName} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <p className="font-bold text-sky-300 text-xs">{cat.categoryName}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skillsList.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-[11px]"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Featured Projects */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Code2 className="w-4 h-4" />
                  <span>Featured Projects</span>
                </div>
                <button
                  onClick={() => copyToClipboard(allProjectsText, 'Projects List', 'projects')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'projects' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'projects' ? 'Copied Projects' : 'Copy Projects'}</span>
                </button>
              </div>
              <div className="space-y-2">
                {portfolioData.projects.projectList.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white text-xs">{proj.title}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{proj.description}</p>
                    <p className="text-[11px] text-emerald-400 font-medium">Impact: {proj.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Contact & Socials */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Mail className="w-4 h-4" />
                  <span>Contact Information & Links</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Direct Email</p>
                  <p className="text-xs font-semibold text-white truncate">{portfolioData.contact.directEmail}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.contact.directEmail, 'Email', 'email')}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">GitHub Profile / Projects</p>
                  <p className="text-xs font-semibold text-white truncate">
                    https://github.com/users/jayedcyberfinix-blip/projects/1/views/1
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'https://github.com/users/jayedcyberfinix-blip/projects/1/views/1',
                      'GitHub URL',
                      'github-url'
                    )
                  }
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'github-url' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'github-url' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              MD Jayed • Islamic University (IU), Bangladesh
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
