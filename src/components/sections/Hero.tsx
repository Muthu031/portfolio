import { useEffect } from "react";
import { ChevronDown, Play, User, Zap } from "lucide-react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useInView } from "../../hooks/useInView";
import { Button } from "../ui/Button";

interface HeroProps {
  onView?: () => void;
}

export function Hero({ onView }: HeroProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const typewriterText = useTypewriter();

  useEffect(() => {
    if (isInView && onView) onView();
  }, [isInView, onView]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,170,0.12),transparent_55%)]" />

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-8 inline-flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-2.5">
          <span className="icon-chip-active">
            <User className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium text-textSecondary">
            <span className="text-accent-teal">Player:</span> Muthukumaran S
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="text-sm font-medium text-textSecondary">
            <span className="text-accent-orange">Class:</span> Full-Stack Developer
          </span>
        </div>

        <h1 className="text-5xl font-display font-bold tracking-wide uppercase text-text sm:text-6xl md:text-7xl lg:text-8xl">
          Muthukumaran{" "}
          <span className="bg-gradient-to-r from-accent-teal to-accent-orange bg-clip-text text-transparent">
            S
          </span>
        </h1>

        <p className="mt-6 text-lg font-medium text-textSecondary sm:text-xl">
          Full-Stack Developer
        </p>

        <div className="mt-8 h-8 sm:h-10">
          <p className="font-mono text-sm text-textSecondary sm:text-base">
            <span className="text-accent-teal">&gt;</span> {typewriterText}
            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-accent-teal sm:h-5 sm:w-1" />
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            <Play className="h-4 w-4" />
            Start Playing
          </Button>
          <Button href="#contact" variant="secondary">
            <Zap className="h-4 w-4" />
            View Quest Log
          </Button>
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-textSecondary hover:text-text transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
