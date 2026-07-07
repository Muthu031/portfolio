import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const panelVariants = cva(
  "relative border bg-surface p-6 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "game-panel border-border",
        achievement:
          "game-panel border-accent-orange/30 bg-surface shadow-[0_0_24px_rgba(240,136,62,0.08)]",
        hud:
          "game-panel border-border bg-surface/90 backdrop-blur-sm",
      },
      hoverable: {
        true: "hover:border-accent-teal/40 hover:shadow-[0_0_24px_rgba(0,212,170,0.12)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hoverable: false,
    },
  }
);

interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(panelVariants({ variant, hoverable }), className)}
        {...props}
      />
    );
  }
);
Panel.displayName = "Panel";

export { Panel, panelVariants };
