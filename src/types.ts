export interface UserProfileInput {
  name: string;
  title: string;
  experience: string;
  skills: string;
  projects: string;
  targetAudience: string;
  tone: string;
}

export interface HeroSectionData {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  uxLayoutNote: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface EducationItem {
  degree: string;
  institutionOrBoard: string;
  field: string;
  result: string;
  statusOrYear?: string;
  institutionUrl?: string;
  highlights?: string[];
}

export interface ClubInvolvement {
  name: string;
  category: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface AboutSectionData {
  bioParagraph1: string;
  bioParagraph2: string;
  stats: StatItem[];
  education?: EducationItem[];
  clubs?: ClubInvolvement[];
  uxLayoutNote: string;
}

export interface SkillItem {
  name: string;
  level: string;
  context: string;
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  skillsList: SkillItem[];
}

export interface SkillsSectionData {
  intro: string;
  categories: SkillCategory[];
  uxLayoutNote: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tools: string[];
  impact: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface ProjectsSectionData {
  intro: string;
  projectList: ProjectItem[];
  uxLayoutNote: string;
}

export interface ServiceItem {
  title: string;
  valueProposition: string;
  deliverables: string[];
  idealFor: string;
}

export interface ServicesSectionData {
  intro: string;
  serviceList: ServiceItem[];
  uxLayoutNote: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  projectContext?: string;
  avatarUrl?: string;
}

export interface TestimonialsSectionData {
  intro: string;
  quotes: TestimonialItem[];
  uxLayoutNote: string;
}

export interface FormFieldGuide {
  field: string;
  purpose: string;
  placeholder: string;
}

export interface ContactSectionData {
  closingStatement: string;
  availabilityStatus: string;
  responseTime: string;
  formFieldsGuide: FormFieldGuide[];
  directEmail: string;
  uxLayoutNote: string;
}

export interface ConversionStrategyData {
  targetPersona: string;
  primaryConversionGoal: string;
  uxDesignHighlights: string[];
}

export interface PortfolioData {
  profile: UserProfileInput;
  hero: HeroSectionData;
  about: AboutSectionData;
  skills: SkillsSectionData;
  projects: ProjectsSectionData;
  services: ServicesSectionData;
  testimonials: TestimonialsSectionData;
  contact: ContactSectionData;
  conversionStrategy: ConversionStrategyData;
}

export type ThemePreset = 'slate' | 'indigo' | 'emerald' | 'amber' | 'violet';

export type ViewMode = 'live-portfolio' | 'ux-spec' | 'export-code';
