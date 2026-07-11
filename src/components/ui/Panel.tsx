import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const panelVariants = cva("game-panel p-6", {
  variants: {
    variant: {
      default: "border-border",
      achievement: "border-accent-gold/30 shadow-[0_0_24px_rgba(255,200,87,0.08)]",
      hud: "border-border bg-surface/80 backdrop-blur-sm",
      danger: "border-accent-danger/30 shadow-[0_0_24px_rgba(255,92,110,0.08)]",
    },
    hoverable: {
      true: "hover:border-accent-violet/40 hover:shadow-[0_0_24px_rgba(124,92,255,0.14)] cursor-default",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    hoverable: false,
  },
});

export interface PanelProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof panelVariants> {}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(({ className, variant, hoverable, ...props }, ref) => (
  <div ref={ref} className={cn(panelVariants({ variant, hoverable }), className)} {...props} />
));
Panel.displayName = "Panel";
