import { useCallback } from "react";
import { Toaster } from "sonner";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { useReducedMotion } from "./hooks/useReducedMotion";

type SectionId = "experience" | "projects" | "skills" | "testimonials" | "contact";

function App() {
  const prefersReducedMotion = useReducedMotion();

  const handleSectionView = useCallback((_id: SectionId) => {
    // Sound effects can be triggered here via useGameSound
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
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "bg-surface border border-border rounded-lg shadow-2xl shadow-black/40",
            title: "font-display font-bold uppercase tracking-wider text-accent-teal",
            description: "text-textSecondary",
          },
        }}
      />
    </>
  );
}

export default App;

