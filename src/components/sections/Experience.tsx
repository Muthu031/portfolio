import { motion } from "framer-motion";
import { Swords, Plus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
import { Badge } from "../ui/Badge";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { experience } from "../../data/experience";
import { difficultyClasses, formatPeriod } from "../../lib/utils";

export function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  const stagger = { hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.4 } },
  };

  return (
    <section id="experience" ref={ref} className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index="LOG_01" title="Quest Log" subtitle="Completed and in-progress work assignments." icon={<Swords className="h-5 w-5" />} />

        <motion.ol
          className="relative space-y-8 border-l border-border pl-8 sm:pl-10"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {experience.map((job) => (
            <motion.li key={job.id} variants={item} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-accent-violet bg-background shadow-[0_0_10px_rgba(124,92,255,0.6)] sm:-left-[calc(2.5rem+5px)]" />

              <Panel hoverable className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-text">{job.role}</h3>
                    <p className="text-sm text-accent-violet">{job.company} · {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className={difficultyClasses(job.difficulty)}>
                      {job.difficulty}
                    </Badge>
                    <span className="font-mono text-xs text-textSecondary">{formatPeriod(job.start, job.end)}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-textSecondary">{job.description}</p>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-text">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-accent-gold/15 text-accent-gold">
                        <Plus className="h-3 w-3" />
                      </span>
                      {highlight}
                      <span className="ml-auto shrink-0 font-mono text-xs text-accent-gold">+XP</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  {job.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Panel>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
