import type { ComponentType, SVGProps } from "react";
import { Mail, FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { profile } from "../../data/profile";
import type { SocialLink } from "../../types";

const iconMap: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
  twitter: GithubIcon,
  resume: FileText,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/80">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="icon-chip icon-chip-active">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-display font-bold uppercase tracking-wider text-text">Ready for the next level?</p>
              <p className="text-xs text-textSecondary">{profile.availability}.</p>
            </div>
          </div>

          <Button href="#contact" variant="primary">
            Start a Quest
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-textSecondary">
            &copy; {new Date().getFullYear()} {profile.name.toUpperCase()}
          </p>
          <div className="flex items-center gap-3">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="icon-chip hover:border-accent-violet hover:text-accent-violet"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
