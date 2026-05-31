// ─── Projects Data ─────────────────────────────────────────────────────────────
// This file contains the list of portfolio projects shown in the
// Projects section. Each entry maps directly to the Project interface
// defined in src/types/index.ts.
//
// To add a new project: copy one object, change the values, and add it to the array.

import { Project } from '../types';

export const projects: Project[] = [
  {
    // ── Project 1: ConnectMe ──
    id: 'connectme',
    title: 'ConnectMe',
    tagline: 'Multi-Tenant Service Management Platform',
    description:
      'Enterprise-grade multi-tenant platform enabling customers to submit and track utility service applications. Features secure tenant isolation, dynamic workflow engines, complex form processing, audit logging, and real-time notifications — built for UK enterprise clients.',
    techStack: [
      { name: 'Node.js',    category: 'backend' },
      { name: 'TypeScript', category: 'backend' },
      { name: 'Express.js', category: 'backend' },
      { name: 'React.js',   category: 'frontend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'REST APIs',  category: 'backend' },
      { name: 'AWS',        category: 'devops' },
    ],
    githubUrl: 'https://github.com/Muthu031',   // Links to GitHub profile (private repo)
    liveUrl:   null,                             // Enterprise NDA — no public demo
    badge: 'Featured',          // Shown as a "Featured" label on the card
    accentColor: '#00f5ff',     // Cyan accent colour for this card
    mockType: 'ecommerce',      // Which fake UI preview component to render
  },
  {
    // ── Project 2: NEET MCQ Platform ──
    id: 'neet-mcq',
    title: 'NEET MCQ Platform',
    tagline: 'Scalable Online Examination System',
    description:
      'Full-featured exam preparation platform with hierarchical MCQ and mock test modules. Supports thousands of concurrent test-takers with performance tracking, scoring analytics, and detailed result reports — built for high-availability exam seasons.',
    techStack: [
      { name: 'Node.js',    category: 'backend' },
      { name: 'TypeScript', category: 'backend' },
      { name: 'React.js',   category: 'frontend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'REST APIs',  category: 'backend' },
      { name: 'Zod',        category: 'backend' },
    ],
    githubUrl: 'https://github.com/Muthu031',
    liveUrl:   null,         // Enterprise NDA — no public demo
    badge: 'Featured',
    accentColor: '#ffb800',  // Golden accent colour
    mockType: 'dashboard',   // Dashboard-style mock preview
  },
  {
    // ── Project 3: Valan Bay ──
    id: 'valan-bay',
    title: 'Valan Bay',
    tagline: 'Real-Time Mobile Auction Application',
    description:
      'Live bidding platform with WebSocket-powered real-time auction rooms. Bidders see live price updates and competing bids with sub-second latency. Built as a cross-platform mobile app with a Node.js backend and persistent auction state management.',
    techStack: [
      { name: 'React Native', category: 'frontend' },
      { name: 'Node.js',      category: 'backend' },
      { name: 'WebSockets',   category: 'backend' },
      { name: 'Express.js',   category: 'backend' },
      { name: 'PostgreSQL',   category: 'database' },
    ],
    githubUrl: 'https://github.com/Muthu031',
    liveUrl:   'https://github.com/Muthu031',  // Open-source — GitHub is the primary link
    badge: 'Open Source',
    accentColor: '#a78bfa',  // Violet accent colour
    mockType: 'editor',      // Code editor style mock preview
  },
  {
    // ── Project 4: AttendTrack (Capstone) ──
    id: 'attendtrack',
    title: 'AttendTrack',
    tagline: 'Automated Attendance Management System',
    description:
      'B.Tech capstone project — a full-stack attendance automation system for academic institutions. Features role-based access for faculty and admins, automated report generation, attendance analytics, and PDF export built with Node.js and React.',
    techStack: [
      { name: 'Node.js',    category: 'backend' },
      { name: 'React.js',   category: 'frontend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'JavaScript', category: 'frontend' },
      { name: 'REST APIs',  category: 'backend' },
    ],
    githubUrl: 'https://github.com/Muthu031',
    liveUrl:   'https://github.com/Muthu031',  // Capstone project — GitHub is the primary link
    badge: 'Open Source',
    accentColor: '#34d399',  // Emerald / green accent colour
    mockType: 'auth',        // Auth login-style mock preview
  },
];
