import type { Testimonial } from "../types";

// "Achievements Unlocked" data — each entry renders as a medallion card and,
// on first scroll-into-view per visitor, fires a Sonner unlock toast.
export const testimonials: Testimonial[] = [
  {
    id: "rajesh",
    name: "Rajesh Kumar",
    role: "CTO",
    company: "Skandvel Webtech",
    quote:
      "Muthukumaran consistently delivers clean, scalable code. His ability to break down complex problems and ship production-ready features is exceptional.",
    initials: "RK",
  },
  {
    id: "james",
    name: "James Whitfield",
    role: "Senior Engineer",
    company: "TechForge Labs",
    quote:
      "A rare combination of backend rigor and frontend sensibility. Muthu's contributions elevated our entire codebase and set new standards for quality.",
    initials: "JW",
  },
  {
    id: "anand",
    name: "Anand Selvam",
    role: "Product Manager",
    company: "AttendTrack",
    quote:
      "Leading the capstone project, Muthu turned an ambitious vision into a reliable platform. His communication and technical ownership were invaluable.",
    initials: "AS",
  },
];
