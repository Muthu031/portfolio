// ─── Button Component ─────────────────────────────────────────────────────────
// A flexible, reusable button that can render either as a <button> element or
// an <a> link depending on whether an 'href' prop is provided.
//
// Features:
//   • Three visual styles (variant): primary (cyan), secondary (golden), ghost (subtle)
//   • Three sizes: sm, md, lg
//   • Optional icon on the left (icon) or right (iconRight)
//   • When href is provided, renders as a Framer Motion <a> tag (great for links)
//   • When no href, renders as a Framer Motion <button> (great for actions / forms)
//   • Hover and tap animations (lifts slightly, scales on hover; squishes on click)
//   • Disabled state: reduces opacity and blocks pointer events
//
// Usage:
//   <Button variant="primary" href="#projects" icon={<ArrowRight />}>View Work</Button>
//   <Button variant="secondary" type="submit">Send Message</Button>

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;           // Text or content inside the button
  variant?: 'primary' | 'secondary' | 'ghost'; // Visual style
  size?: 'sm' | 'md' | 'lg';          // Padding and font size
  href?: string;                       // If provided, renders as a link (<a> tag)
  onClick?: () => void;                // Click handler (only used when no href)
  className?: string;                  // Extra Tailwind classes to merge in
  icon?: React.ReactNode;              // Icon shown on the LEFT of the label
  iconRight?: React.ReactNode;         // Icon shown on the RIGHT of the label
  target?: string;                     // e.g. '_blank' to open link in a new tab
  rel?: string;                        // e.g. 'noopener noreferrer' for external links
  download?: boolean | string;         // Triggers a file download when href is a file
  type?: 'button' | 'submit' | 'reset'; // HTML button type (default: 'button')
  disabled?: boolean;                  // Disables the button (greys it out)
  'aria-label'?: string;               // Accessible label for screen readers
}

// Maps size names to Tailwind padding + text-size classes
const sizeMap = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-sm tracking-wider',
  lg: 'px-8 py-4 text-base tracking-widest',
};

// Maps variant names to Tailwind colour / border / glow classes
const variantMap = {
  primary:
    'border border-electric text-electric hover:bg-electric/10 glow-electric', // Cyan neon style
  secondary:
    'border border-golden text-golden hover:bg-golden/10 glow-golden',         // Golden neon style
  ghost:
    'border border-white/10 text-cream hover:border-electric/50 hover:text-electric', // Subtle, changes on hover
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary', // Default to cyan primary style
  size = 'md',         // Default to medium size
  href,
  onClick,
  className = '',
  icon,
  iconRight,
  target,
  rel,
  download,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  // Build the complete class string by combining size, variant, disabled state, and custom classes
  const base = `inline-flex items-center gap-2 font-mono transition-all duration-300 ${sizeMap[size]} ${variantMap[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  // The inner content: optional left icon, label text, optional right icon
  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );

  // If an href is provided, render as an animated anchor link
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        className={base}
        whileHover={{ y: -2, scale: 1.02 }} // Lifts up slightly on hover
        whileTap={{ scale: 0.97 }}           // Squishes slightly when clicked
      >
        {content}
      </motion.a>
    );
  }

  // Otherwise, render as an animated button element
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={base}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
};
