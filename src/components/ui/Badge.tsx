import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-1 text-xs font-medium font-mono",
  {
    variants: {
      variant: {
        default: "border-border bg-surfaceAlt text-textSecondary",
        teal: "border-accent-teal/40 bg-accent-teal/10 text-accent-teal",
        orange: "border-accent-orange/40 bg-accent-orange/10 text-accent-orange",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
