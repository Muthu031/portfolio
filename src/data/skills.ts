import type { SkillCategory } from "../types";

// "Inventory" data — each skill's `level` (0-100) drives its XP ring fill
// and its `detail` is the Radix tooltip copy shown on hover/focus.
export const skills: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: 95, detail: "Event-driven services, workers and queues in production for 3+ years." },
      { name: "Express / Fastify", level: 90, detail: "REST APIs, middleware pipelines, request validation." },
      { name: "TypeScript", level: 92, detail: "Strict-mode codebases, shared types across API/client boundaries." },
      { name: "REST / GraphQL", level: 88, detail: "Schema design, pagination, auth-aware resolvers." },
      { name: "Microservices", level: 80, detail: "Service decomposition, inter-service messaging, observability." },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "layout",
    skills: [
      { name: "React.js", level: 95, detail: "Component architecture, performance profiling, custom hooks." },
      { name: "Next.js", level: 88, detail: "SSR/ISR routing, server actions, edge-ready deployments." },
      { name: "TypeScript", level: 92, detail: "End-to-end type safety from API contracts to UI props." },
      { name: "Tailwind CSS", level: 90, detail: "Design-system-driven utility styling at scale." },
      { name: "Framer Motion", level: 78, detail: "Interaction-driven animation, gesture and layout transitions." },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 90, detail: "Schema design, indexing strategy, query optimization." },
      { name: "MongoDB", level: 85, detail: "Document modeling for high write-throughput workloads." },
      { name: "Redis", level: 75, detail: "Caching layers, rate limiting, pub/sub." },
      { name: "Prisma ORM", level: 88, detail: "Type-safe data access and migrations." },
      { name: "Database Design", level: 85, detail: "Normalization trade-offs for real-world read/write patterns." },
    ],
  },
  {
    id: "auth-security",
    name: "Auth & Security",
    icon: "shield",
    skills: [
      { name: "JWT / OAuth2", level: 88, detail: "Session strategy, refresh-token rotation, SSO flows." },
      { name: "bcrypt / Argon2", level: 85, detail: "Password hashing and credential storage best practice." },
      { name: "Helmet / CORS", level: 82, detail: "Hardening HTTP headers and cross-origin policy." },
      { name: "Input Validation", level: 90, detail: "Schema validation at every trust boundary." },
      { name: "Rate Limiting", level: 78, detail: "Abuse prevention on public-facing endpoints." },
    ],
  },
  {
    id: "tools-cloud",
    name: "Tools & Cloud",
    icon: "wrench",
    skills: [
      { name: "Docker", level: 80, detail: "Multi-stage builds, container orchestration basics." },
      { name: "AWS / Vercel", level: 78, detail: "Deploys, environment config, static + serverless hosting." },
      { name: "Git / GitHub", level: 92, detail: "Branching strategy, code review, release management." },
      { name: "CI/CD", level: 82, detail: "Automated test/build/deploy pipelines." },
      { name: "Linux", level: 75, detail: "Server administration and shell scripting." },
    ],
  },
];
