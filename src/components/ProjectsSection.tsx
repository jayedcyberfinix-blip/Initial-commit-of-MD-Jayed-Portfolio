import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  TrendingUp,
  Sparkles,
  Info,
  Copy,
  Check,
  ArrowRight,
  Wallet,
  Landmark,
  Bot,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { ProjectsSectionData, ProjectItem, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';
import expenseTrackerThumb from '../assets/images/expense_tracker_ui_1787151737199.jpg';
import batchFundThumb from '../assets/images/batch_fund_ui_1787151754679.jpg';
import khataGhorThumb from '../assets/images/khata_ghor_ui_1789483370026.jpg';

const defaultProjectImages: Record<string, string> = {
  'project-expense-tracker': expenseTrackerThumb,
  'project-batch-fund': batchFundThumb,
  'project-khata-ghor': khataGhorThumb,
};

interface ProjectsSectionProps {
  data: ProjectsSectionData;
  theme: ThemePreset;
  onSelectProjectForContact?: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  theme,
  onSelectProjectForContact,
}) => {
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const themeConfig = themes[theme];
  const { showToast } = useToast();

  const handleCopyProjects = () => {
    const text = `FEATURED PROJECTS BY MD JAYED (MADE WITH AI):\n\n${data.projectList
      .map(
        (p) =>
          `PROJECT: ${p.title} (${p.category})\nATTRIBUTION: Made with AI\nTAGLINE: ${p.tagline}\nLIVE URL: ${p.liveDemoUrl || 'N/A'}\nDESCRIPTION: ${p.description}\nTECH STACK: ${p.tools.join(
            ', '
          )}\nIMPACT: ${p.impact}`
      )
      .join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Projects copy copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to render distinct project logo based on project
  const renderProjectLogo = (project: ProjectItem) => {
    if (project.id === 'project-khata-ghor' || project.title.toLowerCase().includes('khata')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shrink-0">
          <ShoppingBag className="w-6 h-6" />
        </div>
      );
    }
    if (project.id === 'project-expense-tracker' || project.title.toLowerCase().includes('expense')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shrink-0">
          <Wallet className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shadow-lg shrink-0">
        <Landmark className="w-6 h-6" />
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#0F172A]/80 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 04
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Featured Applications
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 text-slate-400 text-base">
              Live web applications engineered with modern technologies and built with AI assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="https://github.com/users/jayedcyberfinix-blip/projects/1/views/1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500/40 px-3 py-1.5 rounded-lg transition-all shadow-2xs group"
              title="Open GitHub Projects Board: jayedcyberfinix-blip"
            >
              <Github className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>GitHub Projects</span>
            </a>
            <button
              onClick={() => setShowUxNote(!showUxNote)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{showUxNote ? 'Hide UX Rationale' : 'UX Layout Advice'}</span>
            </button>
            <button
              onClick={handleCopyProjects}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy Projects'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">UX Architecture Rationale for Projects:</span> {data.uxLayoutNote}
          </div>
        )}

        {/* Projects Grid: Responsive 3-Card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.projectList.map((project, index) => (
            <div
              key={project.id}
              className="bg-slate-800/60 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl hover:border-sky-500/50 hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Visual Frame / Mockup Banner */}
                <div className="relative h-60 sm:h-64 bg-slate-950 overflow-hidden border-b border-slate-700">
                  <img
                    src={
                      defaultProjectImages[project.id] ||
                      project.image ||
                      (project as any).imageUrl ||
                      (project.title.toLowerCase().includes('khata')
                        ? khataGhorThumb
                        : project.title.toLowerCase().includes('expense')
                        ? expenseTrackerThumb
                        : batchFundThumb)
                    }
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = project.title.toLowerCase().includes('khata')
                        ? khataGhorThumb
                        : project.title.toLowerCase().includes('expense')
                        ? expenseTrackerThumb
                        : batchFundThumb;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-950/90 text-sky-400 border border-slate-700 backdrop-blur-md shadow-lg">
                      {project.category}
                    </span>

                    {/* Made with AI Glowing Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-purple-900/90 to-indigo-900/90 text-purple-200 border border-purple-400/40 backdrop-blur-md shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                      <span>Made with AI</span>
                    </div>
                  </div>

                  {/* Netlify Live Status Pill at Bottom Left */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="text-xs font-bold text-sky-300 uppercase tracking-wider drop-shadow-md">
                      {project.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live on Netlify</span>
                    </span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      {renderProjectLogo(project)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-extrabold text-white group-hover:text-sky-300 transition-colors">
                            {index + 1}. {project.title}
                          </h3>
                        </div>
                        {/* Made with AI Subtitle */}
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-purple-300">
                          <Bot className="w-3.5 h-3.5 text-purple-400" />
                          <span>Made with AI • By MD Jayed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Measurable ROI Impact Callout */}
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sky-400 font-bold">Key Outcome & Value: </span>
                      {project.impact}
                    </div>
                  </div>

                  {/* Tools / Tech Stack Pills */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Engineered With
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700 shadow-2xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card Footer with Direct Launch Button */}
              <div className="p-6 sm:p-8 pt-0 border-t border-slate-700/80 mt-4 flex flex-wrap items-center justify-between gap-3">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-lg shadow-sky-500/25 transition-all group/btn"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                )}

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
                      title="View GitHub repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  {onSelectProjectForContact && (
                    <button
                      onClick={() => onSelectProjectForContact(project.title)}
                      className="text-xs font-semibold text-slate-400 hover:text-sky-300 transition-colors"
                    >
                      Inquire Similar →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
