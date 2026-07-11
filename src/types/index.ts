// Central content contracts. Every section reads from `src/data/*` through
// these shapes — add a new experience/project/skill/testimonial by editing
// the data files only, no component ever needs to change.

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "twitter" | "resume";
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  availability: string;
  socials: SocialLink[];
  /** Rotating lines the hero typewriter cycles through. */
  focusLines: string[];
}

export type QuestDifficulty = "Junior" | "Mid" | "Senior" | "Lead";

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  /** ISO-ish "YYYY-MM" start; end null means present/ongoing. */
  start: string;
  end: string | null;
  difficulty: QuestDifficulty;
  description: string;
  /** Rewards granted on quest completion — rendered as +XP bullet lines. */
  highlights: string[];
  stack: string[];
}

export type BossTier = "Elite" | "Legendary" | "Mythic";

export interface Project {
  id: string;
  title: string;
  tier: BossTier;
  description: string;
  techStack: string[];
  /** 0-100, drives the project card's impact/completion bar. */
  impact: number;
  metrics: { label: string; value: string }[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  detail: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: "server" | "layout" | "database" | "shield" | "wrench";
  skills: Skill[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}
