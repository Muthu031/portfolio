import type { Profile } from "../types";

// Single source of truth for every "who is this / how do I reach them" bit
// rendered in the Navbar, Hero, Footer and Contact section. Edit here only.
export const profile: Profile = {
  name: "Muthukumaran S",
  initials: "MS",
  role: "Full-Stack Developer",
  tagline:
    "I turn ambitious product briefs into fast, reliable, production-grade web apps — end to end, from schema to deploy.",
  location: "Chennai, India",
  email: "hello@muthukumaran.dev",
  phone: "+91 98765 43210",
  // Drop an actual PDF at /public/resume.pdf to make this link real.
  resumeUrl: "/resume.pdf",
  availability: "Open to full-time & contract roles",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/muthukumaran", icon: "github" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/muthukumaran", icon: "linkedin" },
    { id: "mail", label: "Email", href: "mailto:hello@muthukumaran.dev", icon: "mail" },
    { id: "resume", label: "Resume", href: "/resume.pdf", icon: "resume" },
  ],
  focusLines: [
    "Building scalable APIs that don't fall over at 2am.",
    "Shipping production code — not just demos.",
    "React interfaces people actually enjoy using.",
    "Currently leveling up distributed systems design.",
  ],
};
