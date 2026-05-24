'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { portfolio } from '@/config/projects';

const gradients = {
  'gradient-1': 'from-indigo-500 via-violet-500 to-fuchsia-500',
  'gradient-3': 'from-fuchsia-500 via-pink-500 to-rose-500',
  'gradient-5': 'from-amber-400 via-orange-500 to-rose-500',
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container-px">
        <SectionHeader
          eyebrow="Portfolio & Case Studies"
          title="Custom work we're proud of."
          lede="A small selection of paid engagements, with the outcomes that mattered to each client."
        />

        <div className="space-y-6">
          {portfolio.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass overflow-hidden rounded-3xl md:grid md:grid-cols-5"
            >
              <div className={`relative h-56 md:col-span-2 md:h-auto bg-gradient-to-br ${gradients[c.thumb] || gradients['gradient-1']}`}>
                <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-25" />
                <div className="absolute inset-0 noise opacity-[0.06]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">Case study</div>
                  <div className="mt-1 text-lg font-semibold text-white">{c.title}</div>
                </div>
              </div>

              <div className="p-6 md:col-span-3 md:p-8">
                <p className="text-sm leading-relaxed text-white/70">{c.summary}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>

                <ul className="mt-6 space-y-2">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
