import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Experience, Project, QuestDifficulty, BossTier } from "../types";

/** Merge conditional class names, letting later Tailwind classes win conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Everything below turns raw content (experience/projects/skills/testimonials)
 * into the Hero's "Level N" character-sheet stat block. Add a job, ship a
 * project, or collect a testimonial and the level/XP bar advances on its own
 * — nothing here is a hand-typed number.
 */

const XP_PER_LEVEL = 600;
const XP_PER_MONTH_EXPERIENCE = 12;
const XP_PER_PROJECT = 150;
const XP_PER_TESTIMONIAL = 100;
const XP_PER_AVG_SKILL_POINT = 4;

function monthsBetween(start: string, end: string | null, now: Date): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const endDate = end ? { y: Number(end.split("-")[0]), m: Number(end.split("-")[1]) } : { y: now.getFullYear(), m: now.getMonth() + 1 };
  return Math.max(0, (endDate.y - startYear) * 12 + (endDate.m - startMonth));
}

export function computeYearsOfExperience(experience: Experience[], now: Date = new Date()): number {
  const totalMonths = experience.reduce((sum, job) => sum + monthsBetween(job.start, job.end, now), 0);
  return Math.round((totalMonths / 12) * 10) / 10;
}

export interface LevelProgress {
  level: number;
  xp: number;
  xpIntoLevel: number;
  xpToNextLevel: number;
  progressPercent: number;
}

export function computeLevelProgress(
  experience: Experience[],
  projectCount: number,
  testimonialCount: number,
  averageSkillLevel: number,
  now: Date = new Date()
): LevelProgress {
  const totalMonths = experience.reduce((sum, job) => sum + monthsBetween(job.start, job.end, now), 0);
  const xp =
    totalMonths * XP_PER_MONTH_EXPERIENCE +
    projectCount * XP_PER_PROJECT +
    testimonialCount * XP_PER_TESTIMONIAL +
    Math.round(averageSkillLevel) * XP_PER_AVG_SKILL_POINT;

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;

  return {
    level,
    xp,
    xpIntoLevel,
    xpToNextLevel: XP_PER_LEVEL - xpIntoLevel,
    progressPercent: Math.round((xpIntoLevel / XP_PER_LEVEL) * 100),
  };
}

export function averageSkillLevel(categories: { skills: { level: number }[] }[]): number {
  const all = categories.flatMap((c) => c.skills.map((s) => s.level));
  if (all.length === 0) return 0;
  return all.reduce((sum, level) => sum + level, 0) / all.length;
}

export function formatPeriod(start: string, end: string | null): string {
  const format = (iso: string) => {
    const [year, month] = iso.split("-").map(Number);
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };
  return `${format(start)} — ${end ? format(end) : "Present"}`;
}

const difficultyStyles: Record<QuestDifficulty, string> = {
  Junior: "text-textSecondary border-border bg-surfaceAlt",
  Mid: "text-accent-violet border-accent-violet/40 bg-accent-violet/10",
  Senior: "text-accent-gold border-accent-gold/40 bg-accent-gold/10",
  Lead: "text-accent-danger border-accent-danger/40 bg-accent-danger/10",
};

export function difficultyClasses(difficulty: QuestDifficulty): string {
  return difficultyStyles[difficulty];
}

const bossTierStyles: Record<BossTier, { text: string; border: string; glow: string }> = {
  Elite: { text: "text-accent-violet", border: "border-accent-violet/40", glow: "shadow-[0_0_24px_rgba(124,92,255,0.18)]" },
  Legendary: { text: "text-accent-gold", border: "border-accent-gold/40", glow: "shadow-[0_0_24px_rgba(255,200,87,0.18)]" },
  Mythic: { text: "text-accent-danger", border: "border-accent-danger/40", glow: "shadow-[0_0_28px_rgba(255,90,110,0.2)]" },
};

export function bossTierStyle(tier: BossTier) {
  return bossTierStyles[tier];
}

export function totalImpactScore(projects: Project[]): number {
  if (projects.length === 0) return 0;
  return Math.round(projects.reduce((sum, p) => sum + p.impact, 0) / projects.length);
}
