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

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeSection, setActive] = useState('hero');
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ── Effect 1: Add frosted-glass background when the user scrolls down ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Effect 2: Track which section is currently in the centre of the viewport ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Effect 3: Prevent the page from scrolling when the mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Focus management for mobile menu ──
  useEffect(() => {
    if (menuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    if (!menuOpen) {
      // Return focus to hamburger button when menu closes
      const hamburger = document.getElementById('hamburger-btn');
      hamburger?.focus();
    }
  }, [menuOpen]);

  // Closes the mobile menu and smoothly scrolls to the target section
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-void/80 border-b border-white/[0.06] py-2 xs:py-3'
            : 'bg-transparent py-3 xs:py-5'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 xs:px-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo: <MS/> — clicking it scrolls back to the top ── */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-mono text-sm xs:text-lg font-bold tracking-widest flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            aria-label="Go to top"
          >
            <span className="text-electric">&lt;</span>
            <span className="text-cream">MS</span>
            <span className="text-electric">/&gt;</span>
          </motion.a>

          {/* ── Desktop navigation links (hidden on mobile) ── */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
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
          <div className="flex items-center gap-2 xs:gap-4 flex-shrink-0">
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
              id="hamburger-btn"
              className="md:hidden flex items-center justify-center w-9 h-9 min-h-[44px] min-w-[44px] text-cream -m-[7px]"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-void"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            ref={menuRef}
          >
            {/* Close button at the top */}
            <button
              ref={closeButtonRef}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 text-cream"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

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

            <div className="relative flex flex-col h-full px-4 xs:px-8 pt-16 xs:pt-20 pb-8 xs:pb-12 safe">
              {/* ── Mobile nav links ── */}
              <ul className="flex flex-col gap-4 xs:gap-6" role="list">
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
                      className="font-mono text-2xl xs:text-3xl font-bold text-cream hover:text-electric transition-colors duration-200"
                    >
                      {/* Dim numbered prefix, e.g. "01." before "Home" */}
                      <span className="text-electric/40 text-lg xs:text-lg mr-2">
                        0{i + 1}.
                      </span>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Email address shown at the bottom of the mobile menu */}
              <div className="mt-auto">
                <p className="font-mono text-xs xs:text-sm text-muted break-all">
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
