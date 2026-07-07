import type { SkillCategory } from "../types";

export const skills: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", level: 95 },
      { name: "Express / Fastify", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "REST / GraphQL", level: 88 },
      { name: "Microservices", level: 80 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    id: "database",
    name: "Database",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 75 },
      { name: "Prisma ORM", level: 88 },
      { name: "Database Design", level: 85 },
    ],
  },
  {
    id: "auth-security",
    name: "Auth & Security",
    skills: [
      { name: "JWT / OAuth2", level: 88 },
      { name: "bcrypt / Argon2", level: 85 },
      { name: "Helmet / CORS", level: 82 },
      { name: "Input Validation", level: 90 },
      { name: "Rate Limiting", level: 78 },
    ],
  },
  {
    id: "tools-cloud",
    name: "Tools & Cloud",
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS / Vercel", level: 78 },
      { name: "Git / GitHub", level: 92 },
      { name: "CI/CD", level: 82 },
      { name: "Linux", level: 75 },
    ],
  },
];
