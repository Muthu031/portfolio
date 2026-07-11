import { PageLayout } from "./components/layout/PageLayout";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";

function App() {
  return (
    <PageLayout>
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </PageLayout>
  );
}

export default App;
