// ─── Badge Component ─────────────────────────────────────────────────────────
// A small coloured label chip used across the portfolio to communicate status.
// Examples: "Featured", "Expert", "Open to Opportunities".
//
// Pass a 'variant' prop to select the colour scheme:
//   featured    — cyan    (used on featured project cards)
//   opensource  — golden  (used on open-source project cards)
//   expert      — cyan    (skill proficiency badge)
//   advanced    — golden  (skill proficiency badge)
//   proficient  — violet  (skill proficiency badge)
//   available   — green   ("Open to Opportunities" in the Contact section)

import React from 'react';

// The allowed variant names — used to pick from variantMap below.
type BadgeVariant = 'featured' | 'opensource' | 'expert' | 'advanced' | 'proficient' | 'available';

interface BadgeProps {
  children: React.ReactNode; // Text content displayed inside the badge
  variant?: BadgeVariant;    // Colour scheme. Defaults to 'featured'
  className?: string;        // Optional extra Tailwind classes
}

// Maps each variant name to the Tailwind classes that give it its colour.
const variantMap: Record<BadgeVariant, string> = {
  featured:   'bg-electric/10 text-electric border-electric/30',
  opensource: 'bg-golden/10 text-golden border-golden/30',
  expert:     'bg-electric/10 text-electric border-electric/20',
  advanced:   'bg-golden/10 text-golden border-golden/20',
  proficient: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
  available:  'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'featured', // Default to cyan featured style
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono tracking-widest uppercase border ${variantMap[variant]} ${className}`}
  >
    {/* The 'available' variant shows a small animated green dot before the text */}
    {variant === 'available' && (
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
    )}
    {children}
  </span>
);
