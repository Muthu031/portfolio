import type { Experience } from "../types";

// "Quest Log" data. `start`/`end` (null = ongoing) drive the dynamically
// computed total-years-of-experience stat shown in the Hero — extend this
// list and every derived number on the page updates itself.
export const experience: Experience[] = [
  {
    id: "skandvel",
    role: "Full-Stack Developer",
    company: "Skandvel Webtech",
    location: "Chennai, India",
    start: "2023-08",
    end: null,
    difficulty: "Senior",
    description:
      "Building scalable web applications with modern tech stacks, leading feature development, and mentoring junior developers.",
    highlights: [
      "Architected microservices reducing API latency by 40%",
      "Led migration from monolith to modular frontend",
      "Implemented CI/CD pipelines cutting deployment time by 60%",
    ],
    stack: ["Node.js", "React", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    id: "attendtrack",
    role: "Capstone Project Lead",
    company: "AttendTrack",
    location: "Remote",
    start: "2023-01",
    end: "2023-06",
    difficulty: "Mid",
    description:
      "Led a cross-functional team to deliver an attendance management platform serving 2,000+ students.",
    highlights: [
      "Designed real-time dashboard with WebSocket updates",
      "Built role-based access control with JWT authentication",
      "Achieved 99.5% uptime during pilot semester",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
  },
  {
    id: "self-taught",
    role: "Self-Taught Developer",
    company: "Foundation Phase",
    location: "Chennai, India",
    start: "2021-01",
    end: "2022-12",
    difficulty: "Junior",
    description:
      "Intensive self-study of Node.js, TypeScript, and databases through open-source contributions and personal projects.",
    highlights: [
      "Contributed to 5+ open-source projects",
      "Built 3 production-ready applications from scratch",
      "Mastered relational and NoSQL database design",
    ],
    stack: ["Node.js", "TypeScript", "MongoDB", "SQL"],
  },
];
