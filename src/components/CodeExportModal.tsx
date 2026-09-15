import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, FileText, Code2, Sparkles, Github, Rocket, Terminal } from 'lucide-react';
import { PortfolioData } from '../types';
import { useToast } from './Toast';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'react' | 'json' | 'markdown'>('github');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const getExportContent = () => {
    if (activeTab === 'github') {
      return `# ========================================================
# 🚀 1-Click Deploy to GitHub Pages: MD Jayed Portfolio
# ========================================================

# Step 1: Initialize Git and stage your files
git init
git add .
git commit -m "feat: launch MD Jayed portfolio with GitHub Pages setup"

# Step 2: Set your main branch
git branch -M main

# Step 3: Add your remote GitHub repository
# Replace <your-repo-name> with your repository name (e.g. portfolio)
git remote add origin https://github.com/jayedcyberfinix-blip/<your-repo-name>.git

# Step 4: Push code to GitHub
git push -u origin main

# ========================================================
# Step 5: Enable GitHub Pages in your GitHub Repo:
# 1. Open your repo on GitHub: https://github.com/jayedcyberfinix-blip/<your-repo-name>
# 2. Click on "Settings" (top tab) -> "Pages" (left sidebar)
# 3. Under "Build and deployment" > "Source", select: "GitHub Actions"
# 4. That's it! GitHub will automatically trigger .github/workflows/deploy.yml
#    and your portfolio will be live at:
#    https://jayedcyberfinix-blip.github.io/<your-repo-name>/
# ========================================================

# ALTERNATIVE METHOD: Deploy with 1 command via npm
# npm run deploy
`;
    }
    if (activeTab === 'json') {
      return JSON.stringify(data, null, 2);
    }
    if (activeTab === 'markdown') {
      return `# ${data.profile.name} - Portfolio Copy Suite
**Title:** ${data.profile.title}
**Experience:** ${data.profile.experience}
**Audience:** ${data.profile.targetAudience}

## Hero Section
- **Headline:** ${data.hero.headline}
- **Subheadline:** ${data.hero.subheadline}
- **Primary CTA:** ${data.hero.primaryCta}
- **Secondary CTA:** ${data.hero.secondaryCta}

## About Me
${data.about.bioParagraph1}

${data.about.bioParagraph2}

## Key Stats
${data.about.stats.map((s) => `- ${s.label}: ${s.value} (${s.subtext})`).join('\n')}

## Core Skills
${data.skills.categories
  .map((c) => `### ${c.categoryName}\n` + c.skillsList.map((s) => `- ${s.name} (${s.level}): ${s.context}`).join('\n'))
  .join('\n\n')}

## Featured Projects
${data.projects.projectList
  .map(
    (p) =>
      `### ${p.title} (${p.category})\n${p.description}\n**Impact:** ${p.impact}\n**Tools:** ${p.tools.join(
        ', '
      )}`
  )
  .join('\n\n')}

## Services
${data.services.serviceList
  .map((s) => `### ${s.title}\n${s.valueProposition}\nIdeal for: ${s.idealFor}`)
  .join('\n\n')}

## Testimonials
${data.testimonials.quotes.map((q) => `> "${q.quote}"\n> — ${q.author}, ${q.role} at ${q.company}`).join('\n\n')}

## Contact Hook
${data.contact.closingStatement}
Direct Email: ${data.contact.directEmail}
`;
    }

    // Default: React TSX snippet
    return `import React from 'react';

// Production Portfolio Export for ${data.profile.name}
export default function PortfolioWebsite() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
        <span className="px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/20">
          ${data.hero.badge}
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          ${data.hero.headline}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ${data.hero.subheadline}
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a href="#contact" className="px-6 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold hover:bg-sky-400">
            ${data.hero.primaryCta}
          </a>
          <a href="#projects" className="px-6 py-3 rounded-xl border border-slate-700 font-bold hover:bg-slate-800 text-white">
            ${data.hero.secondaryCta}
          </a>
        </div>
      </header>

      {/* Featured Work */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${data.projects.projectList
            .map(
              (p) => `
          <div key="${p.id}" className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700">
            <span className="text-xs text-sky-400 font-bold uppercase">${p.category}</span>
            <h3 className="text-xl font-bold text-white mt-1">${p.title}</h3>
            <p className="text-xs text-slate-400 mt-2">${p.description}</p>
            <div className="mt-4 p-2.5 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-semibold">
              Impact: ${p.impact}
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Let's Connect</h2>
        <p className="text-slate-400">${data.contact.closingStatement}</p>
        <a href="mailto:${data.contact.directEmail}" className="inline-block px-8 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold">
          Email Me: ${data.contact.directEmail}
        </a>
      </footer>
    </div>
  );
}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    showToast(`Copied ${activeTab.toUpperCase()} content!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = activeTab === 'github' ? 'sh' : activeTab === 'react' ? 'tsx' : activeTab === 'json' ? 'json' : 'md';
    const filename = activeTab === 'github' ? 'deploy-github-pages.sh' : `portfolio-export.${ext}`;
    const blob = new Blob([getExportContent()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Export Portfolio & GitHub Pages Deploy
              </h3>
              <p className="text-xs text-slate-400">
                GitHub Pages setup instructions, React TSX, structured JSON, or Markdown doc
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-slate-800 flex flex-wrap gap-4 text-xs font-bold bg-slate-900">
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'github'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            GitHub Pages Deploy
          </button>
          <button
            onClick={() => setActiveTab('react')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'react'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            React + Tailwind TSX
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'markdown'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Markdown Copy Suite
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'json'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Raw JSON Schema
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <code>{getExportContent()}</code>
          </pre>
        </div>

        {/* Actions Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all flex items-center gap-1.5 shadow-md"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy All Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
