import { cn } from "../../lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: "teal" | "orange";
  segmented?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
  color = "teal",
  segmented = false,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const segments = segmented ? 10 : 1;
  const filledSegments = Math.round((percentage / 100) * segments);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-textSecondary">
          <span className="uppercase tracking-wider">{label}</span>
          <span className="font-mono text-accent-teal">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-sm transition-all duration-300",
              i < filledSegments
                ? color === "teal"
                  ? "bg-accent-teal shadow-[0_0_6px_rgba(0,212,170,0.4)]"
                  : "bg-accent-orange shadow-[0_0_6px_rgba(240,136,62,0.4)]"
                : "bg-surfaceAlt border border-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
