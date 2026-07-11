import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

/** Shared HUD-style section header: "LOG_02" eyebrow, icon chip, title, divider. */
export function SectionHeading({ index, title, subtitle, icon, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent-violet">// {index}</p>
      <div className="flex items-center gap-4">
        {icon && <span className="icon-chip icon-chip-active">{icon}</span>}
        <div>
          <h2 className="text-3xl font-display font-bold tracking-wide uppercase text-text sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-textSecondary">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-5 section-divider" />
    </div>
  );
}
