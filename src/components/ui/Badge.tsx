import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex items-center border px-2.5 py-1 text-xs font-medium font-mono", {
  variants: {
    variant: {
      default: "border-border bg-surfaceAlt text-textSecondary",
      violet: "border-accent-violet/40 bg-accent-violet/10 text-accent-violet",
      gold: "border-accent-gold/40 bg-accent-gold/10 text-accent-gold",
      danger: "border-accent-danger/40 bg-accent-danger/10 text-accent-danger",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
