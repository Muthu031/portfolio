import { useEffect, useRef } from "react";
import { Trophy, Star } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
import { Chip } from "../ui/Chip";
import { useInView } from "../../hooks/useInView";
import { testimonials } from "../../data/testimonials";

interface TestimonialsProps {
  onView?: () => void;
}

export function Testimonials({ onView }: TestimonialsProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const hasFired = useRef(false);

  useEffect(() => {
    if (isInView && !hasFired.current && onView) {
      hasFired.current = true;
      onView();
      toast.custom(() => (
        <div className="flex items-start gap-3 overflow-hidden rounded-lg border border-border bg-surface p-4 shadow-2xl shadow-black/40">
          <div className="h-1 w-full bg-gradient-to-r from-accent-teal via-accent-orange to-accent-teal absolute top-0 left-0" />
          <Chip variant="achievement" className="mt-1">
            <Trophy className="h-4 w-4" />
          </Chip>
          <div className="flex-1">
            <p className="text-sm font-display font-bold uppercase tracking-wider text-accent-teal">
              Achievement Unlocked
            </p>
            <p className="text-sm font-semibold text-text">Guild Reviews Discovered</p>
            <p className="text-xs text-textSecondary">Achievements from your allies.</p>
          </div>
        </div>
      ), { duration: 4000 });
    }
  }, [isInView, onView]);

  return (
    <section id="testimonials" ref={ref} className="py-20 sm:py-32 bg-surface/50">
      <div className="container">
        <SectionHeading
          title="Guild Reviews"
          subtitle="Achievements unlocked with past allies"
          icon={<Trophy className="h-5 w-5" />}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Panel
              key={testimonial.id}
              variant="achievement"
              hoverable
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <Chip variant="achievement" className="text-accent-orange font-display font-bold text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Chip>
                <div>
                  <p className="text-sm font-display font-bold uppercase tracking-wide text-text">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-textSecondary">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-textSecondary">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent-orange fill-accent-orange" />
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
