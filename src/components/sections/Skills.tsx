import * as Tabs from "@radix-ui/react-tabs";
import { Package, Server, LayoutGrid, Database, ShieldCheck, Wrench } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { XPRing } from "../ui/XPRing";
import { Tooltip } from "../ui/Tooltip";
import { useInView } from "../../hooks/useInView";
import { skills } from "../../data/skills";
import type { SkillCategory } from "../../types";

const categoryIcons: Record<SkillCategory["icon"], typeof Server> = {
  server: Server,
  layout: LayoutGrid,
  database: Database,
  shield: ShieldCheck,
  wrench: Wrench,
};

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index="LOG_03" title="Inventory" subtitle="Equipped skills, hover any item for mastery notes." icon={<Package className="h-5 w-5" />} />

        <Tabs.Root defaultValue={skills[0].id}>
          <Tabs.List className="mb-8 flex flex-wrap gap-2" aria-label="Skill categories">
            {skills.map((category) => {
              const Icon = categoryIcons[category.icon];
              return (
                <Tabs.Trigger key={category.id} value={category.id} className="hud-tab">
                  <Icon className="h-3.5 w-3.5" />
                  {category.name}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          {skills.map((category) => (
            <Tabs.Content key={category.id} value={category.id} className="animate-fade-in">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill, i) => (
                  <Tooltip key={skill.name} content={skill.detail}>
                    <div
                      className="game-panel flex cursor-help items-center gap-4 p-4"
                      style={{ animationDelay: isInView ? `${i * 60}ms` : undefined }}
                    >
                      <XPRing
                        value={isInView ? skill.level : 0}
                        size={56}
                        strokeWidth={8}
                        color={skill.level >= 90 ? "gold" : "violet"}
                      >
                        <span className="font-mono text-xs font-bold text-text">{skill.level}</span>
                      </XPRing>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text">{skill.name}</p>
                        <p className="text-xs text-textSecondary">{skill.level >= 90 ? "Legendary" : skill.level >= 80 ? "Expert" : "Proficient"}</p>
                      </div>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
