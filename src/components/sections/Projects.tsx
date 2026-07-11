import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Boxes, ExternalLink, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GithubIcon } from "../icons/BrandIcons";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { projects } from "../../data/projects";
import { bossTierStyle } from "../../lib/utils";

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  const stagger = { hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.45 } },
  };

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index="LOG_02" title="Boss Battles" subtitle="Production projects shipped, ranked by difficulty tier." icon={<Boxes className="h-5 w-5" />} />

        <motion.div className="grid gap-6 md:grid-cols-2" variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"}>
          {projects.map((project) => {
            const tierStyle = bossTierStyle(project.tier);
            return (
              <motion.div key={project.id} variants={item}>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={!reducedMotion}
                  glareMaxOpacity={0.12}
                  glareColor="#7c5cff"
                  glarePosition="all"
                  transitionSpeed={1200}
                  className="h-full"
                >
                  <Panel hoverable className={`relative h-full p-6 ${tierStyle.border} ${tierStyle.glow}`}>
                    {project.featured && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 border border-accent-gold/40 bg-accent-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                        <Star className="h-3 w-3 fill-current" /> Featured
                      </span>
                    )}

                    <span className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${tierStyle.text}`}>
                      {project.tier} Tier
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-text">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-textSecondary">{project.description}</p>

                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-wider text-textSecondary">
                        <span>Impact</span>
                        <span className={`font-mono ${tierStyle.text}`}>{project.impact}%</span>
                      </div>
                      <div className="h-2 w-full border border-border bg-background">
                        <div
                          className="h-full bg-gradient-to-r from-accent-violet to-accent-gold transition-all duration-700"
                          style={{ width: `${project.impact}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="border border-border bg-background/40 px-2 py-2 text-center">
                          <p className="font-display text-sm font-bold text-text">{metric.value}</p>
                          <p className="text-[9px] uppercase tracking-wider text-textSecondary">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3 border-t border-border pt-4">
                      {project.link && (
                        <Button href={project.link} size="sm" variant="primary" className="flex-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Engage
                        </Button>
                      )}
                      {project.github && (
                        <Button href={project.github} size="sm" variant="secondary" className="flex-1" withSound={false}>
                          <GithubIcon className="h-3.5 w-3.5" />
                          Intel
                        </Button>
                      )}
                    </div>
                  </Panel>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
