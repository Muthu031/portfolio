import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "connectme",
    title: "ConnectMe",
    description:
      "Real-time messaging platform with end-to-end encryption, file sharing, and collaborative workspaces.",
    techStack: ["React", "TypeScript", "Socket.io", "Node.js", "PostgreSQL"],
    link: "https://connectme-demo.vercel.app",
    github: "https://github.com/muthukumaran/connectme",
  },
  {
    id: "neet-mcq",
    title: "NEET MCQ Platform",
    description:
      "Adaptive quiz platform for medical entrance exam prep with analytics, spaced repetition, and performance tracking.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    link: "https://neet-mcq.vercel.app",
    github: "https://github.com/muthukumaran/neet-mcq",
  },
  {
    id: "valan-bay",
    title: "Valan Bay",
    description:
      "E-commerce platform with inventory management, payment integration, and admin analytics dashboard.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    link: "https://valan-bay.vercel.app",
    github: "https://github.com/muthukumaran/valan-bay",
  },
  {
    id: "attendtrack-capstone",
    title: "AttendTrack",
    description:
      "Smart attendance management system with biometric integration, automated reports, and parent notifications.",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    link: "https://attendtrack-demo.vercel.app",
    github: "https://github.com/muthukumaran/attendtrack",
  },
];
