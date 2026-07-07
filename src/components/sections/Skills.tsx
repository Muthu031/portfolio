import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CircularProgressbar } from "react-circular-progressbar";
import { Zap } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
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

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="grid gap-8 lg:grid-cols-[240px_1fr]"
        >
          <Tabs.List className="flex flex-col gap-2 lg:border-r lg:border-border lg:pr-6">
            {skills.map((category, index) => (
              <Tabs.Trigger
                key={category.id}
                value={category.id}
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
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value={activeTab} forceMount>
            <Panel variant="default" className="p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-display font-bold uppercase tracking-wide text-text">
                  {activeCategory.name}
                </h3>
                <p className="mt-1 text-sm text-textSecondary">
                  XP distribution across {activeCategory.name.toLowerCase()} skills
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 animate-fade-in"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 60, duration: 0.35 }}
                  >
                    <div className="relative h-24 w-24">
                      <CircularProgressbar
                        value={skill.level}
                        strokeWidth={8}
                        styles={{
                          path: { stroke: "#00d4aa", strokeLinecap: "butt" },
                          trail: { stroke: "#21262d" },
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-mono text-textSecondary">
                          LVL {Math.round(skill.level / 10)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-text">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </Panel>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  );
}
