import { toast } from "sonner";
import { Award, Sparkles } from "lucide-react";
import { Chip } from "./Chip";

interface AchievementOptions {
  title: string;
  description: string;
  variant?: "violet" | "gold";
}

/** Renders one "achievement unlocked" medallion card inside a Sonner toast slot. */
function AchievementCard({ title, description, variant = "gold" }: AchievementOptions) {
  const accent = variant === "gold" ? "text-accent-gold" : "text-accent-violet";
  const topBar = variant === "gold" ? "from-accent-gold via-amber-200 to-accent-gold" : "from-accent-violet via-violet-300 to-accent-violet";

  return (
    <div className="w-80 max-w-[calc(100vw-2rem)] overflow-hidden border border-borderHighlight bg-surfaceHighlight shadow-2xl shadow-black/50 animate-toast-enter">
      <div className={`h-1 w-full bg-gradient-to-r ${topBar}`} />
      <div className="flex items-start gap-3 p-4">
        <Chip variant={variant === "gold" ? "achievement" : "active"} size="lg">
          {variant === "gold" ? <Award className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </Chip>
        <div className="flex-1">
          <p className={`text-xs font-display font-bold uppercase tracking-wider ${accent}`}>Achievement Unlocked</p>
          <p className="mt-0.5 text-sm font-semibold text-text">{title}</p>
          <p className="mt-0.5 text-xs text-textSecondary">{description}</p>
        </div>
      </div>
    </div>
  );
}

/** Fire an achievement-unlock toast — auto-dismisses after ~4.5s, or manually dismissible. */
export function showAchievementToast({ title, description, variant = "gold" }: AchievementOptions) {
  toast.custom(() => <AchievementCard title={title} description={description} variant={variant} />, {
    duration: 4500,
  });
}
