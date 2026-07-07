import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { ProgressBar } from "../ui/ProgressBar";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/utils";
import { skills } from "../../data/skills";

interface SkillsProps {
  onView?: () => void;
}

export function Skills({ onView }: SkillsProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [activeTab, setActiveTab] = useState(skills[0].id);

  useEffect(() => {
    if (isInView && onView) onView();
  }, [isInView, onView]);

  const activeCategory = skills.find((s) => s.id === activeTab) ?? skills[0];

  return (
    <section id="skills" ref={ref} className="py-20 sm:py-32">
      <div className="container">
        <SectionHeading
          title="Inventory"
          subtitle="Skill tree and loadout stats"
          icon={<Zap className="h-5 w-5" />}
        />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="flex flex-col gap-2 lg:border-r lg:border-border lg:pr-6">
            {skills.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 animate-fade-in",
                  activeTab === category.id
                    ? "bg-accent-teal/10 text-accent-teal"
                    : "text-textSecondary hover:bg-surfaceAlt hover:text-text"
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span
                  className={cn(
                    "flex h-2 w-2 rounded-full transition-colors",
                    activeTab === category.id ? "bg-accent-teal shadow-[0_0_6px_rgba(0,212,170,0.6)]" : "bg-border"
                  )}
                />
                {category.name}
              </button>
            ))}
          </div>

          <div>
            <div className="game-panel p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-display font-bold uppercase tracking-wide text-text">
                  {activeCategory.name}
                </h3>
                <p className="mt-1 text-sm text-textSecondary">
                  XP distribution across {activeCategory.name.toLowerCase()} skills
                </p>
              </div>

              <div className="space-y-5">
                {activeCategory.skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-accent-teal">
                        LVL {Math.round(skill.level / 10)}
                      </span>
                    </div>
                    <ProgressBar value={skill.level} color="teal" segmented />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
