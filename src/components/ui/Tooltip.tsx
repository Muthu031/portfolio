import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

/** Accessible hover/focus tooltip (Radix) skinned as a small HUD callout. */
export function Tooltip({ content, children }: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={150}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={8}
          className="z-50 max-w-64 border border-borderHighlight bg-surfaceHighlight px-3 py-2 text-xs leading-relaxed text-textSecondary shadow-xl animate-fade-in"
        >
          {content}
          <RadixTooltip.Arrow className="fill-surfaceHighlight" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <RadixTooltip.Provider delayDuration={150}>{children}</RadixTooltip.Provider>;
}
