// ─── Footer Component ─────────────────────────────────────────────────────────
// The bottom section of every page. Contains three areas:
//   LEFT  — Logo + "Built with React + TypeScript · {year}" credits line.
//   CENTER — Social icon links (GitHub, LinkedIn, Twitter, Email).
//   RIGHT  — A "Back to top" button that smoothly scrolls to the top of the page.
//
// The year is calculated dynamically so it never goes stale.

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  // Get the current year dynamically (e.g. 2025)
  const year = new Date().getFullYear();

  // Smooth-scrolls the page back to the very top when the button is clicked
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    // role="contentinfo" is the semantic landmark for a page footer (accessibility)
    <footer className="relative border-t border-white/[0.06] bg-panel/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* ── LEFT: Logo + credits ── */}
          <div className="flex flex-col items-center md:items-start gap-2">
            {/* Same <MS/> logo as the Navbar */}
            <span className="font-mono text-lg font-bold">
              <span className="text-electric">&lt;</span>
            <span className="text-cream">MS</span>
              <span className="text-electric">/&gt;</span>
            </span>
            {/* Built-with credits line — year updates automatically */}
            <p className="font-mono text-xs text-muted">
              Built with{' '}
              <span className="text-electric">React</span> +{' '}
              <span className="text-electric">TypeScript</span> ·{' '}
              <span className="text-golden">{year}</span>
            </p>
          </div>

          {/* ── CENTER: Social icon links ── */}
          <div className="flex items-center gap-5">
            {[
              { icon: <Github size={16} />,   href: 'https://github.com/Muthu031',                          label: 'GitHub' },
              { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/muthukumaran-s/',         label: 'LinkedIn' },
              { icon: <Twitter size={16} />,  href: 'https://twitter.com/muthukumaran_s',                  label: 'Twitter' },
              { icon: <Mail size={16} />,     href: 'mailto:muthukumaran6967@gmail.com',                   label: 'Email' },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer" // Security: prevents the new tab from accessing window.opener
                aria-label={label}        // Screen reader label (e.g. "GitHub")
                className="text-muted hover:text-electric transition-colors duration-200"
                whileHover={{ y: -3, scale: 1.1 }} // Lifts and grows on hover
                whileTap={{ scale: 0.9 }}           // Shrinks on click
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* ── RIGHT: Back to top button ── */}
          <motion.button
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-electric transition-colors duration-200"
            whileHover={{ y: -2 }} // Lifts slightly on hover
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </motion.button>

        </div>
      </div>
    </footer>
  );
};
