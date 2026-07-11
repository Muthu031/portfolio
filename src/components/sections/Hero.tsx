import { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Send, Download, Zap } from "lucide-react";
import { Button } from "../ui/Button";
import { Panel } from "../ui/Panel";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { StatTile } from "../ui/StatTile";
import { useInView } from "../../hooks/useInView";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useFirstVisit } from "../../hooks/useFirstVisit";
import { showAchievementToast } from "../ui/AchievementToast";
import { fireConfetti } from "../../lib/confetti";
import { profile } from "../../data/profile";
import { experience } from "../../data/experience";
import { projects } from "../../data/projects";
import { skills } from "../../data/skills";
import { testimonials } from "../../data/testimonials";
import { computeYearsOfExperience, computeLevelProgress, averageSkillLevel } from "../../lib/utils";

const ParticleField = lazy(() => import("../effects/ParticleField"));

const yearsExperience = computeYearsOfExperience(experience);
const technologiesCount = skills.reduce((sum, category) => sum + category.skills.length, 0);
const levelProgress = computeLevelProgress(
  experience,
  projects.length,
  testimonials.length,
  averageSkillLevel(skills)
);

export function Hero() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const typewriterText = useTypewriter(profile.focusLines);
  const [isFirstVisit, markSeen] = useFirstVisit("welcome");

  // First-time visitors get a one-off "welcome" achievement + confetti burst.
  // Returning visitors just see the hero — no repeat fireworks.
  useEffect(() => {
    if (isInView && isFirstVisit) {
      showAchievementToast({
        title: "New Player Joined",
        description: `Welcome! You've discovered ${profile.name}'s portfolio.`,
        variant: "violet",
      });
      void fireConfetti();
      markSeen();
    }
  }, [isInView, isFirstVisit, markSeen]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.4 } },
  };

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-surface/60 to-background" />
      <Suspense fallback={null}>
        <div className="absolute inset-0 -z-10">
          <ParticleField />
        </div>
      </Suspense>

      <div className="container relative z-10 py-16">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Left column: identity, pitch, CTAs, stats */}
          <div>
            <motion.div
              variants={item}
              className="mb-8 inline-flex flex-wrap items-center gap-3 border border-border bg-surface px-5 py-2.5"
            >
              <span className="text-sm font-medium text-textSecondary">
                <span className="text-accent-violet">Player:</span> {profile.name}
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="text-sm font-medium text-textSecondary">
                <span className="text-accent-gold">Class:</span> {profile.role}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-display font-bold tracking-wide uppercase text-text sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {profile.name.split(" ")[0]}{" "}
              <span className="bg-gradient-to-r from-accent-violet to-accent-gold bg-clip-text text-transparent">
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-base text-textSecondary sm:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-6 h-6">
              <p className="font-mono text-sm text-textSecondary sm:text-base">
                <span className="text-accent-violet">&gt;</span> {typewriterText}
                <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-accent-violet align-middle" />
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="achievement" size="lg">
                <Send className="h-4 w-4" />
                Hire Me
              </Button>
              <Button href="#projects" variant="secondary" size="lg">
                <Zap className="h-4 w-4" />
                View Boss Battles
              </Button>
              <Button href={profile.resumeUrl} variant="ghost" size="lg" withSound={false}>
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-3 text-textSecondary">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{profile.location}</span>
              <span className="h-4 w-px bg-border" />
              <a href={profile.socials[0].href} target="_blank" rel="noopener noreferrer" className="icon-chip hover:border-accent-violet hover:text-accent-violet">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href={profile.socials[1].href} target="_blank" rel="noopener noreferrer" className="icon-chip hover:border-accent-violet hover:text-accent-violet">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile value={Math.max(1, Math.floor(yearsExperience))} suffix="+" label="Years Experience" active={isInView} />
              <StatTile value={projects.length} suffix="+" label="Projects Shipped" active={isInView} />
              <StatTile value={technologiesCount} suffix="+" label="Technologies" active={isInView} />
              <StatTile value={testimonials.length} label="Endorsements" active={isInView} />
            </motion.div>
          </div>

          {/* Right column: character-sheet panel */}
          <motion.div variants={item}>
            <Panel variant="hud" className="mx-auto max-w-sm p-0">
              <div className="border-b border-border p-6 text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center border-2 border-accent-violet bg-surfaceAlt text-2xl font-display font-bold text-accent-violet">
                  {profile.initials}
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface bg-emerald-400" />
                </div>
                <p className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-text">{profile.name}</p>
                <p className="text-xs text-textSecondary">{profile.availability}</p>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                    <span className="text-accent-gold">Level {levelProgress.level}</span>
                    <span className="font-mono text-textSecondary">{levelProgress.xpIntoLevel} / {levelProgress.xpIntoLevel + levelProgress.xpToNextLevel} XP</span>
                  </div>
                  <div className="h-2.5 w-full border border-border bg-background">
                    <div
                      className="h-full bg-gradient-to-r from-accent-violet to-accent-gold transition-all duration-700"
                      style={{ width: `${levelProgress.progressPercent}%` }}
                    />
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-center">
                  <div className="border border-border bg-background/50 py-3">
                    <dt className="text-[10px] uppercase tracking-wider text-textSecondary">Experience</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-text">{yearsExperience}y</dd>
                  </div>
                  <div className="border border-border bg-background/50 py-3">
                    <dt className="text-[10px] uppercase tracking-wider text-textSecondary">Quests Won</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-text">{projects.length}</dd>
                  </div>
                </dl>
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      </div>

      <button
        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-textSecondary transition-colors hover:text-text sm:flex"
        aria-label="Scroll to experience"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
