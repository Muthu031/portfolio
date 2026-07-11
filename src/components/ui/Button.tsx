import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useGameSound } from "../../hooks/useGameSound";

const buttonVariants = cva(
  "game-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-accent-violet text-white hover:brightness-110",
        secondary: "bg-transparent border border-border text-text hover:border-borderHighlight hover:bg-surfaceAlt",
        achievement: "bg-accent-gold text-background hover:brightness-110",
        ghost: "text-textSecondary hover:text-text hover:bg-surfaceAlt",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type BaseProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  /** Set false for icon-only/secondary actions that shouldn't chirp. */
  withSound?: boolean;
};

// framer-motion redefines a handful of DOM event handlers (drag/animation
// lifecycle) with its own gesture-aware signatures — omit them here so the
// plain HTML attribute types don't fight motion.a/motion.button's props.
type MotionConflictingKeys =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit";

type ButtonProps = BaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | MotionConflictingKeys
  >;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, children, withSound = true, onClick, ...props }, ref) => {
    const reducedMotion = useReducedMotion();
    const { play } = useGameSound();

    const handleClick: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement> = (e) => {
      if (withSound) void play("click");
      onClick?.(e);
    };

    const tapAnimation = reducedMotion ? undefined : { scale: 0.96 };
    const sharedClassName = cn(buttonVariants({ variant, size }), className);

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          whileTap={tapAnimation}
          className={sharedClassName}
          onClick={handleClick}
          {...props}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={tapAnimation}
        className={sharedClassName}
        onClick={handleClick}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
