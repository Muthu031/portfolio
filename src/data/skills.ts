// ─── Skills Data ─────────────────────────────────────────────────────────────
// This file holds all the skill categories and individual skills shown in the
// "My Arsenal" (Skills) section of the portfolio.
//
// Each category has:
//   • title  — the heading shown above the group
//   • icon   — an emoji shown next to the heading
//   • color  — a hex colour used for progress bars and hover effects in that group
//   • skills — an array of individual skill cards
//
// Each skill has:
//   • name        — display name on the card
//   • icon        — emoji icon
//   • proficiency — 'Expert' | 'Advanced' | 'Proficient' (shown as a coloured badge)
//   • level       — 0–100 number that controls the width of the progress bar

import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    // ── Category 1: Backend ──
    title: 'Backend',
    icon: '🔧',
    color: '#00f5ff', // Cyan for backend skills
    skills: [
      { name: 'Node.js',        icon: '🟢', proficiency: 'Expert',   level: 95 },
      { name: 'Express.js',     icon: '🚂', proficiency: 'Expert',   level: 92 },
      { name: 'TypeScript',     icon: '📘', proficiency: 'Expert',   level: 93 },
      { name: 'REST APIs',      icon: '🔗', proficiency: 'Expert',   level: 95 },
      { name: 'Zod Validation', icon: '🛡️', proficiency: 'Advanced', level: 85 },
    ],
  },
  {
    // ── Category 2: Frontend ──
    title: 'Frontend',
    icon: '⚡',
    color: '#ffb800', // Golden for frontend skills
    skills: [
      { name: 'React.js',            icon: '⚛️', proficiency: 'Expert',   level: 90 },
      { name: 'JavaScript',          icon: '🟡', proficiency: 'Expert',   level: 92 },
      { name: 'React Native',        icon: '📱', proficiency: 'Advanced', level: 78 },
      { name: 'Functional Hooks',    icon: '🪝', proficiency: 'Expert',   level: 90 },
      { name: 'Reusable Components', icon: '🧩', proficiency: 'Expert',   level: 90 },
    ],
  },
  {
    // ── Category 3: Database ──
    title: 'Database',
    icon: '🗄️',
    color: '#a78bfa', // Violet for database skills
    skills: [
      { name: 'PostgreSQL',        icon: '🐘', proficiency: 'Expert',   level: 92 },
      { name: 'Query Optimization',icon: '⚡', proficiency: 'Expert',   level: 88 },
      { name: 'Indexing',          icon: '📇', proficiency: 'Advanced', level: 85 },
      { name: 'Database Design',   icon: '🏗️', proficiency: 'Advanced', level: 83 },
    ],
  },
  {
    // ── Category 4: Auth & Security ──
    title: 'Auth & Security',
    icon: '🔐',
    color: '#34d399', // Emerald green for security skills
    skills: [
      { name: 'Auth & Authorization', icon: '🔑', proficiency: 'Expert',   level: 90 },
      { name: 'JWT',                  icon: '🎫', proficiency: 'Expert',   level: 92 },
      { name: 'WebSockets',           icon: '🔌', proficiency: 'Advanced', level: 82 },
      { name: 'Audit Logging',        icon: '📋', proficiency: 'Advanced', level: 85 },
    ],
  },
  {
    // ── Category 5: Tools & Cloud ──
    title: 'Tools & Cloud',
    icon: '☁️',
    color: '#fb7185', // Rose / pink for tooling skills
    skills: [
      { name: 'Git',             icon: '📦', proficiency: 'Expert',     level: 95 },
      { name: 'AWS',             icon: '☁️', proficiency: 'Proficient', level: 68 },
      { name: 'Vercel',          icon: '▲',  proficiency: 'Advanced',   level: 82 },
      { name: 'Postman',         icon: '📬', proficiency: 'Expert',     level: 90 },
      { name: 'Browser DevTools',icon: '🛠️', proficiency: 'Expert',     level: 90 },
      { name: 'Debugging',       icon: '🐛', proficiency: 'Expert',     level: 92 },
    ],
  },
  {
    // ── Category 6: Problem Solving & DSA ──
    title: 'Problem Solving & DSA',
    icon: '🧠',
    color: '#f97316', // Orange for algorithms / problem solving
    skills: [
      { name: 'Data Structures', icon: '🏗️', proficiency: 'Advanced', level: 82 },
      { name: 'Algorithms',      icon: '⚙️', proficiency: 'Advanced', level: 80 },
      { name: 'LeetCode',        icon: '🟩', proficiency: 'Advanced', level: 78 },
      { name: 'System Design',   icon: '🗺️', proficiency: 'Advanced', level: 80 },
    ],
  },
];
