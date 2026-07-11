import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgressRing } from "./ScrollProgressRing";
import { TooltipProvider } from "../ui/Tooltip";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <TooltipProvider>
      <Navbar />
      {/* pt accounts for the fixed HUD navbar (h-16 + 1px progress bar). */}
      <main className="pt-[65px]">{children}</main>
      <Footer />
      <ScrollProgressRing />
      {/* bottom-right, offset clear of the ScrollProgressRing that shares
          that corner on sm+ screens; top positions collide with the fixed
          HUD navbar's own buttons on narrow viewports. */}
      <Toaster theme="dark" position="bottom-right" gap={12} offset={96} />
    </TooltipProvider>
  );
}
