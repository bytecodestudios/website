'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { useContent } from './ContentProvider';
import { getIcon } from './icons';

export default function About() {
  const { sections, about } = useContent();

  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeader {...sections.about} />

        <div className="grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="card group"
              >
                <div className="ring-grad mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Focus areas */}
        <div className="mt-16">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            What we work on
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {about.focus.map((f, i) => {
              const Icon = getIcon(f.icon);
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="glass flex items-start gap-3 rounded-xl p-4 transition-colors hover:border-white/20"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <div>
                    <div className="text-sm font-medium text-white">{f.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/55">{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
