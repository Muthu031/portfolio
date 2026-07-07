import { useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Chip } from "../ui/Chip";
import { Panel } from "../ui/Panel";
import { useInView } from "../../hooks/useInView";
import { experience } from "../../data/experience";

interface ExperienceProps {
  onView?: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Experience({ onView }: ExperienceProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (isInView && onView) onView();
  }, [isInView, onView]);

  return (
    <section id="experience" ref={ref} className="py-20 sm:py-32">
      <div className="container">
        <SectionHeading
          title="Quest Log"
          subtitle="Completed stages and milestones"
          icon={<Briefcase className="h-5 w-5" />}
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border sm:block md:left-6" />

          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {experience.map((entry) => (
              <motion.div
                key={entry.id}
                className="relative flex gap-6 sm:gap-8"
                variants={item}
              >
                <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center">
                  <Chip variant="active" size="lg">
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                  </Chip>
                </div>

                <div className="flex-1 pb-8">
                  <Panel variant="default" hoverable className="p-5 sm:p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-display font-bold uppercase tracking-wide text-text">
                          {entry.role}
                        </h3>
                        <p className="text-sm font-medium text-accent-teal">
                          {entry.company}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-md bg-surfaceAlt px-2.5 py-1 text-xs font-mono text-textSecondary border border-border">
                        {entry.period}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-textSecondary">
                      {entry.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-textSecondary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal shadow-[0_0_4px_rgba(0,212,170,0.5)]" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
