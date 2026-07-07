import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  FolderOpen,
  Zap,
  MessageSquare,
  Mail,
} from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/utils";

const sections = [
  { id: "hero", label: "Start", icon: Home },
  { id: "experience", label: "Quest Log", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "testimonials", label: "Reviews", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section.id);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const progressSegments = 20;
  const filledSegments = Math.round((scrollProgress / 100) * progressSegments);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 font-mono text-sm font-bold text-text hover:text-accent-teal transition-colors"
          >
            <span className="icon-chip-active">
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
            </span>
            MUTHUKUMARAN
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
                    isActive
                      ? "text-accent-teal"
                      : "text-textSecondary hover:text-text hover:bg-surfaceAlt"
                  )}
                >
                  <span className={cn("icon-chip", isActive && "icon-chip-active")}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {section.label}
                  {isActive && (
                    <span className="h-1 w-1 rounded-full bg-accent-teal shadow-[0_0_6px_rgba(0,212,170,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-textSecondary hover:text-text hover:bg-surfaceAlt transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="h-1 w-full bg-surfaceAlt">
        <div className="flex h-full gap-0.5 px-0.5">
          {Array.from({ length: progressSegments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-full flex-1 rounded-sm transition-all duration-150",
                i < filledSegments
                  ? "bg-accent-teal shadow-[0_0_4px_rgba(0,212,170,0.5)]"
                  : "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="space-y-1 px-4 py-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-accent-teal bg-accent-teal/10"
                      : "text-textSecondary hover:text-text hover:bg-surfaceAlt"
                  )}
                >
                  <span className={cn("icon-chip", isActive && "icon-chip-active")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
