import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Cpu,
  Layers,
  Workflow,
  MessageSquare,
  Database,
  FileSpreadsheet,
  ArrowRight,
  Check,
  Copy,
  RefreshCw,
  Zap,
  Shield,
  Code2,
  Terminal,
  Play,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  Maximize2,
  Eye,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { SkillsSectionData, ThemePreset } from '../types';
import { themes } from '../utils/theme';
import { useToast } from './Toast';
import workflowScreenshot from '../assets/images/ai_agent_workflow_1790363585290.jpg';

interface SkillsSectionProps {
  data: SkillsSectionData;
  theme: ThemePreset;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data, theme }) => {
  const [activeTab, setActiveTab] = useState<'ai-automation' | 'cybersecurity' | 'web-dev'>('ai-automation');
  const [chatbotViewMode, setChatbotViewMode] = useState<'screenshot' | 'interactive'>('screenshot');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testInput, setTestInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; toolUsed?: string; modelUsed?: string }>>([
    {
      sender: 'bot',
      text: 'Hello! I am MD Jayed’s autonomous AI Agent. I can check product information, log new orders, or look up your order status from Google Sheets.',
      modelUsed: 'OpenAI Chat Model',
    },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const { showToast } = useToast();

  const handleCopy = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSimulateChat = (userQuery?: string) => {
    const query = userQuery || testInput.trim();
    if (!query || isSimulating) return;

    setTestInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setIsSimulating(true);

    setTimeout(() => {
      let botResponse = '';
      let toolName = '';
      let model = 'OpenAI Chat Model';
      const lower = query.toLowerCase();

      if (lower.includes('product') || lower.includes('notebook') || lower.includes('khata') || lower.includes('list') || lower.includes('item')) {
        toolName = 'Product information (Google Sheets: read sheet)';
        botResponse = 'I queried our Google Sheet product catalog: We currently have Premium IU Spiral Notebooks ($3.50), CSE Lab Record Books ($4.00), and Study Planners ($2.80) in stock.';
      } else if (lower.includes('order') && (lower.includes('place') || lower.includes('buy') || lower.includes('book') || lower.includes('want'))) {
        toolName = 'Order list (Google Sheets: append sheet)';
        botResponse = 'Order received! I have appended a new row to the Google Sheets "Order list" with ID #ORD-9842. A confirmation notification has been triggered.';
      } else if (lower.includes('status') || lower.includes('check') || lower.includes('where') || lower.includes('#')) {
        toolName = 'Order list: Get row(s) in Google Sheets';
        botResponse = 'Lookup complete from Google Sheets! Order #IU-9842 is currently marked as "Processing & Ready for Campus Handover" at Islamic University.';
      } else {
        model = 'Google Gemini Chat Model (Fallback)';
        botResponse = `Thanks for your inquiry! As an AI agent with Simple Memory and Google Sheets connectivity, I can help you browse products, create new orders, or check order deliveries.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          toolUsed: toolName,
          modelUsed: model,
        },
      ]);
      setIsSimulating(false);
    }, 900);
  };

  const aiChatbotDetails = `PROJECT 1: AI Chatbot (Autonomous Agent)
Category: AI Automation & Workflow Engineering (Beginner Level)
Author: MD Jayed (Islamic University, Bangladesh)
Architecture:
- Trigger: When chat message received (Web Chat / API)
- Orchestration: n8n AI Agent Node (LangChain framework)
- Primary Model: OpenAI Chat Model (GPT-4o)
- Fallback Model: Google Gemini Chat Model
- Memory: Simple Memory (Conversational Buffer)
- Connected Tools (Google Sheets):
  1. Product information (read: sheet)
  2. Order list (append: sheet)
  3. Order status lookup (read: sheet)
Impact: 100% automated customer order processing and zero-code catalog synchronization.`;

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Section 03
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Skills & Technical Expertise
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Skills & AI Automation</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold tracking-normal">
                Hands-on Workflows
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-base">
              My technical expertise spans practical <strong className="text-sky-300">AI workflow automation</strong>, offensive & defensive cybersecurity tools, and modern full-stack web engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(aiChatbotDetails, 'AI Chatbot Project & Skills Spec', 'all-skills')}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              {copiedKey === 'all-skills' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'all-skills' ? 'Copied Details!' : 'Copy Skills & Project'}</span>
            </button>
          </div>
        </div>

        {/* Skill Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('ai-automation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ai-automation'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Automation (Beginner Level)</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'ai-automation' ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-sky-500/20 text-sky-400'}`}>
              Featured
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cybersecurity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cybersecurity'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Cybersecurity & Ethical Hacking</span>
          </button>

          <button
            onClick={() => setActiveTab('web-dev')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'web-dev'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Full-Stack Web Development</span>
          </button>
        </div>

        {/* TAB 1: AI AUTOMATION (BEGINNER LEVEL) */}
        {activeTab === 'ai-automation' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Skill Overview Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-sky-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      Skill Category
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Beginner Level AI Automation
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    AI Automation & Workflow Engineering
                  </h3>
                  <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                    Focused on building reliable, autonomous intelligent workflows using <strong className="text-white">n8n</strong> and <strong className="text-white">LangChain agents</strong>. Specializing in multi-model failover architectures (OpenAI + Google Gemini), conversational context persistence, and real-time spreadsheet integrations via Google Sheets tools.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCopy(aiChatbotDetails, 'AI Chatbot Details', 'chatbot-quick-copy')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-all shadow-xs"
                  >
                    {copiedKey === 'chatbot-quick-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{copiedKey === 'chatbot-quick-copy' ? 'Copied' : 'Copy Project Spec'}</span>
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-extrabold text-slate-950 transition-all shadow-xs"
                  >
                    <span>Request AI Automation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Core Competency Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">n8n Agent Orchestration</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Constructing event-driven visual agent graphs triggered by webhooks and interactive chat interfaces.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Multi-Model Fallback</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Primary OpenAI GPT model routing with automatic failover to Google Gemini for zero-downtime responses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Simple Memory Persistence</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Maintaining multi-turn conversational context so the AI retains customer details and cart state seamlessly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Google Sheets Tool Calling</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Equipping the agent with tools to read inventory catalogs, log sales rows, and query order delivery statuses.
                  </p>
                </div>
              </div>
            </div>

            {/* PROJECT 1 SHOWCASE: AI CHATBOT */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-sky-500 text-slate-950">
                      Project 01
                    </span>
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Showcase Project
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    AI Chatbot (Autonomous Support & Order Agent)
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                    Full n8n workflow implementation with multi-model failover reasoning (OpenAI + Google Gemini) and Google Sheets database tools.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* View Switcher between Screenshot and Interactive */}
                  <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1">
                    <button
                      onClick={() => setChatbotViewMode('screenshot')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        chatbotViewMode === 'screenshot'
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Workflow Blueprint Screenshot</span>
                    </button>
                    <button
                      onClick={() => setChatbotViewMode('interactive')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        chatbotViewMode === 'interactive'
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Interactive Simulator</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    n8n Workflow Active
                  </span>
                </div>
              </div>

              {/* VIEW 1: OFFICIAL WORKFLOW SCREENSHOT */}
              {chatbotViewMode === 'screenshot' ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Official n8n AI Agent Workflow Screenshot
                      </span>
                    </div>
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Full Resolution</span>
                    </button>
                  </div>

                  {/* Screenshot Display Container */}
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="group relative rounded-3xl bg-slate-900/90 border-2 border-slate-700 hover:border-sky-400 overflow-hidden cursor-pointer shadow-2xl transition-all"
                  >
                    <div className="relative aspect-video sm:aspect-21/9 bg-[#0d1424] flex items-center justify-center overflow-hidden">
                      <img
                        src={workflowScreenshot}
                        alt="n8n AI Agent Chatbot Workflow Screenshot"
                        className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = '/ai-agent-workflow.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border border-sky-400/60 text-white text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <Maximize2 className="w-4 h-4 text-sky-400" />
                          <span>Click to Zoom & View Full Resolution</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">n8n Canvas Workflow Blueprint</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                            Authentic Student Build
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Shows the complete agent graph: Trigger, AI Agent node, OpenAI & Gemini models, Simple Memory, and Google Sheets CRUD tools.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setChatbotViewMode('interactive');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-xs"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Test in Live Simulator</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Node Breakdown Badges according to the image */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                        1. Trigger
                      </span>
                      <p className="text-xs font-bold text-white">Chat Received</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Webhook / Chat</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                        2. Orchestrator
                      </span>
                      <p className="text-xs font-bold text-white">AI Agent</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">LangChain Router</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        3. Primary LLM
                      </span>
                      <p className="text-xs font-bold text-white">OpenAI Chat</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">GPT-4o Model</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block mb-1">
                        4. Fallback LLM
                      </span>
                      <p className="text-xs font-bold text-white">Google Gemini</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Automatic Failover</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                        5. Memory
                      </span>
                      <p className="text-xs font-bold text-white">Simple Memory</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Context Buffer</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                        6. Data Tools
                      </span>
                      <p className="text-xs font-bold text-white">Google Sheets</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Read/Append/Query</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW 2: INTERACTIVE NODE CANVAS & LIVE SIMULATOR */
                <div className="space-y-8 animate-fadeIn">
                  {/* ARCHITECTURE WORKFLOW CANVAS (VISUAL REPRESENTATION FROM USER SCREENSHOT) */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Visual Agent Architecture (n8n Workflow Canvas)
                        </span>
                      </div>
                      <button
                        onClick={() => setChatbotViewMode('screenshot')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                        <span>View Original Screenshot</span>
                      </button>
                    </div>

                    {/* n8n Interactive Canvas Simulation Container */}
                    <div className="rounded-2xl bg-[#0B1120] border border-slate-800/90 p-6 sm:p-8 relative overflow-hidden shadow-inner">
                      {/* Subtle Grid Dot Pattern like n8n Canvas */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Flow Layout */}
                      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8">
                        {/* Trigger Node */}
                        <div className="flex flex-col items-center group">
                          <div className="relative p-4 sm:p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/60 shadow-lg shadow-amber-500/10 text-center w-52 hover:border-amber-400 transition-all">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-extrabold text-white block">
                              When chat message received
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              Chat Trigger • Webhook
                            </span>
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-900 hidden xl:block" />
                          </div>
                          <span className="text-[10px] font-bold text-amber-400/90 mt-2 uppercase tracking-wider">
                            Entry Trigger
                          </span>
                        </div>

                        {/* Animated Connection Arrow / Pulse */}
                        <div className="hidden xl:flex flex-col items-center justify-center">
                          <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 via-sky-400 to-sky-500 relative">
                            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 border-t-2 border-r-2 border-sky-400 rotate-45" />
                          </div>
                          <span className="text-[9px] text-slate-500 mt-1 font-mono">Payload</span>
                        </div>

                        {/* Central Brain: AI Agent Node */}
                        <div className="flex flex-col items-center">
                          <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-900 border-2 border-sky-400 shadow-xl shadow-sky-500/20 text-center w-64 hover:border-sky-300 transition-all">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-2.5">
                              <Bot className="w-6 h-6 animate-pulse" />
                            </div>
                            <span className="text-base font-black text-white block tracking-tight">
                              AI Agent
                            </span>
                            <span className="text-[11px] text-sky-400 font-medium block">
                              LangChain Orchestrator
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              Multi-model Reasoning & Tool Dispatcher
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-sky-400 mt-2 uppercase tracking-wider">
                            Core Decision Engine
                          </span>
                        </div>

                        {/* Animated Connection Arrow / Pulse */}
                        <div className="hidden xl:flex flex-col items-center justify-center">
                          <div className="h-0.5 w-12 bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500 relative">
                            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 border-t-2 border-indigo-400 rotate-45" />
                          </div>
                          <span className="text-[9px] text-slate-500 mt-1 font-mono">Tools/Models</span>
                        </div>

                        {/* Connected Orbit Nodes: Models, Memory, Tools */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full xl:max-w-xl">
                          {/* Model 1: OpenAI */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-sky-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold">
                                GPT
                              </div>
                              <span className="text-xs font-bold text-white">OpenAI Chat Model</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-semibold block">
                              Primary Reasoning LLM
                            </span>
                          </div>

                          {/* Model 2: Google Gemini Fallback */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-sky-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-bold">
                                G
                              </div>
                              <span className="text-xs font-bold text-white">Google Gemini</span>
                            </div>
                            <span className="text-[10px] text-sky-400 font-semibold block">
                              Fallback Failover Model
                            </span>
                          </div>

                          {/* Memory: Simple Memory */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-sky-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">
                                <Database className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-white">Simple Memory</span>
                            </div>
                            <span className="text-[10px] text-amber-400 font-semibold block">
                              Multi-Turn Context Buffer
                            </span>
                          </div>

                          {/* Tool 1: Product Information */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-white">Product Info Tool</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              read: sheet (Google Sheets)
                            </span>
                          </div>

                          {/* Tool 2: Order list Append */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-white">Order List Tool</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              append: sheet (Google Sheets)
                            </span>
                          </div>

                          {/* Tool 3: Get row in sheet */}
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 transition-all">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-white">Order Lookup Tool</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              read: rows in sheet
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INTERACTIVE TEST SANDBOX / LIVE SIMULATOR */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Interactive Chat Simulation Box */}
                <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Live AI Agent Chat Sandbox</span>
                      </div>
                      <span className="text-[11px] text-sky-400 font-mono">
                        Powered by n8n + Google Sheets API
                      </span>
                    </div>

                    {/* Messages Container */}
                    <div className="space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto pr-1">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                              msg.sender === 'user'
                                ? 'bg-sky-500 text-slate-950 font-semibold'
                                : 'bg-slate-800 text-slate-200 border border-slate-700/80 leading-relaxed'
                            }`}
                          >
                            <p>{msg.text}</p>
                            {msg.toolUsed && (
                              <div className="mt-2 pt-1.5 border-t border-slate-700 text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                                <FileSpreadsheet className="w-3 h-3" />
                                <span>Tool executed: {msg.toolUsed}</span>
                              </div>
                            )}
                            {msg.modelUsed && (
                              <div className="mt-1 text-[9px] text-sky-400 font-mono flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                <span>Model: {msg.modelUsed}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isSimulating && (
                        <div className="flex items-center gap-2 text-xs text-sky-400 italic">
                          <Bot className="w-3.5 h-3.5 animate-spin" />
                          <span>AI Agent orchestrating tools & query...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input form & Quick prompts */}
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
                    {/* Prompt suggestions */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-500 text-[10px] font-bold">Try Prompt:</span>
                      <button
                        onClick={() => handleSimulateChat('What products are currently available in the catalog?')}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px]"
                      >
                        📦 Browse Products
                      </button>
                      <button
                        onClick={() => handleSimulateChat('Place an order for 2 IU study notebooks')}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px]"
                      >
                        🛒 Append New Order
                      </button>
                      <button
                        onClick={() => handleSimulateChat('Check order status for order #IU-9842')}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px]"
                      >
                        🔍 Lookup Delivery
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSimulateChat();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder="Type a message or order request..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-sky-500"
                      />
                      <button
                        type="submit"
                        disabled={!testInput.trim() || isSimulating}
                        className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Technical Specs & Tool Breakdown Card */}
                <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Automation Tech Stack
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        Production Ready
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">n8n Workflow Engine</p>
                          <p className="text-[11px] text-slate-400">
                            Node-based orchestration connecting chat triggers, memory nodes, and external APIs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Dual LLM Architecture</p>
                          <p className="text-[11px] text-slate-400">
                            OpenAI Chat Model configured as primary reasoning agent with automatic Google Gemini fallback.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Simple Memory Buffer</p>
                          <p className="text-[11px] text-slate-400">
                            Stateful conversation history preventing users from having to repeat themselves.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Live Google Sheets CRUD</p>
                          <p className="text-[11px] text-slate-400">
                            Direct read/append tool calling for zero-latency e-commerce inventory and order logging.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Engineered by MD Jayed</span>
                    <button
                      onClick={() => handleCopy(aiChatbotDetails, 'Project 1 Details', 'p1-details')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                    >
                      {copiedKey === 'p1-details' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'p1-details' ? 'Copied!' : 'Copy Specs'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CYBERSECURITY & ETHICAL HACKING */}
        {activeTab === 'cybersecurity' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 animate-fadeIn">
            <div className="max-w-3xl mb-6">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Security Core
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Offensive & Defensive Cybersecurity
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Specialized in vulnerability assessments, security audits, penetration testing, and protecting web applications against OWASP Top 10 vulnerabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Web Security & OWASP Top 10</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deep experience finding and remediating SQL Injections, Cross-Site Scripting (XSS), Broken Authentication, CSRF, and IDOR vulnerabilities.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Security Toolkit</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proficient in Nmap, Burp Suite, Wireshark, Metasploit, and Kali Linux for systematic reconnaissance and traffic analysis.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Linux System Hardening</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bash automation, secure server configuration, SSH key policies, file permission auditing, and daemon security.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Python Security Scripts</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Custom automation tools for network scanning, endpoint fuzzing, credential stuffing detection, and vulnerability verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FULL-STACK WEB DEVELOPMENT */}
        {activeTab === 'web-dev' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 animate-fadeIn">
            <div className="max-w-3xl mb-6">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Web Engineering
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Modern Full-Stack Web Development
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Crafting robust, responsive, and secure single-page web applications from responsive frontend to performant backend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">React 19 & TypeScript</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Component modularity, strict type-safety, efficient custom hooks, and state management without bloat.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Node.js & Express.js</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  RESTful microservices, rate-limiting, CORS policies, JWT authentication, and secure input validation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Tailwind CSS UI/UX</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pixel-perfect responsive design, smooth dark mode ergonomics, micro-interactions, and conversion-focused design.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-sky-400 block mb-1">Databases & API Integration</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  PostgreSQL, MongoDB, Google Sheets API, and REST endpoints with parameterized queries for maximum performance and security.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal for Workflow Screenshot */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-white">
                  n8n AI Agent Workflow Architecture — Full Resolution Blueprint
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl bg-[#0d1424] p-2 flex items-center justify-center border border-slate-800">
              <img
                src={workflowScreenshot}
                alt="n8n AI Agent Chatbot Full Screenshot"
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/ai-agent-workflow.jpg';
                }}
              />
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span>
                Nodes: Trigger (Chat) • AI Agent • OpenAI Model • Gemini Fallback • Simple Memory • Google Sheets Tools
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all text-xs"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
