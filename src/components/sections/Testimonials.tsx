import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Quote } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { showAchievementToast } from "../ui/AchievementToast";
import { testimonials } from "../../data/testimonials";
import type { Testimonial } from "../../types";

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [ref, isInView] = useInView({ threshold: 0.4 });
  const reducedMotion = useReducedMotion();

  // Each endorsement unlocks its own achievement toast the moment it scrolls
  // into view — once per card per page load (useInView triggerOnce keeps this from re-firing).
  useEffect(() => {
    if (isInView) {
      showAchievementToast({
        title: `Endorsed by ${testimonial.name}`,
        description: `${testimonial.role} at ${testimonial.company}`,
        variant: "gold",
      });
    }
  }, [isInView, testimonial]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <Panel variant="achievement" hoverable className="relative h-full p-6">
        <Quote className="absolute right-5 top-5 h-8 w-8 text-accent-gold/15" />
        <p className="text-sm leading-relaxed text-textSecondary">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-accent-gold bg-accent-gold/10 font-display font-bold text-accent-gold">
            {testimonial.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{testimonial.name}</p>
            <p className="text-xs text-textSecondary">{testimonial.role} · {testimonial.company}</p>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}

export function Testimonials() {
  const [headingRef, headingInView] = useInView({ threshold: 0.2 });

  return (
    <section id="testimonials" ref={headingRef} className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          index="LOG_04"
          title="Achievements Unlocked"
          subtitle="Endorsements collected from colleagues and clients."
          icon={<Trophy className="h-5 w-5" />}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>

        <p className={`mt-6 text-center font-mono text-xs text-textSecondary transition-opacity duration-500 ${headingInView ? "opacity-100" : "opacity-0"}`}>
          {testimonials.length} / {testimonials.length} achievements unlocked
        </p>
      </div>
    </section>
  );
}
