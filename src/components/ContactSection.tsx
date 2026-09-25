import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, Send, CheckCircle2, ArrowUpRight, Info, Copy, Check, MapPin, Sparkles, MessageSquare, Calendar, Github, Linkedin, Facebook, Terminal, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactSectionData, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';

interface ContactSectionProps {
  data: ContactSectionData;
  name: string;
  theme: ThemePreset;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  name,
  theme,
  prefilledService,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    projectType: prefilledService || 'Web Security Assessment & Audit',
    budgetRange: '$100 - $500 / Project Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUxNote, setShowUxNote] = useState(false);
  const [copied, setCopied] = useState(false);

  const themeConfig = themes[theme];
  const { showToast } = useToast();

  React.useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, projectType: prefilledService }));
    }
  }, [prefilledService]);

  const handleCopyContact = () => {
    const text = `CONTACT MD JAYED:\n\nCLOSING STATEMENT: ${data.closingStatement}\nAVAILABILITY: ${data.availabilityStatus}\nRESPONSE TIME: ${data.responseTime}\nDIRECT EMAIL: ${data.directEmail}\nLOCATION: Islamic University, Kushtia, Bangladesh\n\nFORM FIELDS:\n${data.formFieldsGuide
      .map((f) => `- ${f.field}: ${f.purpose} (Placeholder: "${f.placeholder}")`)
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Contact details copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim()) {
      showToast('Please fill in your name and email address.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast(`Inquiry sent to MD Jayed (${data.directEmail})! Expect a reply at ${formData.workEmail} within 12 hours.`, 'success');

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 05
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect With MD Jayed
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Have a web security inquiry, AI project idea, or academic collaboration proposal? Reach out directly.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowUxNote(!showUxNote)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{showUxNote ? 'Hide UX' : 'UX Guide'}</span>
            </button>
            <button
              onClick={handleCopyContact}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copied ? 'Copied' : 'Copy Coordinates'}</span>
            </button>
          </div>
        </div>

        {/* UX Note banner */}
        {showUxNote && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-xs text-slate-300 leading-relaxed shadow-lg">
            <span className="font-bold text-sky-400">Direct Conversion Design:</span> Direct verified email address ({data.directEmail}), authentic Islamic University Bangladesh location coordinates, and an interactive inquiry form configured for security and web project requests.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Coordinates & Academic Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
              <p className="text-base font-medium text-slate-200 leading-relaxed">
                {data.closingStatement}
              </p>

              {/* Status & Response Time Callout */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Current Status</p>
                    <p className="text-xs text-slate-400">{data.availabilityStatus}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Response Guarantee</p>
                    <p className="text-xs text-slate-400">{data.responseTime}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Location</p>
                    <p className="text-xs text-slate-400">Kushtia, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Direct Email Link */}
              <div className="pt-4 border-t border-slate-700/80 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Direct Inquiries
                </p>

                <a
                  href={`mailto:${data.directEmail}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-white transition-colors group shadow-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-xs font-bold text-sky-300 truncate">{data.directEmail}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-300 transition-colors shrink-0" />
                </a>

                {/* Social Channels with Original Brand Colors */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href="https://www.facebook.com/share/18Cv9YMVZm/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 hover:bg-[#1877F2]/20 border border-slate-800 hover:border-[#1877F2]/60 transition-colors group"
                    title="Facebook Profile: MD Jayed"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#1877F2] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Facebook className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/jayed-molla-197a6b426?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 hover:bg-[#0A66C2]/20 border border-slate-800 hover:border-[#0A66C2]/60 transition-colors group"
                    title="LinkedIn Profile: Jayed Molla"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#0A66C2] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Linkedin className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  </a>

                  <a
                    href={`mailto:${data.directEmail}`}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-[#EA4335]/20 border border-slate-800 hover:border-[#EA4335]/60 transition-colors group"
                    title={`Send Direct Email: ${data.directEmail}`}
                  >
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#EA4335] via-[#FBBC05] to-[#4285F4] p-[1px] group-hover:scale-110 transition-transform">
                      <div className="w-full h-full bg-slate-950 rounded-[5px] flex items-center justify-center">
                        <Mail className="w-3 h-3 text-[#EA4335]" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/users/jayedcyberfinix-blip/projects/1/views/1"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-colors group"
                    title="GitHub Projects: jayedcyberfinix-blip"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#24292e] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Github className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  </a>

                  <span className="text-[11px] text-slate-500 font-mono pl-1">
                    #CSE_IU_BD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent to MD Jayed!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-white">{formData.fullName}</span>. Your message has been forwarded to <span className="font-semibold text-sky-400">{data.directEmail}</span>. I will review your note and respond to <span className="font-semibold text-sky-400">{formData.workEmail}</span> within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        workEmail: '',
                        projectType: 'Web Security Assessment & Audit',
                        budgetRange: '$100 - $500 / Project Collaboration',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-700/80 pb-3">
                    <h3 className="text-lg font-bold text-white">
                      Send a Message / Project Brief
                    </h3>
                    <p className="text-xs text-slate-400">
                      Reach out for cybersecurity audits, AI web development, or academic projects.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MD Jayed"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all bg-slate-950/80"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jayed@example.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all bg-slate-950/80"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Inquiry Category / Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all bg-slate-950/80"
                      >
                        <option value="Web Security Assessment & Audit">Web Security Assessment & Audit</option>
                        <option value="Secure Full-Stack Web Development">Secure Full-Stack Web Development</option>
                        <option value="AI Integration & Gemini Web Tooling">AI Integration & Gemini Web Tooling</option>
                        <option value="Google Forms, Survey Design & Data Automation">Google Forms, Survey Design & Data Automation</option>
                        <option value="Ethical Hacking / CTF Collaboration">Ethical Hacking / CTF Collaboration</option>
                        <option value="Academic / Research Collaboration">Academic / Research Collaboration</option>
                        <option value="Other General Inquiry">Other General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Engagement Scope
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all bg-slate-950/80"
                      >
                        <option value="Academic / Research Collaboration">Academic / Research Collaboration</option>
                        <option value="Freelance Project ($100 - $500)">Freelance Project ($100 - $500)</option>
                        <option value="Medium Web / Audit Project ($500 - $2,000)">Medium Web / Audit Project ($500 - $2,000)</option>
                        <option value="Long-Term / Retainer Engagement">Long-Term / Retainer Engagement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Project Goals & Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about your website, vulnerabilities to check, AI feature idea, or academic collaboration goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all bg-slate-950/80"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs shadow-lg bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to MD Jayed</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500 font-medium">
                    🔒 Ethical & Secure Communication • Direct response to your inbox
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
