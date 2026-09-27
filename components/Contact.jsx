'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from './ContentProvider';

const projectTypes = [
  'Website / Web App', 'Mobile / Desktop App', 'AI & Automation', 'Discord Bot / Integration', 'Backend / API', 'UI / UX Design', 'FiveM Resource', 'Other',
];
const budgets   = ['< $500', '$500-$2k', '$2k-$5k', '$5k-$15k', '$15k+'];
const timelines = ['ASAP', '1-2 weeks', '1 month', '2-3 months', 'Flexible'];

export default function Contact() {
  const { site, sections } = useContent();
  const [state, setState] = useState({ loading: false, ok: false, error: '' });
  const [form, setForm] = useState({
    name: '', email: '', discord: '',
    projectType: projectTypes[0], budget: budgets[1], timeline: timelines[1],
    description: '', website: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setState({ loading: false, ok: true, error: '' });
      setForm((f) => ({ ...f, description: '' }));
    } catch (err) {
      setState({ loading: false, ok: false, error: `${err.message} You can also email us at ${site.email}.` });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-px">
        <SectionHeader {...sections.contact} />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            onSubmit={onSubmit}
            className="glass-strong rounded-3xl p-6 md:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required>
                <input required value={form.name} onChange={set('name')} className="input" placeholder="Your name" />
              </Field>
              <Field label="Email" required>
                <input required type="email" value={form.email} onChange={set('email')} className="input" placeholder="you@domain.com" />
              </Field>
              <Field label="Discord username">
                <input value={form.discord} onChange={set('discord')} className="input" placeholder="username" />
              </Field>
              <Field label="Project type">
                <select value={form.projectType} onChange={set('projectType')} className="input">
                  {projectTypes.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Budget">
                <select value={form.budget} onChange={set('budget')} className="input">
                  {budgets.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Timeline">
                <select value={form.timeline} onChange={set('timeline')} className="input">
                  {timelines.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
            </div>

            {/* honeypot: hidden from humans */}
            <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden="true" />

            <div className="mt-4">
              <Field label="Project description" required>
                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={set('description')}
                  className="input resize-y"
                  placeholder="What are you building, who is it for, and what does success look like?"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={state.loading} className="btn-primary">
                <Send className="h-4 w-4" />
                {state.loading ? 'Sending…' : 'Send inquiry'}
              </button>
              {state.ok && (
                <span className="inline-flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Thanks, we'll reply within 24h.
                </span>
              )}
              {state.error && (
                <span className="inline-flex items-center gap-2 text-sm text-rose-400">
                  <AlertCircle className="h-4 w-4" /> {state.error}
                </span>
              )}
            </div>
          </motion.form>

          {/* aside */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="glass space-y-5 rounded-3xl p-6 md:p-8 lg:col-span-2"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Email</div>
              <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-white hover:text-brand-300">{site.email}</a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Discord</div>
              <a href={site.discord} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-white hover:text-brand-300">
                Join the community
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Response time</div>
              <p className="mt-1 text-sm text-white/70">Within 24h on business days.</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">What you get</div>
              <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                <li>· Discovery call within 48h</li>
                <li>· Fixed-scope proposal</li>
                <li>· Weekly demos & shared repo</li>
                <li>· 30-day post-launch support</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>

    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">
        {label} {required && <span className="text-brand-300">*</span>}
      </span>
      {children}
    </label>
  );
}
