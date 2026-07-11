import { useCountUp } from "../../hooks/useCountUp";

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
}

/** A single animated "stat readout" chip — years of experience, projects shipped, etc. */
export function StatTile({ value, suffix = "", label, active }: StatTileProps) {
  const displayed = useCountUp(value, active);

  return (
    <div className="border border-border bg-surface/70 px-4 py-3 text-center">
      <p className="font-display text-2xl font-bold text-text sm:text-3xl">
        {displayed}
        <span className="text-accent-gold">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-textSecondary">{label}</p>
    </div>
  );
}
