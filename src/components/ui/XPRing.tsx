import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { cn } from "../../lib/utils";

interface XPRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: "violet" | "gold";
  className?: string;
  children?: React.ReactNode;
}

const COLORS = {
  violet: "#7c5cff",
  gold: "#ffc857",
};

/** Radial "XP ring" used for skill mastery and the pinned scroll-progress indicator. */
export function XPRing({ value, size = 64, strokeWidth = 9, color = "violet", className, children }: XPRingProps) {
  return (
    <div style={{ width: size, height: size }} className={cn("shrink-0", className)}>
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: COLORS[color],
          trailColor: "rgba(255,255,255,0.06)",
          pathTransitionDuration: 0.6,
        })}
      >
        {children}
      </CircularProgressbarWithChildren>
    </div>
  );
}
