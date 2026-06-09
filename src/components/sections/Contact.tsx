// ─── Contact Section ──────────────────────────────────────────────────────────
// Provides a way for visitors to reach out.
//
// Layout (two-column on large screens):
//   Left  — CTA copy, direct email/LinkedIn links, availability code block
//   Right — Contact form (name, email, message) with client-side validation
//
// Form flow:
//   1. User fills in name, email, message.
//   2. On submit, validate() checks each field and shows inline errors if invalid.
//   3. If valid, status → 'sending', a simulated network delay runs (1800ms),
//      then status → 'success' and form resets.
//   4. After 5 seconds the success banner disappears (status → 'idle').
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, Linkedin, Mail, Clock } from 'lucide-react';
import { ContactFormData, ContactFormErrors } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// ─── validate ────────────────────────────────────────────────────────────────
// Returns an object of field-level error messages.
// An empty object means all fields are valid.
function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim() || data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }
  return errors;
}

// SubmitStatus tracks the lifecycle of the form submission
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

// ─── FormField Component ─────────────────────────────────────────────────────
// Renders a labelled form control — either an <input> or a <textarea>.
// Shows an animated error message below the field if `error` is provided.
// If `rows` is provided, renders a textarea; otherwise renders an input.
interface InputProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onChange: (v: string) => void;
  rows?: number;
}

const FormField: React.FC<InputProps> = ({ id, label, value, error, type = 'text', placeholder, onChange, rows }) => {
  const hasError = Boolean(error);
  const baseInput =
    'w-full bg-void border px-3 xs:px-4 py-2 xs:py-3 font-mono text-xs xs:text-sm text-cream placeholder-muted/50 outline-none transition-all duration-200 focus:border-electric/60 focus:bg-panel ' +
    (hasError ? 'border-rose-500/50' : 'border-white/10 hover:border-white/20');

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-mono text-xs text-muted tracking-widest uppercase">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInput} resize-none`}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className={baseInput}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
      )}
      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="font-mono text-xs text-rose-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Contact Section Component ───────────────────────────────────────────────
export const Contact: React.FC = () => {
  // form: the current values of the three text fields
  const [form,   setForm]   = useState<ContactFormData>({ name: '', email: '', message: '' });
  // errors: field-level validation messages (cleared when user edits the field)
  const [errors, setErrors] = useState<ContactFormErrors>({});
  // status: controls which UI state to show (idle / sending / success / error)
  const [status, setStatus] = useState<SubmitStatus>('idle');

  // update: returns a change handler for a specific field.
  // Also clears that field's error as soon as the user starts typing.
  const update = (field: keyof ContactFormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // handleSubmit: validates, simulates sending, then shows success banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs); // Show inline errors and stop
      return;
    }
    setStatus('sending');

    // ── TODO: Replace the setTimeout with a real API call ──
    // Example with EmailJS:
    // await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { ...form }, 'PUBLIC_KEY');
    console.log('📬 Contact form submission:', form);
    await new Promise((r) => setTimeout(r, 1800)); // Simulated 1.8s network delay

    setStatus('success');
    setForm({ name: '', email: '', message: '' }); // Reset form fields
    setTimeout(() => setStatus('idle'), 5000);     // Hide success banner after 5s
  };

  return (
    <section id="contact" className="py-20 xs:py-28 bg-panel/40" aria-label="Contact section">
      <div className="max-w-6xl mx-auto px-4 xs:px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-16 xs:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-electric text-xs xs:text-sm tracking-widest">// 06</span>
          <h2 className="font-mono text-2xl xs:text-3xl md:text-4xl font-bold text-cream">Let's Build Something</h2>
          <div className="hidden xs:flex flex-1 h-px bg-gradient-to-r from-electric/30 to-transparent" aria-hidden="true" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 lg:gap-24 items-start">
          {/* Left: CTA copy */}
          <motion.div
            className="flex flex-col gap-4 xs:gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <Badge variant="available" className="mb-3 xs:mb-4">Open to Opportunities</Badge>
              <h3 className="font-mono text-xl xs:text-2xl font-bold text-cream mb-3 xs:mb-4 leading-snug">
                Have an idea, a role,<br />or a problem worth solving?
              </h3>
              <p className="text-muted text-sm xs:text-base leading-relaxed">
                I'm currently open to senior full-stack roles and select freelance projects. Whether
                you need someone to architect a system from scratch or level up an existing codebase —
                let's talk.
              </p>
            </div>

            <div className="flex flex-col gap-3 xs:gap-4 pt-1 xs:pt-2">
              <motion.a
                href="mailto:muthukumaran6967@gmail.com"
                className="inline-flex items-center gap-3 text-cream hover:text-electric transition-colors duration-200 group"
                whileHover={{ x: 4 }}
                aria-label="Send email to muthukumaran6967@gmail.com"
              >
                <Mail size={16} className="text-electric flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs xs:text-sm break-all">muthukumaran6967@gmail.com</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/muthukumaran-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-cream hover:text-electric transition-colors duration-200 group"
                whileHover={{ x: 4 }}
                aria-label="View LinkedIn profile"
              >
                <Linkedin size={16} className="text-electric flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs xs:text-sm break-all">linkedin.com/in/muthukumaran-s</span>
              </motion.a>

              <div className="inline-flex items-center gap-3 text-muted">
                <Clock size={16} className="text-electric/60 flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs">Usually replies within 24 hours</span>
              </div>
            </div>

            {/* Code block aesthetic */}
            <div className="mt-2 xs:mt-4 bg-card border border-white/[0.06] p-3 xs:p-4 font-mono text-xs overflow-auto">
              <div className="text-muted/50 mb-1">// current status</div>
              <div>
                <span className="text-electric">const</span>{' '}
                <span className="text-cream">availability</span>{' '}
                <span className="text-muted">=</span>{' '}
                <span className="text-golden">"open"</span><span className="text-muted">;</span>
              </div>
              <div>
                <span className="text-electric">const</span>{' '}
                <span className="text-cream">location</span>{' '}
                <span className="text-muted">=</span>{' '}
                <span className="text-golden">"Madurai, Tamil Nadu, India"</span><span className="text-muted">;</span>
              </div>
              <div>
                <span className="text-electric">const</span>{' '}
                <span className="text-cream">timezone</span>{' '}
                <span className="text-muted">=</span>{' '}
                <span className="text-golden">"IST (UTC+5:30)"</span><span className="text-muted">;</span>
              </div>
              <div>
                <span className="text-electric">const</span>{' '}
                <span className="text-cream">phone</span>{' '}
                <span className="text-muted">=</span>{' '}
                <span className="text-golden">"+91 88383 36941"</span><span className="text-muted">;</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="flex flex-col gap-5"
            >
              <FormField
                id="name"
                label="Your Name"
                value={form.name}
                error={errors.name}
                placeholder="Jane Smith"
                onChange={update('name')}
              />
              <FormField
                id="email"
                label="Email Address"
                value={form.email}
                error={errors.email}
                type="email"
                placeholder="jane@company.com"
                onChange={update('email')}
              />
              <FormField
                id="message"
                label="Message"
                value={form.message}
                error={errors.message}
                placeholder="Tell me about your project, role, or just say hi..."
                rows={6}
                onChange={update('message')}
              />

              {/* Submit button / state */}
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 border border-emerald-400/30 bg-emerald-400/5 text-emerald-400 font-mono text-sm"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle size={16} aria-hidden="true" />
                    Message sent! I'll get back to you within 24 hours.
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 border border-rose-500/30 bg-rose-500/5 text-rose-400 font-mono text-sm"
                    role="alert"
                  >
                    <XCircle size={16} aria-hidden="true" />
                    Something went wrong. Please email me directly.
                  </motion.div>
                ) : (
                  <motion.div key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'sending'}
                      icon={<Send size={15} />}
                      className="w-full justify-center"
                      aria-label="Send message"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
