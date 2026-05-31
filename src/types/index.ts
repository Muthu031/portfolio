// ─── Shared TypeScript Types ──────────────────────────────────────────────────
// This file defines all the data shapes (types / interfaces) used across the
// whole portfolio. Keeping them in one place means:
//   • Every component uses the same consistent structure.
//   • TypeScript will warn you if you try to use wrong data anywhere.

// ─── Project Types ──────────────────────────────────────────────────────────

// The five categories a technology chip can belong to on a project card.
// Used to pick the correct colour for each tag.
export type TechCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tool';

// A single technology badge shown on a project card, e.g. { name: 'Node.js', category: 'backend' }
export interface TechChip {
  name: string;          // Display name, e.g. "PostgreSQL"
  category: TechCategory; // Determines which colour the tag gets
}

// All the information needed to render one project card.
export interface Project {
  id: string;            // Unique key used by React for list rendering
  title: string;         // Project name shown as the heading
  tagline: string;       // One-line subtitle under the title
  description: string;   // Longer paragraph describing the project
  techStack: TechChip[]; // List of technology chips
  githubUrl: string;     // Link to the GitHub repository
  liveUrl: string | null; // Link to the live/demo deployment; null = enterprise/private
  badge: 'Featured' | 'Open Source'; // Label shown in the top corner of the card
  accentColor: string;   // Hex colour used to style this project's card (e.g. "#00f5ff")
  mockType: 'editor' | 'ecommerce' | 'dashboard' | 'auth'; // Which fake UI preview to show
}

// ─── Skill Types ─────────────────────────────────────────────────────────────

// The three levels of expertise displayed as coloured badges on skill cards.
export type ProficiencyLevel = 'Expert' | 'Advanced' | 'Proficient';

// One individual skill entry, e.g. Node.js.
export interface Skill {
  name: string;                  // Display name
  icon: string;                  // Emoji icon shown next to the name
  proficiency: ProficiencyLevel; // Expertise level badge
  level: number;                 // 0–100 number used to draw the progress bar width
}

// A group of related skills shown under one heading, e.g. "Backend".
export interface SkillCategory {
  title: string;    // Category heading, e.g. "Database"
  icon: string;     // Emoji icon for the category
  color: string;    // Hex accent colour used for the progress bars in this group
  skills: Skill[];  // The individual skills inside this category
}

// ─── Experience Types ─────────────────────────────────────────────────────────

// One job or study entry on the experience timeline.
export interface Experience {
  id: string;              // Unique identifier
  title: string;           // Job title, e.g. "Full-Stack Developer"
  company: string;         // Company or institution name
  period: string;          // Date range shown on the card, e.g. "Aug 2023 – Present"
  achievements: string[];  // Bullet-point list of what was accomplished
  lettermark: string;      // 2-letter initials shown in the timeline circle, e.g. "SW"
  color: string;           // Hex colour for this entry's circle and text accent
}

// ─── Testimonial Types ───────────────────────────────────────────────────────

// One person's testimonial / quote shown in the carousel.
export interface Testimonial {
  id: string;          // Unique identifier
  quote: string;       // The full quote text
  name: string;        // Reviewer's full name
  title: string;       // Their job title, e.g. "Tech Lead"
  company: string;     // Where they work
  initials: string;    // 2-letter initials shown in their avatar circle, e.g. "RK"
  avatarColor: string; // Hex colour for the avatar background
}

// ─── Navigation Types ────────────────────────────────────────────────────────

// One link in the top navigation bar.
export interface NavLink {
  label: string; // Text shown in the menu, e.g. "About"
  href: string;  // The anchor target, e.g. "#about"
}

// ─── Stats Types ─────────────────────────────────────────────────────────────

// One animated counter card in the About section (e.g. "2+ Years Experience").
export interface Stat {
  numericValue: number; // The number to count up to (0 means skip the counter)
  prefix: string;       // Text before the number, e.g. "∞"
  suffix: string;       // Text after the number, e.g. "+"
  label: string;        // Description below the number, e.g. "Years Experience"
}

// ─── Timeline Types ──────────────────────────────────────────────────────────

// One milestone entry on the career timeline inside the About section.
export interface TimelineMilestone {
  year: string;        // Year string shown next to the dot, e.g. "2023"
  title: string;       // Short headline, e.g. "First Professional Role"
  description: string; // A few sentences explaining what happened that year
  emoji: string;       // Emoji shown in the timeline circle, e.g. "⚡"
}

// ─── Form Types ──────────────────────────────────────────────────────────────

// The data the contact form collects.
export interface ContactFormData {
  name: string;    // The sender's name
  email: string;   // The sender's email address
  message: string; // The message body
}

// Validation error messages for the contact form.
// Each field is optional — only present when that field failed validation.
export interface ContactFormErrors {
  name?: string;    // Error text shown under the Name field
  email?: string;   // Error text shown under the Email field
  message?: string; // Error text shown under the Message field
}
