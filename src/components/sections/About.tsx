// ─── About Section ────────────────────────────────────────────────────────────
// Shows a personal introduction with:
//   1. Section heading  — "// 01  About Me"
//   2. Split layout:
//        Left  — hexagonal profile photo with a floating badge
//        Right — bio paragraphs + personality trait chips
//   3. Stats grid       — animated count-up cards (years, products, stacks, coffee)
//   4. Career timeline  — vertical line with emoji dots + milestone descriptions
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Stat, TimelineMilestone } from '../../types';

// ─── Static data ──────────────────────────────────────────────────────────────

// Four highlight numbers shown in the stats grid
const STATS: Stat[] = [
  { numericValue: 2,  prefix: '', suffix: '+', label: 'Years Experience' },
  { numericValue: 5,  prefix: '', suffix: '+', label: 'Products Shipped' },
  { numericValue: 8,  prefix: '', suffix: '+', label: 'Tech Stacks' },
  { numericValue: 0,  prefix: '∞', suffix: '', label: 'Coffee Consumed' }, // numericValue 0 means "just show the prefix"
];

// Four career turning points shown in the timeline
const MILESTONES: TimelineMilestone[] = [
  {
    "year": "2019 - 2023",
    "title": "B.Tech Journey Begins",
    "description": "completed  my Information Technology UG at Jayaraj Annapackiam CSI College. Wrote my first lines of JavaScript and immediately knew this was the path.",
    "emoji": "🚀"
  },
  {
    "year": "2024 - 2025",
    "title": "First Professional Role",
    "description": "Joined Skandvel Webtech as a Full-Stack Developer. Shipped production code for UK enterprise clients from week one — Node.js, TypeScript, PostgreSQL at scale.",
    "emoji": "⚡"
  },
  {
    "year": "2025 - 2026",
    "title": "International Client Work",
    "description": "software development on ConnectMe — a complex multi-tenant service platform for UK enterprise. Designed workflows, optimised DB performance, and shipped zero critical incidents.",
    "emoji": "🌐"
  }
];

// Short "personality chip" labels shown under the bio text
const TRAITS = [
  'Node.js Specialist',
  'API Craftsman',
  'PostgreSQL Optimizer',
  'TypeScript Strict Mode',
  'System Design',
  'Data Structures & Algorithms',
  'Clean Code Advocate',
  'Auth & Security Minded',
  'Ship & Iterate',
];

// ─── CountUp Component ────────────────────────────────────────────────────────
// Animates a number from 0 up to `target` using requestAnimationFrame.
// Only starts once `inView` becomes true (i.e., the stat card is visible on screen).
// Uses a cubic ease-out curve so the number slows down near the end.
const CountUp: React.FC<{ target: number; inView: boolean; duration?: number }> = ({
  target,
  inView,
  duration = 1800, // Total animation time in milliseconds
}) => {
  const [count, setCount] = useState(0);
  const started = useRef(false); // Prevent restarting the animation if the component re-renders

  useEffect(() => {
    // Don't start if not visible yet, already started, or target is 0 (∞ case)
    if (!inView || started.current || target === 0) {
      if (target === 0) setCount(0);
      return;
    }
    started.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);     // 0 → 1 linear progress
      const ease     = 1 - Math.pow(1 - progress, 3);       // Cubic ease-out
      setCount(Math.round(ease * target));                   // Round to nearest integer
      if (progress < 1) requestAnimationFrame(tick);        // Keep going until done
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <>{count}</>;
};

// ─── Animation variant ────────────────────────────────────────────────────────
// Standard fade-up used for the section header, bio, and timeline
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] } },
};

// ─── About Section Component ──────────────────────────────────────────────────
export const About: React.FC = () => {
  // statsRef is attached to the stats grid so we know when it enters the viewport
  // and can trigger the CountUp animations
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="py-20 xs:py-28 bg-void" aria-label="About section">
      <div className="max-w-7xl mx-auto px-4 xs:px-6">

        {/* ── Section heading: "// 01  About Me" ── */}
        <motion.div
          className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-16 xs:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-mono text-electric text-xs xs:text-sm tracking-widest">// 01</span>
          <h2 className="font-mono text-2xl xs:text-3xl md:text-4xl font-bold text-cream">About Me</h2>
          {/* Decorative gradient line to the right of the heading */}
          <div className="hidden xs:flex flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
        </motion.div>

        {/* ── Two-column split: photo (left) + bio (right) ── */}
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 lg:gap-24 items-start mb-20 xs:mb-24">

          {/* Left column: profile photo in a hexagonal clip-path frame */}
          <motion.div
            className="flex justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* The hexagonal shape is achieved with CSS clip-path */}
              <div
                className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
                style={{
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Muthukumaran S — Full-Stack Developer"
                  className="loaded w-full h-full object-cover object-[center_30%]"
                  loading="lazy"
                  onLoad={(e) => e.currentTarget.classList.add('loaded')}
                />
              </div>

              {/* Glow ring: a slightly larger hexagon behind the photo filled with a gradient */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(255,184,0,0.12))',
                  transform: 'scale(1.06)', // 6% bigger than the photo
                }}
                aria-hidden="true"
              />

              {/* Accent border ring: another hexagon with a subtle box-shadow glow */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                  background: 'transparent',
                  outline: '2px solid rgba(0,245,255,0.3)',
                  transform: 'scale(1.03)',
                  boxShadow: '0 0 40px rgba(0,245,255,0.15)',
                }}
                aria-hidden="true"
              />

              {/* Floating badge that gently bobs up and down */}
              <motion.div
                className="absolute -bottom-18 left-1/2 -translate-x-1/2 bg-card border border-electric/24 px-4 py-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                <span className="font-mono text-xs text-electric">{'<2+yr />'} Full-Stack</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column: bio paragraphs + personality trait chips */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-cream/90 text-lg leading-relaxed">
              I'm Muthukumaran S, a Full-Stack Developer from Madurai, Tamil Nadu with 2+ years of
              hands-on experience building scalable web applications for enterprise clients. My
              primary stack is Node.js, TypeScript, React.js, and PostgreSQL — and I care deeply
              about writing code that's clean, performant, and maintainable in production.
            </p>
            <p className="text-muted leading-relaxed">
              At Skandvel Webtech I've delivered production systems for UK enterprise clients —
              multi-tenant platforms, real-time bidding apps, high-stakes exam systems — each
              with strict SLA requirements. I'm as comfortable designing a PostgreSQL indexing
              strategy as I am building a React UI or debugging a WebSocket race condition.
            </p>
            <p className="text-muted leading-relaxed">
              I got hooked on engineering during my B.Tech in IT, where I built an attendance
              automation system from scratch as my capstone. That project taught me full-stack
              ownership end-to-end — and I've never looked back. I'm now looking for a role
              where I can take on bigger systems and keep growing fast.
            </p>

            {/* Personality trait chips — small bordered label pills */}
            <div className="flex flex-wrap gap-2 mt-2" aria-label="Personality traits">
              {TRAITS.map((trait) => (
                <motion.span
                  key={trait}
                  className="font-mono text-xs px-3 py-1.5 border border-white/[0.08] text-muted hover:border-electric/40 hover:text-electric transition-all duration-200"
                  whileHover={{ scale: 1.04, y: -2 }} // Slight pop on hover
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats grid: 4 animated number cards ── */}
        {/* ref is attached here so useInView fires when this row becomes visible */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-panel border border-white/[0.06] p-6 text-center group hover:border-electric/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }} // Cards stagger in
              whileHover={{ y: -4 }}
            >
              {/* Large animated number */}
              <div className="font-mono text-4xl font-bold text-electric mb-1 group-hover:drop-shadow-[0_0_12px_rgba(0,245,255,0.6)] transition-all duration-300">
                {stat.prefix}
                {stat.numericValue > 0 ? (
                  // CountUp animates from 0 to the target number
                  <CountUp target={stat.numericValue} inView={statsInView} />
                ) : (
                  '' // For the ∞ stat, numericValue is 0 so we show nothing here (prefix handles it)
                )}
                {stat.suffix}
              </div>
              {/* Label below the number */}
              <div className="font-mono text-xs text-muted tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Career timeline ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="font-mono text-xl font-bold text-cream mb-10">
            <span className="text-electric">{'// '}</span>Career Milestones
          </h3>
          <div className="relative">
            {/* Vertical connecting line that runs behind all the milestone dots */}
            <div
              className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-electric/40 via-electric/10 to-transparent"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex gap-8 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }} // Stagger each milestone
                >
                  {/* Left: circular dot with the milestone emoji */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-14 h-14 rounded-full bg-card border border-electric/30 flex items-center justify-center text-2xl z-10 relative">
                      {m.emoji}
                    </div>
                    {/* Soft glow behind the dot */}
                    <div className="absolute inset-0 rounded-full bg-electric/5 blur-sm" aria-hidden="true" />
                  </div>

                  {/* Right: year, title, description */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-electric tracking-widest">{m.year}</span>
                      <h4 className="font-mono font-bold text-cream">{m.title}</h4>
                    </div>
                    <p className="text-muted text-sm leading-relaxed max-w-lg">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
