// ─── Testimonials Section ─────────────────────────────────────────────────────
// An auto-advancing carousel of client/colleague testimonials.
//
// Features:
//   • AnimatePresence carousel — cards slide in/out left or right depending on direction
//   • Auto-advance every 6 seconds via setInterval
//   • Manual controls: dot nav (bottom left) + prev/next buttons (bottom right)
//   • direction state (1 or -1) drives the enter/exit slide direction
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

// ─── Testimonials Section Component ──────────────────────────────────────────
export const Testimonials: React.FC = () => {
  const [current,   setCurrent]   = useState(0);  // Index of the currently visible testimonial
  const [direction, setDirection] = useState(1);  // 1 = sliding forward (right), -1 = sliding back (left)
  const count = testimonials.length;

  // goTo: jump to any testimonial by index and record which direction we moved
  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent((idx + count) % count); // Wraps around using modulo
    },
    [count]
  );

  // Convenience wrappers for forward / backward navigation
  const next = useCallback(() => goTo(current + 1,  1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance: move to the next testimonial every 6 seconds
  // The interval is reset any time `next` changes (i.e. when current changes)
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t); // Cleanup on unmount or re-run
  }, [next]);

  // AnimatePresence variants — the `custom` prop passes direction (1 or -1)
  const variants = {
    // enter: the card starts off-screen left (if going back) or right (if going forward)
    enter: (d: number) => ({
      x:       d > 0 ? 120 : -120,
      opacity: 0,
      scale:   0.95,
    }),
    // center: the active card is fully visible
    center: {
      x:       0,
      opacity: 1,
      scale:   1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] },
    },
    // exit: the old card leaves to the opposite side
    exit: (d: number) => ({
      x:       d > 0 ? -120 : 120,
      opacity: 0,
      scale:   0.95,
      transition: { duration: 0.35, ease: 'easeIn' },
    }),
  };

  // Shorthand for the currently displayed testimonial object
  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-28 bg-void" aria-label="Testimonials section">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-electric text-sm tracking-widest">// 05</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-cream">What People Say</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          role="region"
          aria-label="Testimonials carousel"
          aria-roledescription="carousel"
        >
          {/* Quote mark decoration */}
          <Quote
            size={64}
            className="absolute -top-4 -left-2 text-electric/10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${current + 1} of ${count}`}
              >
                <div className="bg-card border border-white/[0.06] p-8 md:p-12 h-full flex flex-col justify-between hover:border-electric/15 transition-colors duration-300">
                  {/* Quote */}
                  <blockquote className="text-cream/90 text-lg leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </blockquote>

                  {/* Author */}
                  <footer className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                      style={{ background: `${t.avatarColor}20`, color: t.avatarColor, border: `1px solid ${t.avatarColor}30` }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <cite className="font-mono font-bold text-cream not-italic">{t.name}</cite>
                      <p className="font-mono text-xs text-muted">
                        {t.title} · {t.company}
                      </p>
                    </div>
                  </footer>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation controls ── */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot navigation: one dot per testimonial; active dot stretches to 24px wide */}
            <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="transition-all duration-300"
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:   i === current ? '24px' : '8px',
                      height:  '8px',
                      background: i === current ? '#00f5ff' : 'rgba(255,255,255,0.15)',
                      boxShadow: i === current ? '0 0 8px rgba(0,245,255,0.5)' : 'none',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3">
              <motion.button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-muted hover:border-electric/40 hover:text-electric transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-muted hover:border-electric/40 hover:text-electric transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
