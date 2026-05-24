'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { site } from '@/config/site';

const projectTypes = [
  'FiveM Script', 'Discord Bot', 'Web Dashboard', 'UI / UX', 'Automation', 'Backend / API', 'Integration', 'Other',
];
const budgets   = ['< $500', '$500 – $2k', '$2k – $5k', '$5k – $15k', '$15k+'];
const timelines = ['ASAP', '1–2 weeks', '1 month', '2–3 months', 'Flexible'];

export default function Contact() {
  const [state, setState] = useState({ loading: false, ok: false, error: '' });
  const [form, setForm] = useState({
    name: '', email: '', discord: '',
    projectType: projectTypes[0], budget: budgets[1], timeline: timelines[1],
    description: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      if (site.inquiryWebhook) {
        const payload = {
          username: 'Bytecode Inquiries',
          embeds: [{
            title: 'New project inquiry',
            color: 0x6366f1,
            fields: [
              { name: 'Name',     value: form.name || '—',    inline: true },
              { name: 'Email',    value: form.email || '—',   inline: true },
              { name: 'Discord',  value: form.discord || '—', inline: true },
              { name: 'Type',     value: form.projectType,    inline: true },
              { name: 'Budget',   value: form.budget,         inline: true },
              { name: 'Timeline', value: form.timeline,       inline: true },
              { name: 'Project',  value: form.description?.slice(0, 1800) || '—' },
            ],
            timestamp: new Date().toISOString(),
          }],
        };
        const res = await fetch(site.inquiryWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Webhook failed');
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setState({ loading: false, ok: true, error: '' });
      setForm((f) => ({ ...f, description: '' }));
    } catch (err) {
      setState({ loading: false, ok: false, error: 'Something went wrong. Please email us directly.' });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-px">
        <SectionHeader
          eyebrow="Start a project"
          title="Tell us what you're building."
          lede="Submit an inquiry below or email us at contact@bytecodestudios.dev. We reply within 24h on business days."
        />

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
                  <CheckCircle2 className="h-4 w-4" /> Thanks — we'll reply within 24h.
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

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          color: #fff;
          padding: 0.7rem 0.85rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background-color .2s;
        }
        :global(.input::placeholder) { color: rgba(255,255,255,0.4); }
        :global(.input:focus) {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
          background: rgba(255,255,255,0.06);
        }
        :global(.input option) { background: #10101e; color: #fff; }
      `}</style>
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
