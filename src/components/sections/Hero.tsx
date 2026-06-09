// ─── Hero Section ─────────────────────────────────────────────────────────────
// The very first thing the user sees — a full-viewport-height introduction.
//
// Layout (top to bottom):
//   1. ParticleCanvas   — animated dot network drawn on a <canvas> in the background
//   2. Radial glow      — soft cyan glow blob layered over the canvas
//   3. "// hello world" — small monospace tag line
//   4. Name (h1)        — "Muthukumaran S" with a CSS glitch animation
//   5. TypewriterText   — cycling subtitle: "Full Stack Developer", "API Craftsman" etc.
//   6. Location chip    — "Madurai, Tamil Nadu · Available for work"
//   7. CTA buttons      — "View My Work" + "Download Resume"
//   8. Social links     — GitHub, LinkedIn, Twitter, Email icons
//   9. Scroll indicator — a bouncing chevron at the bottom

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ChevronDown, Download, ArrowRight, Code2 } from 'lucide-react';
import { TypewriterText } from '../ui/TypewriterText';
import { Button } from '../ui/Button';

// ─── ParticleCanvas ──────────────────────────────────────────────────────────
// An internal component that draws a subtle animated background using the
// HTML5 Canvas API. It renders:
//   • A faint cyan grid of horizontal and vertical lines (desktop only).
//   • Small floating dots that move slowly around the canvas.
//   • Thin lines connecting dots that are within 130px of each other.
//
// Everything is drawn inside a requestAnimationFrame loop for smooth 60fps animation.
// The canvas automatically resizes to fill the window on every resize event.
// 
// PERFORMANCE: Optimized for mobile with fewer particles and simplified rendering.
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for prefers-reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if device is mobile (touch-enabled and small screen)
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    
    let raf = 0; // requestAnimationFrame ID

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      a: number;
    }
    let pts: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spawn();
    };

    const spawn = () => {
      // Aggressively reduce particle count on mobile
      let count = Math.min(
        isMobile ? 30 : 80,  // 30 particles on mobile, 80 on desktop
        Math.floor((canvas.width * canvas.height) / (isMobile ? 30000 : 14000))
      );
      
      // Further reduce on very small screens
      if (window.innerWidth < 480) count = Math.min(count, 15);
      
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.28),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.28),
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.45 + 0.08,
      }));
    };

    const draw = () => {
      // Use faster clearRect with optimization hints
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw grid on desktop (skip on mobile to improve performance)
      if (!isMobile && !prefersReducedMotion) {
        ctx.strokeStyle = 'rgba(0,245,255,0.015)'; // Even more subtle
        ctx.lineWidth = 0.5;
        const gs = 70;
        for (let x = 0; x < canvas.width; x += gs) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gs) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.a})`;
        ctx.fill();
      }

      // Draw connection lines (only on desktop, or reduce on mobile)
      if (pts.length > 0) {
        const connectionDistance = isMobile ? 80 : 130; // Shorter connections on mobile
        const step = isMobile ? 2 : 1; // Check every 2nd particle on mobile
        
        for (let i = 0; i < pts.length; i += step) {
          for (let j = i + 1; j < pts.length; j += step) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            
            if (d < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - d / connectionDistance)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: 'contents' }}
      aria-hidden="true"
    />
  );
};

// ─── Social links data ────────────────────────────────────────────────────────
// Rendered as icon buttons at the bottom of the Hero section
const SOCIALS = [
  { icon: <Github size={18} />,   href: 'https://github.com/Muthu031',                         label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/muthukumaran-s/',         label: 'LinkedIn' },
  { icon: <Code2 size={18} />,    href: 'https://leetcode.com/u/iLhxjQqAwz/',              label: 'LeetCode' },
  // { icon: <Twitter size={18} />,  href: 'https://twitter.com/muthukumaran_s',                  label: 'Twitter / X' },
  { icon: <Mail size={18} />,     href: 'mailto:muthukumaran6967@gmail.com',                   label: 'Email' },
];

// ─── Framer Motion animation variants ────────────────────────────────────────
// containerVariants: the parent <div> staggers its children's entrance animations
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

// fadeUp: each child fades in from 32px below its final position
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] } },
};

// ─── Hero Section Component ───────────────────────────────────────────────────
export const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void"
    aria-label="Hero section"
  >
    {/* Animated particle dot-network background */}
    <ParticleCanvas />

    {/* Soft radial glow centred on the content — purely decorative */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.04) 0%, transparent 70%)',
      }}
    />

    {/* Main content container — all children animate in one by one (staggered) */}
    <motion.div
      className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── "// hello world" tag line ── */}
      <motion.div variants={fadeUp} className="mb-6">
        <span className="font-mono text-electric text-sm tracking-[0.3em] uppercase">
          // hello world
        </span>
      </motion.div>

      {/* ── Big name heading with glitch CSS animation ── */}
      {/* data-text is required by the .glitch-text CSS for the pseudo-element content */}
      <motion.h1
        variants={fadeUp}
        className="font-mono font-bold leading-none mb-4"
        style={{ fontSize: 'clamp(2rem, 8vw, 7.5rem)' }} // Fluid font size: 2rem → 7.5rem (better for mobile)
      >
        <span
          className="glitch-text text-cream"
          data-text="Muthukumaran"
        >
          Muthukumaran
        </span>
      </motion.h1>

      {/* ── Typewriter subtitle: cycles through different role descriptions ── */}
      <motion.div variants={fadeUp} className="mb-10">
        <p className="font-mono text-lg md:text-2xl text-muted">
          I craft systems as a{' '}
          <TypewriterText
            texts={[
              'Full Stack Developer',
              'Backend Engineer',
              'System Architect',
              'API Craftsman',
              'Problem Solver',
            ]}
            className="text-electric font-bold"
          />
        </p>
      </motion.div>

      {/* ── Location / availability chip ── */}
      <motion.div variants={fadeUp} className="mb-10 flex justify-center">
        <span className="font-mono text-xs text-muted border border-white/[0.08] px-4 py-1.5 tracking-widest">
          📍 Madurai, Tamil Nadu · Available for work
        </span>
      </motion.div>

      {/* ── CTA Buttons: "View My Work" and "Download Resume" ── */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 xs:gap-4 mb-12 w-full xs:w-auto"
      >
        <Button
          href="#projects"
          variant="primary"
          size="md"
          icon={<ArrowRight size={16} />}
          className="w-full xs:w-auto"
          onClick={() => {
            // Scroll to the projects section when clicked
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View My Work
        </Button>
        <Button
          href="/Muthukumaran S - Nodejs Developer.pdf"
          variant="secondary"
          size="md"
          download                             // Triggers file download instead of navigating
          icon={<Download size={16} />}
          className="w-full xs:w-auto"
          aria-label="Download Resume PDF"
        >
          Download Resume
        </Button>
      </motion.div>

      {/* ── Social icon links ── */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-6"
      >
        {SOCIALS.map(({ icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer" // Prevents new tab from accessing window.opener
            aria-label={label}
            className="text-muted hover:text-electric transition-colors duration-200"
            whileHover={{ y: -4, scale: 1.2 }} // Lifts and grows on hover
            whileTap={{ scale: 0.9 }}
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>

    {/* ── Scroll indicator (animated bouncing chevron at the bottom) ── */}
    {/* Fades in after a 2-second delay so it doesn't compete with the entrance animations */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      aria-hidden="true" // Decorative; screen readers don't need to know about it
    >
      <span className="font-mono text-xs text-subtle tracking-widest uppercase">
        scroll
      </span>
      {/* The chevron bounces up and down on an infinite loop */}
      <motion.div
        className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        animate={{ y: [0, 6, 0] }}                          // Bounces 6px down then back up
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ChevronDown size={12} className="text-electric" />
      </motion.div>
    </motion.div>
  </section>
);

