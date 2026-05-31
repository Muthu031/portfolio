// ─── Navbar Component ─────────────────────────────────────────────────────────
// The fixed top navigation bar that appears on all pages.
//
// Features:
//   • Transparent background when at the top, switches to a frosted-glass blur
//     background once the user scrolls past 60px.
//   • Active section highlighting — the link for the section currently in the
//     viewport is highlighted cyan, with an animated underline.
//   • Desktop view: horizontal link list + "Hire Me" CTA button on the right.
//   • Mobile view: a hamburger button that opens a full-screen slide-in menu.
//   • When the mobile menu is open, body scrolling is locked so only the menu scrolls.
//   • Clicking any link smoothly scrolls to that section and closes the mobile menu.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Hamburger and close icons
import { NavLink } from '../../types';

// All navigation links \u2014 label shown in the menu, href is the section anchor
const NAV_LINKS: NavLink[] = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

// Section IDs derived from the nav links (e.g. ['hero', 'about', 'skills', ...])
// Used by the IntersectionObserver to watch which section is visible.
const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled]    = useState(false);   // True when scrolled past 60px
  const [menuOpen, setMenuOpen]    = useState(false);   // True when mobile menu is open
  const [activeSection, setActive] = useState('hero');  // ID of the section in the viewport

  // ── Effect 1: Add frosted-glass background when the user scrolls down ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60); // Trigger at 60px
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Effect 2: Track which section is currently in the centre of the viewport ──
  // rootMargin: '-45% 0px -55% 0px' means a section is considered "active" when
  // its middle part is in the centre 10% band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id); // Update active section name
        });
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 }
    );
    // Observe every section element
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Effect 3: Prevent the page from scrolling when the mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; }; // Always restore on cleanup
  }, [menuOpen]);

  // Closes the mobile menu and smoothly scrolls to the target section
  const handleNavClick = (href: string) => {
    setMenuOpen(false); // Close mobile menu first
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Fixed top header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-void/80 border-b border-white/[0.06] py-3' // Frosted glass on scroll
            : 'bg-transparent py-5'                                             // Transparent at top
        }`}
        role="banner" // Accessibility landmark for the page header
      >
        <nav
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo: <MS/> \u2014 clicking it scrolls back to the top ── */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-mono text-lg font-bold tracking-widest"
            whileHover={{ scale: 1.05 }}
            aria-label="Go to top"
          >
            <span className="text-electric">&lt;</span>
            <span className="text-cream">MS</span>
            <span className="text-electric">/&gt;</span>
          </motion.a>

          {/* ── Desktop navigation links (hidden on mobile) ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id; // Is this the current section?
              return (
                <li key={href}>
                  <motion.a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`font-mono text-xs tracking-widest transition-colors duration-200 relative py-1 ${
                      isActive ? 'text-electric' : 'text-muted hover:text-cream'
                    }`}
                    whileHover={{ y: -1 }}
                    // aria-current="page" tells screen readers which link is active
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    {/* Animated underline — slides between links using layoutId */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline" // All nav-underlines share this ID so Framer Motion animates between them
                        className="absolute -bottom-1 left-0 right-0 h-px bg-electric"
                      />
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA + Mobile hamburger button ── */}
          <div className="flex items-center gap-4">
            {/* "Hire Me" button — only visible on desktop (md and above) */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-widest border border-electric text-electric hover:bg-electric/10 transition-all duration-300 glow-electric"
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.a>

            {/* Hamburger / close button — only visible on mobile (hidden on md and above) */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-cream"
              onClick={() => setMenuOpen((o) => !o)} // Toggle menu open/closed
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen} // Tells screen readers whether the menu is open
            >
              {/* Show X when menu is open, hamburger icon when closed */}
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay menu ── */}
      {/* AnimatePresence allows the exit animation to play before the element is removed from the DOM */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            // Slides in from the right when opening, slides back out to the right when closing
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-void" // Covers the full screen
            role="dialog"      // Accessibility: marks this as a dialog / modal
            aria-modal="true"  // Tells screen readers that everything behind this is inert
            aria-label="Mobile navigation menu"
          >
            {/* Decorative subtle grid pattern in the background */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col h-full px-8 pt-24 pb-12">
              {/* ── Mobile nav links ── */}
              <ul className="flex flex-col gap-6" role="list">
                {NAV_LINKS.map(({ label, href }, i) => (
                  // Each link animates in from the right with a staggered delay
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }} // Each link starts 70ms after the previous
                  >
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(href); // Closes menu and scrolls to section
                      }}
                      className="font-mono text-3xl font-bold text-cream hover:text-electric transition-colors duration-200"
                    >
                      {/* Dim numbered prefix, e.g. "01." before "Home" */}
                      <span className="text-electric/40 text-lg mr-2">
                        0{i + 1}.
                      </span>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Email address shown at the bottom of the mobile menu */}
              <div className="mt-auto">
                <p className="font-mono text-xs text-muted">
                  muthukumaran6967@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
