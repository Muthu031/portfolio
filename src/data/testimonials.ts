// ─── Testimonials Data ────────────────────────────────────────────────────────────
// This file holds the colleague and manager quotes shown in the auto-
// advancing carousel on the Testimonials section.
//
// To add a new testimonial: copy one object, fill in the fields, and
// add it to the array. The carousel will include it automatically.

import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    // ── Testimonial 1 ──
    id: '1',
    quote:
      "Muthu consistently delivered production-quality code under tight UK client deadlines. His understanding of Node.js internals and PostgreSQL optimisation is well above what you'd expect for his experience level. He takes ownership end-to-end — from API design to deployment — and the code is always clean.",
    name: 'Rajesh Kumar',
    title: 'Tech Lead',
    company: 'Skandvel Webtech',
    initials: 'RK',        // Shown in the avatar circle
    avatarColor: '#00f5ff', // Cyan avatar
  },
  {
    // ── Testimonial 2 ──
    id: '2',
    quote:
      "The ConnectMe platform Muthu worked on handles some genuinely complex multi-tenant logic, and he navigated it with a maturity that impressed the whole team. His API design is intuitive, his error handling is thorough, and he documents as he goes. Rare qualities.",
    name: 'James Whitfield',
    title: 'Project Manager',
    company: 'UK Enterprise Client',
    initials: 'JW',
    avatarColor: '#ffb800', // Golden avatar
  },
  {
    // ── Testimonial 3 ──
    id: '3',
    quote:
      "What stands out about Muthukumaran is his debugging instinct. He can trace a bug through three service layers faster than most seniors I've worked with. His TypeScript is strict, his Postgres queries are optimised, and he ships with confidence. A developer you can trust with critical systems.",
    name: 'Anand Selvam',
    title: 'Senior Backend Engineer',
    company: 'Skandvel Webtech',
    initials: 'AS',
    avatarColor: '#a78bfa', // Violet avatar
  },
];
