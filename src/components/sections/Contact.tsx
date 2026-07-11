import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, AtSign, MessageSquare, Save } from "lucide-react";
import { Button } from "../ui/Button";
import { Panel } from "../ui/Panel";
import { Chip } from "../ui/Chip";
import { SectionHeading } from "../ui/SectionHeading";
import { showAchievementToast } from "../ui/AchievementToast";
import { fireConfetti } from "../../lib/confetti";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { profile } from "../../data/profile";

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No backend wired up yet — hands the message to the visitor's own mail
    // client, addressed to `profile.email`. Swap this for a POST to
    // Formspree/EmailJS/your own API route once you have one.
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    void fireConfetti();
    showAchievementToast({
      title: "Quest Sent",
      description: "Your message is on its way — expect a reply soon.",
      variant: "violet",
    });
    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <SectionHeading index="LOG_05" title="Save & Continue" subtitle="Ready to start a new quest? Reach out and let's collaborate." icon={<Save className="h-5 w-5" />} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          >
            <Panel className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary">
                    <Chip size="sm"><User className="h-3.5 w-3.5" /></Chip>
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="game-input font-mono"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary">
                    <Chip size="sm"><AtSign className="h-3.5 w-3.5" /></Chip>
                    Contact Method
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="game-input font-mono"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary">
                    <Chip size="sm"><MessageSquare className="h-3.5 w-3.5" /></Chip>
                    Quest Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="game-input resize-none font-mono"
                    placeholder="Tell me about the role or project..."
                  />
                </div>

                <Button type="submit" variant="achievement" className="w-full" size="lg">
                  <Send className="h-4 w-4" />
                  {status === "sent" ? "Message Queued — Send Again" : "Send Message"}
                </Button>
              </form>

              <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-textSecondary transition-colors hover:text-text">
                  <Chip size="sm"><Mail className="h-4 w-4 text-accent-violet" /></Chip>
                  <span className="truncate">{profile.email}</span>
                </a>
                <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm text-textSecondary transition-colors hover:text-text">
                  <Chip size="sm"><Phone className="h-4 w-4 text-accent-violet" /></Chip>
                  <span>{profile.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-textSecondary">
                  <Chip size="sm"><MapPin className="h-4 w-4 text-accent-violet" /></Chip>
                  <span>{profile.location}</span>
                </div>
              </div>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
