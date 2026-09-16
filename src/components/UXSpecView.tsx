import React, { useState } from 'react';
import { Copy, Check, Code2, ExternalLink, Sparkles, Layers, Terminal, Rocket, CheckCircle2 } from 'lucide-react';
import { PortfolioData, ProjectItem } from '../types';
import { useToast } from './Toast';

interface UXSpecViewProps {
  data: PortfolioData;
}

export const UXSpecView: React.FC<UXSpecViewProps> = ({ data }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCopy = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const generateProjectMarkdown = (p: ProjectItem) => {
    return `### ${p.title} [${p.category}]
- **Tagline:** ${p.tagline}
- **Overview:** ${p.description}
- **Measurable Impact:** ${p.impact}
- **Tech Stack & Tools:** ${p.tools.join(', ')}
${p.liveDemoUrl ? `- **Live Web App:** ${p.liveDemoUrl}\n` : ''}${p.githubUrl ? `- **GitHub Repo/Project:** ${p.githubUrl}\n` : ''}`;
  };

  const generateAllProjectsMarkdown = () => {
    return `# MD Jayed - Featured Engineering Projects Specification & Details

Author: ${data.profile.name} (${data.profile.title})
University: Islamic University (IU), Kushtia, Bangladesh

${data.projects.projectList.map((p, idx) => `## ${idx + 1}. ${p.title} (${p.category})
- **Tagline:** ${p.tagline}
- **Description:** ${p.description}
- **Key Business & Technical Impact:** ${p.impact}
- **Tech Stack:** ${p.tools.join(', ')}
- **Live Demo Link:** ${p.liveDemoUrl || 'N/A'}
- **Source/Project Link:** ${p.githubUrl || 'N/A'}`).join('\n\n')}
`;
  };

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Rocket className="w-3.5 h-3.5" />
            Projects Specification & Copy Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projects Details & Copy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Quick 1-click copy for all of MD Jayed's projects, descriptions, tech stacks, live URLs, and measurable impact metrics.
          </p>
        </div>

        <button
          onClick={() => handleCopy(generateAllProjectsMarkdown(), 'All Projects Details', 'all-projects')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-md ${
            copiedKey === 'all-projects'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
          }`}
        >
          {copiedKey === 'all-projects' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedKey === 'all-projects' ? 'All Projects Copied!' : 'Copy All Projects Details'}</span>
        </button>
      </div>

      {/* Projects List Container */}
      <div className="space-y-6">
        {data.projects.projectList.map((project, idx) => {
          const projectKey = `project-${project.id || idx}`;
          const isProjectCopied = copiedKey === projectKey;

          return (
            <div
              key={project.id || idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-5"
            >
              {/* Project Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        {project.title}
                      </h2>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Master Project Copy Button */}
                <button
                  onClick={() =>
                    handleCopy(generateProjectMarkdown(project), `${project.title} Full Details`, projectKey)
                  }
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs self-start sm:self-auto ${
                    isProjectCopied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  {isProjectCopied ? (
                    <Check className="w-3.5 h-3.5 text-slate-950" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                  )}
                  <span>{isProjectCopied ? 'Copied Project Details!' : 'Copy This Project Details'}</span>
                </button>
              </div>

              {/* Description Box with Copy */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Project Overview & Description
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(project.description, `${project.title} Description`, `${projectKey}-desc`)
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center gap-1 transition-colors border border-slate-800"
                  >
                    {copiedKey === `${projectKey}-desc` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-sky-400" />
                    )}
                    <span>{copiedKey === `${projectKey}-desc` ? 'Copied' : 'Copy Description'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Impact / Results Box with Copy */}
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-sky-400">
                    Measurable Result & Impact
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(project.impact, `${project.title} Impact`, `${projectKey}-impact`)
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-sky-300 flex items-center gap-1 transition-colors border border-sky-800/40"
                  >
                    {copiedKey === `${projectKey}-impact` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-sky-400" />
                    )}
                    <span>{copiedKey === `${projectKey}-impact` ? 'Copied' : 'Copy Impact'}</span>
                  </button>
                </div>
                <p className="text-xs text-sky-200 font-medium">
                  {project.impact}
                </p>
              </div>

              {/* Tools & Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Tech Stack */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Tech Stack & Tools
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(project.tools.join(', '), `${project.title} Tech Stack`, `${projectKey}-stack`)
                      }
                      className="px-2 py-0.5 rounded-md text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center gap-1 transition-colors border border-slate-800"
                    >
                      {copiedKey === `${projectKey}-stack` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-sky-400" />
                      )}
                      <span>{copiedKey === `${projectKey}-stack` ? 'Copied' : 'Copy Stack'}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project URLs */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Project Links & Demos
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {project.liveDemoUrl && (
                      <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[11px] truncate flex-1">
                          Live: {project.liveDemoUrl}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() =>
                              handleCopy(project.liveDemoUrl!, `${project.title} Live URL`, `${projectKey}-live`)
                            }
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Copy Live URL"
                          >
                            {copiedKey === `${projectKey}-live` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-sky-400" />
                            )}
                          </button>
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {project.githubUrl && (
                      <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[11px] truncate flex-1">
                          Project: {project.githubUrl}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() =>
                              handleCopy(project.githubUrl!, `${project.title} GitHub URL`, `${projectKey}-repo`)
                            }
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Copy GitHub URL"
                          >
                            {copiedKey === `${projectKey}-repo` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-sky-400" />
                            )}
                          </button>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
