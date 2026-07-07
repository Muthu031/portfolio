import { useState, useCallback } from "react";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AchievementToast } from "./components/ui/AchievementToast";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { useReducedMotion } from "./hooks/useReducedMotion";

type SectionId = "experience" | "projects" | "skills" | "testimonials" | "contact";

const sectionMeta: Record<
  SectionId,
  { title: string; description: string }
> = {
  experience: {
    title: "Quest Log Unlocked",
    description: "You've discovered your completed quests.",
  },
  projects: {
    title: "Boss Battles Unlocked",
    description: "Ready to inspect your legendary loadouts?",
  },
  skills: {
    title: "Inventory Unlocked",
    description: "Your skill tree has been revealed.",
  },
  testimonials: {
    title: "Guild Reviews Unlocked",
    description: "Achievements from your allies.",
  },
  contact: {
    title: "Save Point Reached",
    description: "Ready to start the next level?",
  },
};

function App() {
  const [activeToast, setActiveToast] = useState<SectionId | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSectionView = useCallback((id: SectionId) => {
    setActiveToast(id);
  }, []);

  return (
    <>
      {!prefersReducedMotion && <CustomCursor />}
      <Navbar />
      <main>
        <Hero />
        <Experience onView={() => handleSectionView("experience")} />
        <Projects onView={() => handleSectionView("projects")} />
        <Skills onView={() => handleSectionView("skills")} />
        <Testimonials onView={() => handleSectionView("testimonials")} />
        <Contact onView={() => handleSectionView("contact")} />
      </main>
      <Footer />

      {activeToast && (
        <AchievementToast
          title={sectionMeta[activeToast].title}
          description={sectionMeta[activeToast].description}
          onClose={() => setActiveToast(null)}
        />
      )}
    </>
  );
}

export default App;
