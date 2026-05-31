// ─── Experience Data ─────────────────────────────────────────────────────────────
// This file holds the work and education history shown on the Experience
// section timeline. Entries are displayed from top to bottom in the order
// they appear in this array.
//
// Each entry maps to the Experience interface in src/types/index.ts.
// To add a new role: copy an object, update the values, and insert it at
// the correct position in the array.

import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    // ── Role 1: Current job at Skandvel Webtech ──
    id: 'skandvel',
    title: 'Full-Stack Developer',
    company: 'Skandvel Webtech Private Limited',
    period: 'Aug 2023 – Present', // Still ongoing
    achievements: [
      // Each string is one bullet point under the job entry
      'Developed scalable RESTful APIs using Node.js and TypeScript for UK enterprise clients — delivered high-availability multi-tenant systems with strict SLA and zero critical downtime incidents.',
      'Optimised PostgreSQL queries and indexing strategies, significantly reducing API response times and enabling the platform to handle concurrent enterprise workloads efficiently.',
      'Built dynamic form builders, workflow automation engines, audit logging, history tracking, PDF generation modules, and WebSocket-based real-time features across 3 production products.',
    ],
    lettermark: 'SW',       // 2-letter initials shown in the timeline circle
    color: '#00f5ff',       // Cyan accent colour for this entry
  },
  {
    // ── Role 2: Final year capstone project lead ──
    id: 'capstone',
    title: 'Project Lead — Capstone Development',
    company: 'Jayaraj Annapackiam CSI College of Engineering',
    period: '2022 – 2023',
    achievements: [
      'Designed and built AttendTrack — a full-stack Attendance Management System in Node.js, React.js, and PostgreSQL, automating manual tracking for 1,000+ students across 20+ departments.',
      'Implemented role-based access control for faculty, HODs, and admins; integrated automated report generation and PDF export, reducing administrative work by ~70%.',
      'Led a team of 4 students through full SDLC — from requirements gathering and database schema design to deployment and demo — receiving the highest project evaluation score in the department.',
    ],
    lettermark: 'JA',       // College initials
    color: '#ffb800',       // Golden accent colour
  },
  {
    // ── Role 3: Self-taught period before first job ──
    id: 'self-taught',
    title: 'Self-Taught Developer',
    company: 'Independent Projects & Learning',
    period: '2020 – 2023',
    achievements: [
      'Mastered JavaScript, Node.js, and React through structured self-learning, building 5+ personal projects including REST API servers, CRUD apps, and a real-time chat application.',
      'Completed online certifications in AWS Cloud Foundations, Advanced JavaScript patterns, and PostgreSQL database design — building the technical foundation for professional work.',
      'Contributed to open-source repositories and participated in online communities, developing code review habits and collaborative engineering practices ahead of first professional role.',
    ],
    lettermark: 'MS',       // Personal initials (Muthukumaran S)
    color: '#a78bfa',       // Violet accent colour
  },
  {
    // ── Education: B.Tech — Information Technology ──
    id: 'btech',
    title: 'B.Tech — Information Technology',
    company: 'Jayaraj Annapackiam CSI College of Engineering, Anna University',
    period: '2019 – 2023',
    achievements: [
      'Graduated in Information Technology with focus on full-stack development, data structures, algorithms, and database systems.',
      'Final year GPA 7.8/10 — Capstone project (AttendTrack) received highest evaluation score in the department.',
      'Coursework included Operating Systems, Computer Networks, DBMS, OOP, Compiler Design, and Software Engineering — providing strong CS fundamentals for product engineering roles.',
    ],
    lettermark: 'BT',
    color: '#34d399',       // Emerald green accent
  },
];
