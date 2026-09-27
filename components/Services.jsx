'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from './ContentProvider';
import { getIcon } from './icons';

export default function Services() {
  const { sections, services, workflow, timelineNote } = useContent();
  return (
    <section id="services" className="section">
      <div className="container-px">
        <SectionHeader {...sections.services} />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="card group flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{s.name}</h3>
                <span className="text-xs text-white/40">from {s.from}</span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{s.desc}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-200">
                Request quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* workflow */}
        <div className="mt-16">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            How we work
          </h3>
          <div className="grid gap-3 md:grid-cols-4">
            {workflow.map((w, i) => {
              const Icon = getIcon(w.icon);
              return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="ring-grad rounded-xl p-[1.5px]">
                    <div className="rounded-xl bg-bg-card p-2.5">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/40">Step {i + 1}</div>
                </div>
                <div className="mt-4 text-sm font-medium text-white">{w.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/55">{w.desc}</div>
              </motion.div>
            );
            })}
          </div>

          <div className="glass mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Clock className="h-4 w-4 text-brand-300" />
              {timelineNote}
            </div>
            <a href="#contact" className="btn-primary">
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
