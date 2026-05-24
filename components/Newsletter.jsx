'use client';
import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="section pt-0">
      <div className="container-px">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center md:p-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-xl">
            <span className="eyebrow mb-4">Stay in the loop</span>
            <h3 className="h-section gradient-text">Get new releases, first.</h3>
            <p className="lede mt-3">
              One short email per month with new free releases, devlogs and community highlights. No spam — ever.
            </p>

            <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus:border-brand-500/60 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                />
              </div>
              <button type="submit" className="btn-primary !py-3">Subscribe</button>
            </form>

            {done && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> You're in. Check your inbox to confirm.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
