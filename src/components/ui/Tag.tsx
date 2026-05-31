// ─── Tag Component ───────────────────────────────────────────────────────────
// A small tech-stack chip used on project cards to list technologies.
// The colour of the chip changes based on which category the technology
// belongs to, so at a glance you can tell frontend from backend etc.
//
// Usage:
//   <Tag category="backend">Node.js</Tag>

import React from 'react';
import { TechCategory } from '../../types'; // Import the union type for categories

interface TagProps {
  children: React.ReactNode; // The technology name to display
  category?: TechCategory;   // Determines the colour. Defaults to 'frontend'
  className?: string;
}

// Maps each technology category to a set of Tailwind colour classes.
// Each entry has a normal background/text colour and a slightly darker hover state.
const categoryColorMap: Record<TechCategory, string> = {
  frontend: 'bg-electric/10 text-electric border-electric/20 hover:bg-electric/20',  // Cyan
  backend:  'bg-golden/10 text-golden border-golden/20 hover:bg-golden/20',          // Golden
  database: 'bg-violet-400/10 text-violet-400 border-violet-400/20 hover:bg-violet-400/20', // Violet
  devops:   'bg-emerald-400/10 text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/20', // Green
  tool:     'bg-rose-400/10 text-rose-400 border-rose-400/20 hover:bg-rose-400/20',  // Rose
};

export const Tag: React.FC<TagProps> = ({
  children,
  category = 'frontend', // Default to frontend (cyan) colour if no category given
  className = '',
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 text-xs font-mono border transition-colors duration-200 ${categoryColorMap[category]} ${className}`}
  >
    {children}
  </span>
);
