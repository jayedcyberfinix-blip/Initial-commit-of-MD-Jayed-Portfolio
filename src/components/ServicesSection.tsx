import React, { useState } from 'react';
import { Check, CheckCircle2, ArrowRight, Sparkles, Info, Copy, Briefcase, Zap, Bot, ShieldCheck, ClipboardList } from 'lucide-react';
import { ServicesSectionData, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';

interface ServicesSectionProps {
  data: ServicesSectionData;
  theme: ThemePreset;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  data,
  theme,
  onSelectServiceForInquiry,
}) => {
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const themeConfig = themes[theme];
  const { showToast } = useToast();

  const handleCopyServices = () => {
    const text = `SERVICES OFFERED:\n\n${data.serviceList
      .map(
        (s) =>
          `SERVICE: ${s.title}\nVALUE PROPOSITION: ${s.valueProposition}\nDELIVERABLES:\n${s.deliverables
            .map((d) => `  - ${d}`)
            .join('\n')}\nIDEAL FOR: ${s.idealFor}`
      )
      .join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Services copy copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const getServiceIcon = (index: number) => {
    if (index === 0) return Briefcase;
    if (index === 1) return Zap;
    if (index === 2) return Bot;
    if (index === 3) return ClipboardList;
    return ShieldCheck;
  };

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 05
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Engagements & Value
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Specialized Services & Value
            </h2>
            <p className="mt-3 text-slate-400 text-base">{data.intro}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowUxNote(!showUxNote)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{showUxNote ? 'Hide UX Rationale' : 'UX Layout Advice'}</span>
            </button>
            <button
              onClick={handleCopyServices}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy Services'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">UX Architecture Rationale for Services:</span> {data.uxLayoutNote}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.serviceList.map((service, idx) => {
            const Icon = getServiceIcon(idx);
            return (
              <div
                key={service.title}
                className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-lg hover:border-slate-600 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {service.title}
                    </h3>
                    {/* 2-Sentence Value Proposition */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {service.valueProposition}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Key Deliverables Included
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliv, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For Badge */}
                  <div className="pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                      <span className="font-bold text-slate-200">Ideal For: </span>
                      {service.idealFor}
                    </div>
                  </div>
                </div>

                {/* Direct Inquiry CTA button */}
                <div className="pt-4 border-t border-slate-700/80">
                  <button
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/20"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
