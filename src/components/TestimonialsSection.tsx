import React, { useState } from 'react';
import { Quote, Star, Plus, ShieldCheck, Info, Copy, Check, MessageSquare, GraduationCap, Send, User, Sparkles } from 'lucide-react';
import { TestimonialsSectionData, TestimonialItem, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';

interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
  theme: ThemePreset;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  data,
  theme,
}) => {
  const [quotesList, setQuotesList] = useState<TestimonialItem[]>(data.quotes);
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newFeedback, setNewFeedback] = useState({
    author: '',
    role: '',
    company: 'Tech Community / Campus Peer',
    quote: '',
    projectContext: 'Security / Web Project Collaboration',
    rating: 5,
  });

  const themeConfig = themes[theme];
  const { showToast } = useToast();

  const handleCopyTestimonials = () => {
    const text = `ENDORSEMENTS & COLLABORATOR FEEDBACK:\n\n${quotesList
      .map(
        (q, idx) =>
          `#${idx + 1} - "${q.quote}"\n- ${q.author}, ${q.role} at ${q.company} (Project: ${q.projectContext || 'General'})\n`
      )
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Endorsements copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.author.trim() || !newFeedback.quote.trim()) {
      showToast('Please provide your name and your feedback message.', 'error');
      return;
    }

    const item: TestimonialItem = {
      author: newFeedback.author.trim(),
      role: newFeedback.role.trim() || 'Peer / Collaborator',
      company: newFeedback.company.trim() || 'Tech Community',
      quote: newFeedback.quote.trim(),
      projectContext: newFeedback.projectContext.trim(),
      rating: newFeedback.rating,
      avatarUrl: '',
    };

    setQuotesList([item, ...quotesList]);
    setIsModalOpen(false);
    setNewFeedback({
      author: '',
      role: '',
      company: 'Tech Community / Campus Peer',
      quote: '',
      projectContext: 'Security / Web Project Collaboration',
      rating: 5,
    });
    showToast('Your endorsement has been added to MD Jayed’s profile!', 'success');
  };

  return (
    <section id="feedback" className="py-20 md:py-28 bg-[#0F172A]/80 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 06
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Peer Feedback & Endorsements
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Collaborator & Peer Endorsements
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Authentic feedback from fellow CSE students, academic study groups, and project collaborators.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Leave Endorsement</span>
            </button>
            <button
              onClick={() => setShowUxNote(!showUxNote)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{showUxNote ? 'Hide UX' : 'UX Advice'}</span>
            </button>
            <button
              onClick={handleCopyTestimonials}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">Authentic Proof Philosophy:</span> We have removed fake corporate testimonials. Instead, this section displays authentic endorsements from peers at Islamic University, project partners, and open-source contributors, along with an interactive form for visitors to leave feedback.
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotesList.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 p-6 sm:p-7 rounded-2xl border border-slate-700 shadow-xl hover:border-slate-600 transition-all flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                {/* Rating & Context Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  {item.projectContext && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-sky-400 border border-slate-700">
                      {item.projectContext}
                    </span>
                  )}
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 mt-5 border-t border-slate-700/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {item.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2) || 'IU'}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.author}</h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.role} • <span className="text-sky-400">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Endorsement Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">Leave an Endorsement for MD Jayed</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddFeedback} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuzur Rahman"
                    value={newFeedback.author}
                    onChange={(e) => setNewFeedback({ ...newFeedback, author: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. CSE Student / Developer"
                      value={newFeedback.role}
                      onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Affiliation / University</label>
                    <input
                      type="text"
                      placeholder="e.g. University / Tech Org"
                      value={newFeedback.company}
                      onChange={(e) => setNewFeedback({ ...newFeedback, company: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Project / Context</label>
                  <input
                    type="text"
                    placeholder="e.g. Campus Resource Portal / Web Security Audit"
                    value={newFeedback.projectContext}
                    onChange={(e) => setNewFeedback({ ...newFeedback, projectContext: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Endorsement / Note *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your experience working with MD Jayed or your thoughts on his skills & projects..."
                    value={newFeedback.quote}
                    onChange={(e) => setNewFeedback({ ...newFeedback, quote: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Endorsement</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
