'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';
import CircuitThumb from './CircuitThumb';
import { useContent } from './ContentProvider';

export default function Portfolio() {
  const { sections, portfolio } = useContent();

  return (
    <section id="portfolio" className="section">
      <div className="container-px">
        <SectionHeader {...sections.portfolio} />

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
              <CircuitThumb seed={c.id} className="h-56 !rounded-none !border-0 md:col-span-2 md:h-auto">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">Case study</div>
                  <div className="mt-1 font-display text-xl font-semibold text-white">{c.title}</div>
                </div>
              </CircuitThumb>

              <div className="p-6 md:col-span-3 md:p-8">
                <p className="text-sm leading-relaxed text-white/70">{c.summary}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>

                <ul className="mt-6 space-y-2">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      {o}
                    </li>
                  ))}
                </ul>

                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-200">
                    View project <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
