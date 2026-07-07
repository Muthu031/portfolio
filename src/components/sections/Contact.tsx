import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, User, AtSign, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";
import { useInView } from "../../hooks/useInView";

interface ContactProps {
  onView?: () => void;
}

export function Contact({ onView }: ContactProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (isInView && onView) onView();
  }, [isInView, onView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo only — connect to your backend)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 icon-chip-active text-accent-teal mb-4">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0111.186 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold tracking-wide uppercase text-text sm:text-4xl">
              Save &amp; Continue
            </h2>
            <p className="mt-3 text-base text-textSecondary">
              Ready to start a new quest? Reach out and let&apos;s collaborate.
            </p>
          </div>

          <div className="game-panel p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary"
                >
                  <span className="icon-chip">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  Player Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="game-input font-mono"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary"
                >
                  <span className="icon-chip">
                    <AtSign className="h-3.5 w-3.5" />
                  </span>
                  Contact Method
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="game-input font-mono"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-textSecondary"
                >
                  <span className="icon-chip">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  Quest Details
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="game-input font-mono resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button className="w-full">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>

            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 text-sm text-textSecondary">
                <span className="icon-chip">
                  <Mail className="h-4 w-4 text-accent-teal" />
                </span>
                <span>hello@muthukumaran.dev</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-textSecondary">
                <span className="icon-chip">
                  <Phone className="h-4 w-4 text-accent-teal" />
                </span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-textSecondary">
                <span className="icon-chip">
                  <MapPin className="h-4 w-4 text-accent-teal" />
                </span>
                <span>Chennai, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
