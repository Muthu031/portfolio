import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { XPRing } from "../ui/XPRing";
import { cn } from "../../lib/utils";

/** Floating "level ring" pinned to the corner — a circular alternative to the top HUD bar, per the brief. */
export function ScrollProgressRing() {
  const progress = useScrollProgress();
  const visible = progress > 4;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={cn(
        // Hidden below sm: the navbar's segmented bar already shows scroll
        // progress there, and the small viewport has no room to spare
        // without colliding with the achievement-toast stack.
        "fixed bottom-6 right-6 z-30 hidden transition-all duration-300 sm:block",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      )}
    >
      <XPRing value={progress} size={56} strokeWidth={10} color="gold" className="drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        <ArrowUp className="h-4 w-4 text-text" />
      </XPRing>
    </button>
  );
}
