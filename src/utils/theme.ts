import { ThemePreset } from '../types';

export interface ThemeConfig {
  name: string;
  bgMain: string;
  bgCard: string;
  borderMain: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryBorder: string;
  accentText: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  gradientFrom: string;
  gradientTo: string;
  ring: string;
  isDark: boolean;
}

export const themes: Record<ThemePreset, ThemeConfig> = {
  slate: {
    name: 'Elegant Dark',
    bgMain: 'bg-[#0F172A] text-slate-200',
    bgCard: 'bg-slate-800/50 border-slate-700/80',
    borderMain: 'border-slate-800',
    primary: 'bg-sky-500 text-slate-950 font-bold',
    primaryHover: 'hover:bg-sky-400',
    primaryLight: 'bg-sky-500/10 text-sky-400',
    primaryBorder: 'border-sky-500/30',
    accentText: 'text-sky-400',
    badgeBg: 'bg-sky-500/10',
    badgeText: 'text-sky-400',
    badgeBorder: 'border-sky-500/20',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-blue-600',
    ring: 'focus:ring-sky-400',
    isDark: true,
  },
  indigo: {
    name: 'Modern Indigo Dark',
    bgMain: 'bg-slate-950 text-slate-200',
    bgCard: 'bg-slate-900/60 border-slate-800',
    borderMain: 'border-slate-800',
    primary: 'bg-indigo-500 text-white font-bold',
    primaryHover: 'hover:bg-indigo-400',
    primaryLight: 'bg-indigo-500/10 text-indigo-400',
    primaryBorder: 'border-indigo-500/30',
    accentText: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    badgeBorder: 'border-indigo-500/20',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-600',
    ring: 'focus:ring-indigo-400',
    isDark: true,
  },
  emerald: {
    name: 'Founder Emerald Dark',
    bgMain: 'bg-slate-950 text-slate-200',
    bgCard: 'bg-slate-900/60 border-slate-800',
    borderMain: 'border-slate-800',
    primary: 'bg-emerald-500 text-slate-950 font-bold',
    primaryHover: 'hover:bg-emerald-400',
    primaryLight: 'bg-emerald-500/10 text-emerald-400',
    primaryBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/20',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    ring: 'focus:ring-emerald-400',
    isDark: true,
  },
  amber: {
    name: 'Artisan Bronze Dark',
    bgMain: 'bg-stone-950 text-stone-200',
    bgCard: 'bg-stone-900/60 border-stone-800',
    borderMain: 'border-stone-800',
    primary: 'bg-amber-500 text-stone-950 font-bold',
    primaryHover: 'hover:bg-amber-400',
    primaryLight: 'bg-amber-500/10 text-amber-400',
    primaryBorder: 'border-amber-500/30',
    accentText: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/20',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-600',
    ring: 'focus:ring-amber-400',
    isDark: true,
  },
  violet: {
    name: 'Studio Violet Dark',
    bgMain: 'bg-[#0b0c16] text-slate-200',
    bgCard: 'bg-slate-900/60 border-slate-800',
    borderMain: 'border-slate-800',
    primary: 'bg-violet-500 text-white font-bold',
    primaryHover: 'hover:bg-violet-400',
    primaryLight: 'bg-violet-500/10 text-violet-400',
    primaryBorder: 'border-violet-500/30',
    accentText: 'text-violet-400',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    badgeBorder: 'border-violet-500/20',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    ring: 'focus:ring-violet-400',
    isDark: true,
  },
};
