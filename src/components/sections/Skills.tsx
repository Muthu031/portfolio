// ─── Skills Section ───────────────────────────────────────────────────────────
// Displays all technical skills grouped by category (e.g. Backend, Frontend, DB).
//
// Structure:
//   1. Section heading    — "// 02  My Arsenal"
//   2. Intro paragraph    — explains these are production-tested skills
//   3. CategoryBlock list — one block per category, each containing SkillCards
//
// Each SkillCard shows:
//   • Emoji icon + skill name
//   • A proficiency badge (Expert / Advanced / Proficient)
//   • An animated horizontal progress bar showing skill level (0–100)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { Skill, ProficiencyLevel } from '../../types';
import { Badge } from '../ui/Badge';

// ─── Proficiency → Badge variant map ─────────────────────────────────────────
// Maps the ProficiencyLevel string (from types) to the correct Badge variant name
const proficiencyVariant: Record<ProficiencyLevel, 'expert' | 'advanced' | 'proficient'> = {
  Expert:     'expert',
  Advanced:   'advanced',
  Proficient: 'proficient',
};

// ─── SkillCard Component ──────────────────────────────────────────────────────
// Renders one skill as a card with an icon, name, proficiency badge, and progress bar.
// `color` is the accent colour of its parent category (used for the glow and progress bar).
// `index` drives the staggered entrance animation delay.
const SkillCard: React.FC<{ skill: Skill; color: string; index: number }> = ({
  skill,
  color,
  index,
}) => {
  // Track whether the mouse is hovering so we can apply the dynamic glow
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-card border border-white/[0.06] p-4 group overflow-hidden"
      // Card slides up from below when it first enters the viewport
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      // Slight lift and grow on hover
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      // Inline styles for the dynamic border glow (can't do this with Tailwind)
      style={{
        boxShadow:   hovered ? `0 8px 32px ${color}18, 0 0 0 1px ${color}25` : undefined,
        borderColor: hovered ? `${color}35` : undefined,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Soft colour blob in the top-right corner — only visible on hover */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl transition-opacity duration-300"
        style={{ background: color, opacity: hovered ? 0.08 : 0 }}
        aria-hidden="true"
      />

      {/* Row: emoji icon + skill name */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" role="img" aria-label={skill.name}>{skill.icon}</span>
        <span className="font-mono text-sm font-bold text-cream group-hover:text-white transition-colors duration-200">
          {skill.name}
        </span>
      </div>

      {/* Proficiency badge — Expert / Advanced / Proficient */}
      <div className="mb-3">
        <Badge variant={proficiencyVariant[skill.proficiency]}>
          {skill.proficiency}
        </Badge>
      </div>

      {/* Animated progress bar — fills from left to right on first view */}
      <div
        className="relative h-1 bg-white/[0.05] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency: ${skill.level}%`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
          style={{
            background:  `linear-gradient(90deg, ${color}60, ${color})`,
            boxShadow:   `0 0 8px ${color}50`,
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── CategoryBlock Component ──────────────────────────────────────────────────
// Renders one skill category (e.g. "Backend", "Frontend") with:
//   • Category header: emoji + title + decorative gradient line
//   • Grid of SkillCards for every skill in that category
const CategoryBlock: React.FC<{ catIndex: number }> = ({ catIndex }) => {
  const cat = skillCategories[catIndex]; // Look up the category data by index

  return (
    <motion.div
      // Each category block slides up when it scrolls into view
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: catIndex * 0.1, duration: 0.6 }}
    >
      {/* Category heading row: icon + title + gradient divider line */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl" aria-hidden="true">{cat.icon}</span>
        <h3 className="font-mono font-bold text-cream">{cat.title}</h3>
        {/* Line that starts with the category's colour and fades to transparent */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${cat.color}30, transparent)` }}
          aria-hidden="true"
        />
      </div>

      {/* Responsive grid of SkillCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {cat.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} color={cat.color} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Skills Section Component ─────────────────────────────────────────────────
export const Skills: React.FC = () => (
  <section id="skills" className="py-28 bg-panel/40" aria-label="Skills section">
    <div className="max-w-7xl mx-auto px-6">

      {/* ── Section heading: "// 02  My Arsenal" ── */}
      <motion.div
        className="flex items-center gap-4 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-electric text-sm tracking-widest">// 02</span>
        <h2 className="font-mono text-3xl md:text-4xl font-bold text-cream">My Arsenal</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
      </motion.div>

      {/* ── Intro paragraph ── */}
      <motion.p
        className="text-muted max-w-2xl mb-16 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Tools I've battle-tested in production — not a buzzword dump. Each represents genuine
        experience shipping, debugging, and scaling real software.
      </motion.p>

      {/* ── One CategoryBlock per skill category ── */}
      <div className="flex flex-col gap-14">
        {skillCategories.map((_, i) => (
          <CategoryBlock key={i} catIndex={i} />
        ))}
      </div>
    </div>
  </section>
);

