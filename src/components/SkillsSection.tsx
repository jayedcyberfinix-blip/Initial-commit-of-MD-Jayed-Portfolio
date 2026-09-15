import React, { useState } from 'react';
import { Layers, CheckCircle2, Search, Info, Copy, Check, Sparkles, Code2, Server, Cpu } from 'lucide-react';
import { SkillsSectionData, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';

interface SkillsSectionProps {
  data: SkillsSectionData;
  theme: ThemePreset;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const themeConfig = themes[theme];
  const { showToast } = useToast();

  const handleCopySkills = () => {
    const text = `CORE SKILLS & EXPERTISE:\n\n${data.categories
      .map(
        (cat) =>
          `[${cat.categoryName}]\n${cat.description}\n` +
          cat.skillsList.map((s) => `• ${s.name} (${s.level}): ${s.context}`).join('\n')
      )
      .join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Skills copy copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredCategories = data.categories
    .filter((cat) => (selectedCategory === 'all' ? true : cat.categoryName === selectedCategory))
    .map((cat) => {
      if (!searchQuery.trim()) return cat;
      const filteredSkills = cat.skillsList.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.context.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...cat, skillsList: filteredSkills };
    })
    .filter((cat) => cat.skillsList.length > 0);

  const getCategoryIcon = (index: number) => {
    if (index === 0) return Code2;
    if (index === 1) return Server;
    return Cpu;
  };

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 03
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Competencies & Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Core Skills & Technical Mastery
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
              onClick={handleCopySkills}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy Skills'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">UX Architecture Rationale for Skills:</span> {data.uxLayoutNote}
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              All Categories ({data.categories.reduce((acc, c) => acc + c.skillsList.length, 0)})
            </button>
            {data.categories.map((cat) => (
              <button
                key={cat.categoryName}
                onClick={() => setSelectedCategory(cat.categoryName)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.categoryName
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {cat.categoryName} ({cat.skillsList.length})
              </button>
            ))}
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills or context..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(catIdx);
            return (
              <div
                key={category.categoryName}
                className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 shadow-md flex flex-col justify-between hover:border-slate-600 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-sky-400 border border-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {category.categoryName}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {category.skillsList.length} Core Competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills List with Context */}
                  <div className="space-y-3.5">
                    {category.skillsList.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-200">{skill.name}</span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              skill.level === 'Expert'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : skill.level === 'Advanced'
                                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Battle-Tested in Production</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
