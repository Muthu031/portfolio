import { useEffect } from "react";
import { Trophy, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { useInView } from "../../hooks/useInView";
import { testimonials } from "../../data/testimonials";

interface TestimonialsProps {
  onView?: () => void;
}

export function Testimonials({ onView }: TestimonialsProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (isInView && onView) onView();
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
            <Card
              key={testimonial.id}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="icon-chip-active text-accent-orange font-display font-bold text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
