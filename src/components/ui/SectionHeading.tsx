import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  icon,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <span className="icon-chip">
            {icon}
          </span>
        )}
        <div>
          <h2 className="text-3xl font-display font-bold tracking-wide uppercase text-text">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-textSecondary">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mt-4 section-divider" />
    </div>
  );
}
