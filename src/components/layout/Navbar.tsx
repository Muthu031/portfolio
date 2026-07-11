import { useEffect, useState } from "react";
import { Menu, X, Home, Swords, Boxes, Package, Trophy, Send, Volume2, VolumeX, Download } from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useGameSound } from "../../hooks/useGameSound";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
import { profile } from "../../data/profile";
import { cn } from "../../lib/utils";

// Section id -> HUD nav label/icon. Keeping this list in one place means the
// Navbar, mobile drawer and scroll-spy all stay in sync automatically.
const sections = [
  { id: "hero", label: "Start", icon: Home },
  { id: "experience", label: "Quest Log", icon: Swords },
  { id: "projects", label: "Boss Battles", icon: Boxes },
  { id: "skills", label: "Inventory", icon: Package },
  { id: "testimonials", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Save & Continue", icon: Send },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const scrollProgress = useScrollProgress();
  const { enabled: soundEnabled, toggle: toggleSound } = useGameSound();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) setActiveSection(section.id);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const progressSegments = 24;
  const filledSegments = Math.round((scrollProgress / 100) * progressSegments);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 font-mono text-sm font-bold text-text transition-colors hover:text-accent-violet"
          >
            <Chip variant="active" size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </Chip>
            <span className="hidden sm:inline">{profile.initials} // PORTFOLIO.EXE</span>
            <span className="sm:hidden">{profile.initials}</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all duration-150",
                    isActive ? "text-accent-violet" : "text-textSecondary hover:text-text hover:bg-surfaceAlt"
                  )}
                >
                  <Chip variant={isActive ? "active" : "default"} size="sm">
                    <Icon className="h-3.5 w-3.5" />
                  </Chip>
                  {section.label}
                  {isActive && <span className="h-1 w-1 rounded-full bg-accent-violet shadow-[0_0_6px_rgba(124,92,255,0.7)]" />}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={profile.resumeUrl} variant="achievement" size="sm" withSound className="hidden sm:inline-flex">
              <Download className="h-3.5 w-3.5" />
              Hire Me
            </Button>
            <button
              onClick={toggleSound}
              className="icon-chip hover:border-accent-violet hover:text-accent-violet"
              aria-label={soundEnabled ? "Mute UI sounds" : "Enable UI sounds"}
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="icon-chip lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Segmented level-up progress bar tracking scroll through the whole page. */}
      <div className="h-1 w-full bg-surfaceAlt">
        <div className="flex h-full gap-0.5 px-0.5">
          {Array.from({ length: progressSegments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-full flex-1 transition-all duration-150",
                i < filledSegments ? "bg-accent-violet shadow-[0_0_4px_rgba(124,92,255,0.6)]" : "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-surface lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-accent-violet/10 text-accent-violet" : "text-textSecondary hover:bg-surfaceAlt hover:text-text"
                  )}
                >
                  <Chip variant={isActive ? "active" : "default"} size="sm">
                    <Icon className="h-4 w-4" />
                  </Chip>
                  {section.label}
                </button>
              );
            })}
            <Button href={profile.resumeUrl} variant="achievement" size="sm" className="mt-2 w-full sm:hidden">
              <Download className="h-3.5 w-3.5" />
              Hire Me — Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
