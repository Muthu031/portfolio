import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "game-panel",
        hoverable && "hover:border-accent-teal/40 hover:shadow-[0_0_24px_rgba(0,212,170,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
