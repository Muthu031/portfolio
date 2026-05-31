// ─── Experience Section ──────────────────────────────────────────────────────
// Shows a vertical timeline of professional experience entries.
//
// Layout:
//   1. Section heading  — "// 04  Experience"
//   2. Timeline
//        • Animated vertical line (cyan → gold gradient) drawn via scaleY
//          when the timeline first scrolls into view
//        • One <article> per experience entry:
//            - Left:  circular lettermark node (coloured per entry)
//            - Right: job title, company, date range, achievement bullet list
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';

// ─── Experience Section Component ───────────────────────────────────────────
export const Experience: React.FC = () => {
  // lineRef is attached to the timeline container.
  // When it enters the viewport, lineInView becomes true and the vertical line animates.
  const { ref: lineRef, inView: lineInView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="py-28 bg-panel/40" aria-label="Experience section">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-electric text-sm tracking-widest">// 04</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-cream">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
        </motion.div>

        {/* ── Vertical timeline ── */}
        <div className="relative" ref={lineRef}>
          {/* Background track (white/6%) with an animated gradient overlay that grows downwards */}
          <div
            className="absolute left-[27px] top-0 bottom-0 w-px bg-white/[0.06]"
            aria-hidden="true"
          >
            {/* scaleY starts at 0 and animates to 1 once the timeline is in view */}
            <motion.div
              className="w-full origin-top"
              style={{ background: 'linear-gradient(to bottom, #00f5ff, #ffb800, transparent)' }}
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />
          </div>

          {/* One article per job, staggered entrance from the left */}
          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.id}
                className="flex gap-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`${exp.title} at ${exp.company}`}
              >
                {/* Left: circular timeline node coloured with the experience's accent colour */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 z-10 relative"
                    style={{
                      background:   `${exp.color}15`, // Tinted background
                      borderColor:  exp.color,
                      color:        exp.color,
                      boxShadow:    `0 0 20px ${exp.color}20`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {exp.lettermark} {/* e.g. "SW" for Skandvel Webtech */}
                  </motion.div>
                </div>

                {/* Right: title, date badge, company name, achievement bullets */}
                <div className="flex-1 pt-2 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="font-mono font-bold text-cream text-lg">{exp.title}</h3>
                    <span
                      className="font-mono text-xs tracking-widest px-3 py-1 border self-start sm:self-auto"
                      style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}08` }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    className="font-mono text-sm mb-5 font-semibold"
                    style={{ color: exp.color }}
                  >
                    @ {exp.company}
                  </p>

                  {/* Achievement bullet list — each item slides in from the left with a delay */}
                  <ul className="flex flex-col gap-3" aria-label={`Achievements at ${exp.company}`}>
                    {exp.achievements.map((achievement, ai) => (
                      <motion.li
                        key={ai}
                        className="flex items-start gap-3 text-muted text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + ai * 0.1 + 0.3 }}
                      >
                        {/* Coloured tick icon matches the experience colour */}
                        <CheckCircle2
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: exp.color }}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
