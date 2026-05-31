// ─── Root Application Component ──────────────────────────────────────────────
// App.tsx is the top-level component that assembles the entire portfolio page.
// It wraps everything in BrowserRouter (needed for anchor-link navigation),
// then stacks every section in the correct visual order.

import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Enables client-side routing / smooth scroll links
import { CustomCursor } from './components/ui/CustomCursor';         // Custom animated mouse cursor
import { ScrollProgressBar } from './components/ui/ScrollProgressBar'; // Thin progress bar at the top of the page
import { Navbar } from './components/layout/Navbar';   // Fixed top navigation bar
import { Footer } from './components/layout/Footer';   // Bottom footer with social links
import { Hero } from './components/sections/Hero';               // Section 1 — intro / name / CTA
import { About } from './components/sections/About';             // Section 2 — bio, stats, timeline
import { Skills } from './components/sections/Skills';           // Section 3 — tech skill cards
import { Projects } from './components/sections/Projects';       // Section 4 — featured project cards
import { Experience } from './components/sections/Experience';   // Section 5 — work history
import { Testimonials } from './components/sections/Testimonials'; // Section 6 — carousel of quotes
import { Contact } from './components/sections/Contact';         // Section 7 — contact form + links

function App() {
  return (
    // BrowserRouter wraps the app so React can handle URL changes without
    // doing a full page reload. Needed for smooth-scroll anchor links.
    <BrowserRouter>
      {/* ── Global floating UI elements (always visible on screen) ── */}
      <CustomCursor />       {/* Replaces the default OS cursor with a neon dot + ring */}
      <ScrollProgressBar />  {/* Gradient bar at the very top that fills as you scroll down */}

      {/* ── Fixed top navigation ── */}
      <Navbar />

      {/* ── Main page content — all sections stacked vertically ── */}
      {/* tabIndex={-1} lets the "skip to content" accessibility link focus this area */}
      <main id="main-content" tabIndex={-1}>
        <Hero />         {/* Full-screen intro with particle background */}
        <About />        {/* Profile photo, bio text, stats counter, career timeline */}
        <Skills />       {/* Skill cards grouped by category with progress bars */}
        <Projects />     {/* Alternating project cards with mock UI previews */}
        <Experience />   {/* Vertical timeline of work and study experience */}
        <Testimonials /> {/* Auto-advancing carousel of colleague quotes */}
        <Contact />      {/* Contact form + email / LinkedIn / location info */}
      </main>

      {/* ── Page footer ── */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
