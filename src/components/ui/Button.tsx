import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-teal text-background hover:brightness-110 active:scale-95",
        secondary:
          "bg-transparent border border-border text-text hover:border-borderHighlight hover:bg-surfaceAlt active:scale-95",
        ghost:
          "text-textSecondary hover:text-text hover:bg-surfaceAlt",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const Component = href ? "a" : "button";
    return (
      <Component
        ref={ref as any}
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
