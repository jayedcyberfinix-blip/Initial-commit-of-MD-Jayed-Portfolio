import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Layout, Compass, ShieldCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PortfolioData } from '../types';
import { useToast } from './Toast';

interface UXSpecViewProps {
  data: PortfolioData;
}

export const UXSpecView: React.FC<UXSpecViewProps> = ({ data }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedFull, setCopiedFull] = useState(false);
  const { showToast } = useToast();

  const handleCopySection = (sectionName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    showToast(`Copied ${sectionName} copy & specs to clipboard!`, 'success');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const generateFullMarkdown = () => {
    return `# HIGH-CONVERTING PERSONAL PORTFOLIO COPY & UX SPECIFICATION
Target Audience: ${data.profile.targetAudience}
Tone: ${data.profile.tone}
Author: ${data.profile.name} - ${data.profile.title}

---

## 1. HERO SECTION
**Headline:** ${data.hero.headline}
**Sub-Headline:** ${data.hero.subheadline}
**Primary CTA:** ${data.hero.primaryCta}
**Secondary CTA:** ${data.hero.secondaryCta}
**Trust Badge:** ${data.hero.badge}
**UX Layout Strategy:** ${data.hero.uxLayoutNote}

---

## 2. ABOUT ME SECTION
**Paragraph 1:** ${data.about.bioParagraph1}
**Paragraph 2:** ${data.about.bioParagraph2}
**Key Facts / Stats:**
${data.about.stats.map((s) => `- ${s.label}: ${s.value} (${s.subtext})`).join('\n')}
**UX Layout Strategy:** ${data.about.uxLayoutNote}

---

## 3. CORE SKILLS & EXPERTISE SECTION
**Intro:** ${data.skills.intro}
${data.skills.categories
  .map(
    (c) =>
      `### ${c.categoryName}\n${c.description}\n` +
      c.skillsList.map((s) => `- **${s.name}** [${s.level}]: ${s.context}`).join('\n')
  )
  .join('\n\n')}
**UX Layout Strategy:** ${data.skills.uxLayoutNote}

---

## 4. FEATURED PROJECTS SECTION
**Intro:** ${data.projects.intro}
${data.projects.projectList
  .map(
    (p) =>
      `### ${p.title} (${p.category})\n- **Tagline:** ${p.tagline}\n- **Description:** ${p.description}\n- **Tools Used:** ${p.tools.join(
        ', '
      )}\n- **Measurable Business Impact:** ${p.impact}`
  )
  .join('\n\n')}
**UX Layout Strategy:** ${data.projects.uxLayoutNote}

---

## 5. SERVICES OFFERED
**Intro:** ${data.services.intro}
${data.services.serviceList
  .map(
    (s) =>
      `### ${s.title}\n**Value Proposition:** ${s.valueProposition}\n**Deliverables:**\n${s.deliverables
        .map((d) => `  - ${d}`)
        .join('\n')}\n**Ideal For:** ${s.idealFor}`
  )
  .join('\n\n')}
**UX Layout Strategy:** ${data.services.uxLayoutNote}

---

## 6. TESTIMONIALS & SOCIAL PROOF
**Intro:** ${data.testimonials.intro}
${data.testimonials.quotes
  .map(
    (q) =>
      `> "${q.quote}"\n> — **${q.author}**, ${q.role} at ${q.company} (${q.rating}/5 Stars)`
  )
  .join('\n\n')}
**UX Layout Strategy:** ${data.testimonials.uxLayoutNote}

---

## 7. CONTACT ME SECTION
**Closing Statement:** ${data.contact.closingStatement}
**Availability:** ${data.contact.availabilityStatus}
**Response Guarantee:** ${data.contact.responseTime}
**Direct Email:** ${data.contact.directEmail}
**Form Layout Structure:**
${data.contact.formFieldsGuide
  .map((f) => `- **${f.field}**: ${f.purpose} (Placeholder: "${f.placeholder}")`)
  .join('\n')}
**UX Layout Strategy:** ${data.contact.uxLayoutNote}
`;
  };

  const handleCopyFullDoc = () => {
    navigator.clipboard.writeText(generateFullMarkdown());
    setCopiedFull(true);
    showToast('Full Markdown Spec copied to clipboard!', 'success');
    setTimeout(() => setCopiedFull(false), 2500);
  };

  const sections = [
    {
      id: 'hero',
      num: '01',
      title: 'Hero Section: First 3-Second Conversion Hook',
      uxAdvice: data.hero.uxLayoutNote,
      copyContent: `HEADLINE: ${data.hero.headline}\nSUB-HEADLINE: ${data.hero.subheadline}\nPRIMARY CTA: ${data.hero.primaryCta}\nSECONDARY CTA: ${data.hero.secondaryCta}\nTRUST BADGE: ${data.hero.badge}`,
      details: (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1">
              Headline Copy
            </span>
            <p className="text-sm font-extrabold text-white leading-snug">
              {data.hero.headline}
            </p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80">
            <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1">
              2-Sentence Sub-Headline
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.hero.subheadline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Primary CTA Label
              </span>
              <span className="text-xs font-bold text-sky-400">{data.hero.primaryCta}</span>
            </div>
            <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Secondary CTA Label
              </span>
              <span className="text-xs font-bold text-white">{data.hero.secondaryCta}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'about',
      num: '02',
      title: 'About Me: Storytelling, Proof & Problem Solving',
      uxAdvice: data.about.uxLayoutNote,
      copyContent: `BIO 1: ${data.about.bioParagraph1}\n\nBIO 2: ${data.about.bioParagraph2}\n\nSTATS:\n${data.about.stats
        .map((s) => `${s.label}: ${s.value} (${s.subtext})`)
        .join('\n')}`,
      details: (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-2">
            <span className="text-[10px] uppercase font-bold text-sky-400 block">
              2-Paragraph Narrative Bio
            </span>
            <p className="text-slate-300 leading-relaxed">{data.about.bioParagraph1}</p>
            <p className="text-slate-300 leading-relaxed">{data.about.bioParagraph2}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.about.stats.map((s, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/80">
                <span className="text-base font-extrabold text-sky-400">{s.value}</span>
                <p className="text-[11px] font-bold text-white">{s.label}</p>
                <p className="text-[10px] text-slate-400">{s.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'skills',
      num: '03',
      title: 'Core Skills & Expertise: Categorized Competency Matrix',
      uxAdvice: data.skills.uxLayoutNote,
      copyContent: `${data.skills.categories
        .map(
          (c) =>
            `[${c.categoryName}]\n` +
            c.skillsList.map((s) => `• ${s.name} (${s.level}): ${s.context}`).join('\n')
        )
        .join('\n\n')}`,
      details: (
        <div className="space-y-3 text-xs">
          {data.skills.categories.map((c, idx) => (
            <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{c.categoryName}</span>
                <span className="text-[10px] text-sky-400">{c.skillsList.length} skills</span>
              </div>
              <p className="text-[11px] text-slate-400">{c.description}</p>
              <div className="space-y-1.5 pt-1">
                {c.skillsList.map((s, sIdx) => (
                  <div key={sIdx} className="text-[11px] flex items-start gap-1.5 text-slate-300">
                    <span className="text-sky-400 font-bold">•</span>
                    <div>
                      <strong className="text-white">{s.name}</strong>{' '}
                      <span className="text-sky-400 text-[10px]">({s.level})</span>: {s.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'projects',
      num: '04',
      title: 'Featured Projects: Case Studies with Measurable ROI',
      uxAdvice: data.projects.uxLayoutNote,
      copyContent: data.projects.projectList
        .map(
          (p) =>
            `TITLE: ${p.title} (${p.category})\nTAGLINE: ${p.tagline}\nDESC: ${p.description}\nTOOLS: ${p.tools.join(
              ', '
            )}\nIMPACT: ${p.impact}`
        )
        .join('\n\n'),
      details: (
        <div className="space-y-3 text-xs">
          {data.projects.projectList.map((p, idx) => (
            <div key={idx} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{p.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {p.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">{p.description}</p>
              <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-300 font-medium text-[11px]">
                <strong className="text-sky-400">Impact: </strong>
                {p.impact}
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tools.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'services',
      num: '05',
      title: 'Services Offered: 2-Sentence Value Props & Deliverables',
      uxAdvice: data.services.uxLayoutNote,
      copyContent: data.services.serviceList
        .map(
          (s) =>
            `SERVICE: ${s.title}\nVALUE PROP: ${s.valueProposition}\nDELIVERABLES: ${s.deliverables.join(
              ', '
            )}\nIDEAL FOR: ${s.idealFor}`
        )
        .join('\n\n'),
      details: (
        <div className="space-y-3 text-xs">
          {data.services.serviceList.map((s, idx) => (
            <div key={idx} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-2">
              <span className="font-bold text-white text-xs block">{s.title}</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">{s.valueProposition}</p>
              <div className="text-[10px] text-slate-400 space-y-0.5 pt-1">
                <span className="font-bold text-sky-400 uppercase tracking-wider block">Deliverables:</span>
                {s.deliverables.map((d, dIdx) => (
                  <div key={dIdx}>✓ {d}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'testimonials',
      num: '06',
      title: 'Testimonials / Social Proof: Verified Quotes & Feedback Trigger',
      uxAdvice: data.testimonials.uxLayoutNote,
      copyContent: data.testimonials.quotes
        .map(
          (q) =>
            `"${q.quote}" - ${q.author}, ${q.role} at ${q.company} (${q.rating}/5 Stars)`
        )
        .join('\n\n'),
      details: (
        <div className="space-y-3 text-xs">
          {data.testimonials.quotes.map((q, idx) => (
            <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-1.5">
              <p className="text-[11px] text-slate-300 italic">"{q.quote}"</p>
              <div className="text-[10px] text-sky-400 font-bold">
                — {q.author}, <span className="text-slate-400 font-normal">{q.role} at {q.company}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      num: '07',
      title: 'Contact Me: Closing Hook, Response SLA & Form Layout',
      uxAdvice: data.contact.uxLayoutNote,
      copyContent: `CLOSING STATEMENT: ${data.contact.closingStatement}\nAVAILABILITY: ${data.contact.availabilityStatus}\nSLA: ${data.contact.responseTime}\nEMAIL: ${data.contact.directEmail}\n\nFORM FIELDS:\n${data.contact.formFieldsGuide
        .map((f) => `- ${f.field}: ${f.purpose} (Placeholder: "${f.placeholder}")`)
        .join('\n')}`,
      details: (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-sky-400 block">
              Persuasive Closing Statement
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {data.contact.closingStatement}
            </p>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-sky-400 block">
              Contact Form Layout Architecture
            </span>
            <div className="space-y-1">
              {data.contact.formFieldsGuide.map((f, idx) => (
                <div key={idx} className="text-[11px] text-slate-300">
                  <strong className="text-white">{f.field}:</strong> {f.purpose}{' '}
                  <span className="text-slate-500 font-mono">({f.placeholder})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-md shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Conversion Copywriting & UX Architecture Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Section-by-Section Copy & UX Blueprints
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Structured copy and visual layout specifications ready for production deployment, developer handoff, or content iteration.
          </p>
        </div>

        <button
          onClick={handleCopyFullDoc}
          className="px-5 py-3 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
        >
          {copiedFull ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedFull ? 'Full Markdown Copied' : 'Copy Full Markdown Spec'}</span>
        </button>
      </div>

      {/* Conversion Blueprint Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
            Target Audience Persona
          </span>
          <p className="text-xs font-semibold text-white">
            {data.conversionStrategy.targetPersona}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
            Primary Conversion Goal
          </span>
          <p className="text-xs font-semibold text-sky-400">
            {data.conversionStrategy.primaryConversionGoal}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
            Voice & Tone Architecture
          </span>
          <p className="text-xs font-semibold text-slate-300">
            {data.profile.tone}
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-8">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="p-6 sm:p-8 rounded-3xl bg-slate-800/40 border border-slate-700/80 shadow-lg space-y-6"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-xs font-bold flex items-center justify-center">
                  {sec.num}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {sec.title}
                </h2>
              </div>

              <button
                onClick={() => handleCopySection(sec.title, sec.copyContent)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700 hover:border-slate-600 px-3.5 py-1.5 rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
              >
                {copiedSection === sec.title ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span>{copiedSection === sec.title ? 'Copied' : 'Copy Section Copy'}</span>
              </button>
            </div>

            {/* UX Strategy & Rationale Bar */}
            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-sky-400">
                <Layout className="w-4 h-4 text-sky-400" />
                <span>UX/UI Layout Strategy & Wireframe Guidance:</span>
              </div>
              <p className="leading-relaxed">{sec.uxAdvice}</p>
            </div>

            {/* Section Copy Details Display */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                Structured Copy Elements
              </span>
              {sec.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
