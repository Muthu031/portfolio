import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const chipVariants = cva(
  "inline-flex h-9 w-9 items-center justify-center border transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-surfaceAlt text-textSecondary",
        active: "border-accent-teal text-accent-teal bg-accent-teal/10",
        achievement: "border-accent-orange text-accent-orange bg-accent-orange/10",
      },
      size: {
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
