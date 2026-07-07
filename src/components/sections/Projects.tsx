import { useState, useEffect } from "react";
import { ExternalLink, Sword } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/utils";
import { projects } from "../../data/projects";

interface ProjectsProps {
  onView?: () => void;
}

export function Projects({ onView }: ProjectsProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (isInView && onView) onView();
  }, [isInView, onView]);

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-32 bg-surface/50">
      <div className="container">
        <SectionHeading
          title="Boss Battles"
          subtitle="Select a level to inspect its loadout"
          icon={<Sword className="h-5 w-5" />}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            return (
              <Card
                key={project.id}
                hoverable
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-display font-bold uppercase tracking-wide text-text group-hover:text-accent-teal transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-textSecondary">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-chip hover:border-accent-teal hover:text-accent-teal transition-colors"
                          aria-label="GitHub"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-chip hover:border-accent-teal hover:text-accent-teal transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-4 grid transition-all duration-300",
                      isHovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-textSecondary mb-2">
                          Loadout
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-accent-teal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Sword className="h-3.5 w-3.5" />
                    Inspect loadout
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
