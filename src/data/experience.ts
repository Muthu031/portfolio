import type { Experience } from "../types";

export const experience: Experience[] = [
  {
    id: "skandvel",
    role: "Full-Stack Developer",
    company: "Skandvel Webtech",
    period: "2023-08 — Present",
    description:
      "Building scalable web applications with modern tech stacks, leading feature development, and mentoring junior developers.",
    highlights: [
      "Architected microservices reducing API latency by 40%",
      "Led migration from monolith to modular frontend",
      "Implemented CI/CD pipelines cutting deployment time by 60%",
    ],
  },
  {
    id: "attendtrack",
    role: "Capstone Project Lead",
    company: "AttendTrack",
    period: "2023-01 — 2023-06",
    description:
      "Led a cross-functional team to deliver an attendance management platform serving 2,000+ students.",
    highlights: [
      "Designed real-time dashboard with WebSocket updates",
      "Built role-based access control with JWT authentication",
      "Achieved 99.5% uptime during pilot semester",
    ],
  },
  {
    id: "self-taught",
    role: "Self-Taught Developer",
    company: "Foundation Phase",
    period: "2021-01 — 2022-12",
    description:
      "Intensive self-study of Node.js, TypeScript, and databases through open-source contributions and personal projects.",
    highlights: [
      "Contributed to 5+ open-source projects",
      "Built 3 production-ready applications from scratch",
      "Mastered relational and NoSQL database design",
    ],
  },
];
