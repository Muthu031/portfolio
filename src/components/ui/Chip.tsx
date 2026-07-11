import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const chipVariants = cva("icon-chip", {
  variants: {
    variant: {
      default: "",
      active: "icon-chip-active",
      achievement: "icon-chip-gold",
      danger: "border-accent-danger text-accent-danger bg-accent-danger/10",
    },
    size: {
      sm: "h-7 w-7",
      md: "h-9 w-9",
      lg: "h-11 w-11",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({ className, variant, size, ...props }, ref) => (
  <span ref={ref} className={cn(chipVariants({ variant, size }), className)} {...props} />
));
Chip.displayName = "Chip";
