import type { Project } from "../types";

// "Boss Battles" data. `impact` (0-100) fills each card's completion bar,
// `metrics` are the loot-stat chips shown under the description.
export const projects: Project[] = [
  {
    id: "connectme",
    title: "ConnectMe",
    tier: "Mythic",
    description:
      "Real-time messaging platform with end-to-end encryption, file sharing, and collaborative workspaces.",
    techStack: ["React", "TypeScript", "Socket.io", "Node.js", "PostgreSQL"],
    impact: 96,
    metrics: [
      { label: "Concurrent users", value: "5k+" },
      { label: "Msg latency", value: "<80ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    link: "https://connectme-demo.vercel.app",
    github: "https://github.com/muthukumaran/connectme",
    featured: true,
  },
  {
    id: "neet-mcq",
    title: "NEET MCQ Platform",
    tier: "Legendary",
    description:
      "Adaptive quiz platform for medical entrance exam prep with analytics, spaced repetition, and performance tracking.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    impact: 90,
    metrics: [
      { label: "Active students", value: "3k+" },
      { label: "Questions bank", value: "12k+" },
      { label: "Avg. score lift", value: "+22%" },
    ],
    link: "https://neet-mcq.vercel.app",
    github: "https://github.com/muthukumaran/neet-mcq",
    featured: true,
  },
  {
    id: "valan-bay",
    title: "Valan Bay",
    tier: "Legendary",
    description:
      "E-commerce platform with inventory management, payment integration, and admin analytics dashboard.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    impact: 84,
    metrics: [
      { label: "Orders processed", value: "8k+" },
      { label: "Checkout success", value: "98.4%" },
      { label: "Payment methods", value: "6" },
    ],
    link: "https://valan-bay.vercel.app",
    github: "https://github.com/muthukumaran/valan-bay",
  },
  {
    id: "attendtrack-capstone",
    title: "AttendTrack",
    tier: "Elite",
    description:
      "Smart attendance management system with biometric integration, automated reports, and parent notifications.",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    impact: 88,
    metrics: [
      { label: "Students tracked", value: "2k+" },
      { label: "Pilot uptime", value: "99.5%" },
      { label: "Reports/mo", value: "1.2k" },
    ],
    link: "https://attendtrack-demo.vercel.app",
    github: "https://github.com/muthukumaran/attendtrack",
  },
];
