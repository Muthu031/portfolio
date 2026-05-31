// ─── Projects Section ─────────────────────────────────────────────────────────
// Displays a list of featured projects, each as a full-width card.
//
// Structure:
//   1. Section heading  — "// 03  Things I've Built"
//   2. Intro sentence
//   3. ProjectCard list — each card shows a fake UI preview on one side and
//                         title / description / tech chips / buttons on the other
//   4. GitHub link      — "More on GitHub" at the bottom
//
// The mock previews (MockEditor, MockEcommerce, MockDashboard, MockAuth) are
// small decorative components that simulate what the real app looks like.
// They are aria-hidden so screen readers skip them.
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { Tag } from '../ui/Tag';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// ─── Mock UI Preview Components ───────────────────────────────────────────────
// Each component renders a tiny fake UI that represents the project's theme.
// `color` is the project's accent colour used for highlight tones.
// All are aria-hidden because they're purely decorative.

// MockEditor: Simulates a collaborative code editor window with fake syntax-highlighted lines
const MockEditor: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full h-full bg-void/80 p-4 font-mono text-xs overflow-hidden select-none" aria-hidden="true">
    {/* Traffic-light dots (macOS window controls style) */}
    <div className="flex gap-1.5 mb-3">
      {['#ff5f57','#febc2e','#28c840'].map((c) => (
        <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
      ))}
    </div>
    {/* Fake code lines — alternating accent and muted colours */}
    {[
      { c: color,     t: 'const editor = new CollabEditor({' },
      { c: '#8888aa', t: '  transport: WebSocket,' },
      { c: '#8888aa', t: '  language: "typescript",' },
      { c: color,     t: '  onSync: (delta) => {' },
      { c: '#8888aa', t: '    ot.apply(delta);' },
      { c: color,     t: '  },' },
      { c: '#8888aa', t: '});' },
    ].map((line, i) => (
      <div key={i} className="mb-1.5" style={{ color: line.c }}>{line.t}</div>
    ))}
  </div>
);

// MockEcommerce: Simulates a product grid (2×2) with placeholder product cards
const MockEcommerce: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full h-full bg-void/80 p-4 overflow-hidden select-none" aria-hidden="true">
    <div className="grid grid-cols-2 gap-2 h-full">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="bg-panel rounded-sm p-2 flex flex-col gap-1">
          <div className="h-8 rounded-sm" style={{ background: `${color}15` }} />     {/* Product image placeholder */}
          <div className="h-1.5 bg-white/10 rounded-full w-3/4" />                     {/* Product name bar */}
          <div className="h-1 bg-white/5 rounded-full w-1/2" />                        {/* Price bar */}
          <div className="mt-auto h-4 rounded-sm" style={{ background: `${color}20`, border: `1px solid ${color}30` }} /> {/* Add-to-cart button */}
        </div>
      ))}
    </div>
  </div>
);

// MockDashboard: Simulates an analytics dashboard with a bar chart and progress bars
const MockDashboard: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full h-full bg-void/80 p-4 overflow-hidden select-none" aria-hidden="true">
    {/* Bar chart: three columns of different heights */}
    <div className="flex gap-2 mb-3">
      {[70, 45, 82].map((h, i) => (
        <div key={i} className="flex-1 flex items-end h-16">
          <div
            className="w-full rounded-sm transition-all"
            style={{ height: `${h}%`, background: `${color}${40 + i * 10}`, border: `1px solid ${color}30` }}
          />
        </div>
      ))}
    </div>
    <div className="h-px bg-white/5 mb-3" /> {/* Divider */}
    {/* Three horizontal progress bars */}
    {[85, 60, 92].map((w, i) => (
      <div key={i} className="mb-2">
        <div className="h-1.5 rounded-full bg-white/5 mb-1">
          <div className="h-full rounded-full" style={{ width: `${w}%`, background: color }} />
        </div>
      </div>
    ))}
  </div>
);

// MockAuth: Simulates a login form with three input fields and a sign-in button
const MockAuth: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full h-full bg-void/80 p-4 flex flex-col items-center justify-center gap-3 overflow-hidden select-none" aria-hidden="true">
    <div className="text-2xl mb-1">🔐</div>
    {['Email / Username', 'Password', '2FA Token'].map((f) => (
      <div key={f} className="w-full h-6 bg-panel rounded-sm border flex items-center px-2" style={{ borderColor: `${color}20` }}>
        <span className="font-mono text-[9px]" style={{ color: `${color}60` }}>{f}</span>
      </div>
    ))}
    {/* Sign-in button */}
    <div
      className="w-full h-6 rounded-sm flex items-center justify-center mt-1"
      style={{ background: `${color}20`, border: `1px solid ${color}30` }}
    >
      <span className="font-mono text-[9px]" style={{ color }}>Sign In →</span>
    </div>
  </div>
);

// Maps the project's mockType string to the correct Mock component
const MOCK_MAP = {
  editor:    MockEditor,
  ecommerce: MockEcommerce,
  dashboard: MockDashboard,
  auth:      MockAuth,
};

// ─── ProjectCard Component ────────────────────────────────────────────────────
// Renders a single project as a two-column card:
//   Left column  (even index): mock preview   Right column: project info
//   Left column  (odd index):  project info   Right column: mock preview
// This alternating layout gives visual rhythm down the page.
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0; // Even cards have the preview on the left
  const Mock   = MOCK_MAP[project.mockType]; // Dynamically select the right mock component

  return (
    <motion.article
      className="grid lg:grid-cols-2 gap-0 border border-white/[0.06] group overflow-hidden"
      // Card slides up from 60px below on first view
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${project.title} project`}
    >
      {/* ── Mock preview panel ── */}
      <div
        className={`relative h-56 lg:h-auto overflow-hidden bg-card ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
      >
        {/* Gradient overlay fades the preview into the content panel beside it */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: isEven
              ? `linear-gradient(to right, transparent 70%, #0d0d1a)`   // Fades right
              : `linear-gradient(to left,  transparent 70%, #0d0d1a)`,  // Fades left
          }}
          aria-hidden="true"
        />
        {/* Slight zoom on hover for a nice interactive feel */}
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
        >
          <Mock color={project.accentColor} />
        </motion.div>
      </div>

      {/* ── Project info panel ── */}
      <div
        className={`flex flex-col justify-center p-8 lg:p-10 bg-card group-hover:bg-panel/60 transition-colors duration-300 ${isEven ? 'lg:order-last' : 'lg:order-first'}`}
      >
        {/* Badge: "Featured" or "Open Source" */}
        <div className="mb-4">
          <Badge variant={project.badge === 'Featured' ? 'featured' : 'opensource'}>
            {project.badge}
          </Badge>
        </div>

        {/* Project title in the accent colour */}
        <h3
          className="font-mono text-2xl font-bold mb-1 transition-colors duration-200"
          style={{ color: project.accentColor }}
        >
          {project.title}
        </h3>
        <p className="font-sans text-sm text-muted mb-3 font-medium">{project.tagline}</p>
        <p className="text-muted/80 text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2 mb-7" aria-label="Technologies used">
          {project.techStack.map((chip) => (
            <Tag key={chip.name} category={chip.category}>{chip.name}</Tag>
          ))}
        </div>

        {/* Action buttons: Source (GitHub) + Live Demo / Private */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            icon={<Github size={14} />}
            aria-label={`View ${project.title} on GitHub`}
          >
            Source
          </Button>
          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              icon={<ExternalLink size={14} />}
              aria-label={`View ${project.title} live demo`}
            >
              Live Demo
            </Button>
          ) : (
            <span
              className="font-mono text-xs px-3 py-1.5 border border-white/10 text-muted rounded-sm"
              title="Enterprise project — source under NDA"
            >
              🔒 Enterprise / Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Projects Section Component ───────────────────────────────────────────────
export const Projects: React.FC = () => (
  <section id="projects" className="py-28 bg-void" aria-label="Projects section">
    <div className="max-w-7xl mx-auto px-6">

      {/* ── Section heading: "// 03  Things I've Built" ── */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-electric text-sm tracking-widest">// 03</span>
        <h2 className="font-mono text-3xl md:text-4xl font-bold text-cream">Things I've Built</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
      </motion.div>

      {/* ── Intro sentence ── */}
      <motion.p
        className="text-muted max-w-xl mb-16 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Selected work from real production systems — each built to solve a genuine problem at scale.
      </motion.p>

      {/* ── Project card list ── */}
      <div className="flex flex-col gap-6 mb-16">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* ── "More on GitHub" link ── */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.a
          href="https://github.com/Muthu031"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-electric transition-colors duration-200 group"
          whileHover={{ x: 4 }} // Slides right on hover
          aria-label="View more projects on GitHub"
        >
          <Github size={16} />
          <span>More on GitHub</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </motion.a>
      </motion.div>
    </div>
  </section>
);
