import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface AchievementToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

export function AchievementToast({
  title,
  description,
  onClose,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-sm overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/40 transition-all duration-300",
        isVisible ? "toast-enter" : "translate-y-4 opacity-0"
      )}
      role="alert"
    >
      <div className="h-1 w-full bg-gradient-to-r from-accent-teal via-accent-orange to-accent-teal" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="icon-chip-active shrink-0">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-display font-bold uppercase tracking-wider text-accent-teal">
              Achievement Unlocked
            </p>
            <p className="mt-0.5 text-sm font-semibold text-text">{title}</p>
            <p className="mt-0.5 text-xs text-textSecondary">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-textSecondary hover:text-text hover:bg-surfaceAlt transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
