import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: "teal" | "orange";
}

export function Badge({ children, className, color = "teal" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surfaceAlt px-2.5 py-1 text-xs font-medium font-mono",
        color === "teal" ? "text-accent-teal" : "text-accent-orange",
        className
      )}
    >
      {children}
    </span>
  );
}
