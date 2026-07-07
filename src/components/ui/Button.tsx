import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-accent-teal text-background hover:brightness-110 active:scale-95",
    secondary:
      "bg-transparent border border-border text-text hover:border-borderHighlight hover:bg-surfaceAlt active:scale-95",
    ghost:
      "text-textSecondary hover:text-text hover:bg-surfaceAlt",
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
