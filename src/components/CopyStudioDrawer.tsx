import React, { useState } from 'react';
import { X, Sparkles, Wand2, RotateCcw, Check, Layers, AlertCircle, RefreshCw, User, Briefcase, FileCode2, Sliders } from 'lucide-react';
import { PortfolioData, UserProfileInput } from '../types';
import { presetProfiles } from '../data/initialData';
import { useToast } from './Toast';

interface CopyStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onUpdatePortfolioData: (data: PortfolioData) => void;
}

export const CopyStudioDrawer: React.FC<CopyStudioDrawerProps> = ({
  isOpen,
  onClose,
  portfolioData,
  onUpdatePortfolioData,
}) => {
  const [profileInput, setProfileInput] = useState<UserProfileInput>(portfolioData.profile);
  const [selectedPreset, setSelectedPreset] = useState<string>('cybersec');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile-gen' | 'direct-edit'>('profile-gen');
  const [editSection, setEditSection] = useState<'hero' | 'about' | 'skills' | 'projects' | 'services' | 'testimonials' | 'contact'>('hero');

  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleApplyPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = presetProfiles[presetKey];
    if (preset) {
      setProfileInput(preset.profile);
      showToast(`Loaded "${preset.label}" details!`, 'info');
    }
  };

  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    try {
      let updatedData: PortfolioData | null = null;
      try {
        const response = await fetch('/api/generate-portfolio-copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileInput),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            updatedData = {
              ...result.data,
              profile: profileInput,
            };
          }
        }
      } catch (networkErr) {
        console.warn('Backend API unavailable (e.g. running statically on GitHub Pages), using dynamic client synthesizer:', networkErr);
      }

      // If backend was not reached or returned non-200 (e.g. static GitHub Pages hosting), provide smart dynamic synthesis
      if (!updatedData) {
        updatedData = {
          ...portfolioData,
          profile: profileInput,
          hero: {
            ...portfolioData.hero,
            headline: `${profileInput.name} — ${profileInput.title}`,
            subheadline: `Driven by ${profileInput.skills.split(',').slice(0, 3).join(', ')}. Engineered for ${profileInput.targetAudience.toLowerCase()} with high-impact results.`,
          },
          about: {
            ...portfolioData.about,
            bioParagraph1: `I am ${profileInput.name}, a passionate technologist specializing in ${profileInput.title}. With ${profileInput.experience}, I combine deep technical expertise with rapid execution.`,
          },
        };
        onUpdatePortfolioData(updatedData);
        showToast('Updated portfolio copy with custom profile details!', 'success');
      } else {
        onUpdatePortfolioData(updatedData);
        showToast('Generated fresh high-converting portfolio copy with Gemini!', 'success');
      }
    } catch (err: any) {
      console.error('Error generating copy:', err);
      showToast(err?.message || 'Error updating copy. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col justify-between text-slate-200">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Portfolio Copy & UX Studio
                </h3>
                <p className="text-xs text-slate-400">
                  AI Conversion Copywriting Engine
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="px-6 pt-4 border-b border-slate-800 flex gap-4 text-xs font-bold bg-slate-900">
            <button
              onClick={() => setActiveTab('profile-gen')}
              className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'profile-gen'
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              AI Copy Generator
            </button>
            <button
              onClick={() => setActiveTab('direct-edit')}
              className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'direct-edit'
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Direct Text Editor
            </button>
          </div>

          {/* Drawer Body Scrollable */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'profile-gen' ? (
              <div className="space-y-5">
                {/* Industry Presets Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Quick Preset Profile Templates
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(presetProfiles).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => handleApplyPreset(key)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                          selectedPreset === key
                            ? 'bg-sky-500/10 text-sky-300 border-sky-500/30 shadow-xs'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile Form Fields */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={profileInput.name}
                        onChange={(e) => setProfileInput({ ...profileInput, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        value={profileInput.experience}
                        onChange={(e) =>
                          setProfileInput({ ...profileInput, experience: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={profileInput.title}
                      onChange={(e) => setProfileInput({ ...profileInput, title: e.target.value })}
                      placeholder="e.g. Full Stack Web Developer / UI/UX Designer"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Core Skills & Tech Stack
                    </label>
                    <textarea
                      rows={2}
                      value={profileInput.skills}
                      onChange={(e) => setProfileInput({ ...profileInput, skills: e.target.value })}
                      placeholder="e.g. React, Node.js, Tailwind CSS, PostgreSQL, Figma"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Major Projects / Best Achievements
                    </label>
                    <textarea
                      rows={2}
                      value={profileInput.projects}
                      onChange={(e) => setProfileInput({ ...profileInput, projects: e.target.value })}
                      placeholder="1-2 lines about your best work and measurable impact"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Target Audience / Clients
                    </label>
                    <input
                      type="text"
                      value={profileInput.targetAudience}
                      onChange={(e) =>
                        setProfileInput({ ...profileInput, targetAudience: e.target.value })
                      }
                      placeholder="e.g. Tech Startups, Growth Companies, Global Clients"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Tone of Voice
                    </label>
                    <input
                      type="text"
                      value={profileInput.tone}
                      onChange={(e) => setProfileInput({ ...profileInput, tone: e.target.value })}
                      placeholder="Confident, professional, modern, and accessible"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Direct Text Editor */
              <div className="space-y-4">
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {(['hero', 'about', 'skills', 'projects', 'services', 'testimonials', 'contact'] as const).map(
                    (sec) => (
                      <button
                        key={sec}
                        onClick={() => setEditSection(sec)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold capitalize whitespace-nowrap ${
                          editSection === sec
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {sec}
                      </button>
                    )
                  )}
                </div>

                {editSection === 'hero' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Headline</label>
                      <textarea
                        rows={2}
                        value={portfolioData.hero.headline}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            hero: { ...portfolioData.hero, headline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Subheadline</label>
                      <textarea
                        rows={3}
                        value={portfolioData.hero.subheadline}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            hero: { ...portfolioData.hero, subheadline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA</label>
                        <input
                          type="text"
                          value={portfolioData.hero.primaryCta}
                          onChange={(e) =>
                            onUpdatePortfolioData({
                              ...portfolioData,
                              hero: { ...portfolioData.hero, primaryCta: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA</label>
                        <input
                          type="text"
                          value={portfolioData.hero.secondaryCta}
                          onChange={(e) =>
                            onUpdatePortfolioData({
                              ...portfolioData,
                              hero: { ...portfolioData.hero, secondaryCta: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editSection === 'about' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Bio Paragraph 1</label>
                      <textarea
                        rows={4}
                        value={portfolioData.about.bioParagraph1}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            about: { ...portfolioData.about, bioParagraph1: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Bio Paragraph 2</label>
                      <textarea
                        rows={4}
                        value={portfolioData.about.bioParagraph2}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            about: { ...portfolioData.about, bioParagraph2: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {editSection === 'contact' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Closing Hook</label>
                      <textarea
                        rows={3}
                        value={portfolioData.contact.closingStatement}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, closingStatement: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Direct Email</label>
                      <input
                        type="email"
                        value={portfolioData.contact.directEmail}
                        onChange={(e) =>
                          onUpdatePortfolioData({
                            ...portfolioData,
                            contact: { ...portfolioData.contact, directEmail: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {['skills', 'projects', 'services', 'testimonials'].includes(editSection) && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    <p className="font-semibold text-white mb-1">
                      Multi-Item Section: {editSection.toUpperCase()}
                    </p>
                    <p>
                      Use the "AI Copy Generator" to generate tailored items for your stack, or view
                      the Copy & UX Spec tab to copy and paste modular card items.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Close
            </button>

            {activeTab === 'profile-gen' ? (
              <button
                onClick={handleGenerateCopy}
                disabled={isGenerating}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:opacity-50 transition-all flex items-center gap-2 shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                    <span>Synthesizing Copy...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>Generate Copy Suite</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  showToast('Edits saved to live preview!', 'success');
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all"
              >
                Apply Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
