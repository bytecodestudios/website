'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Github, Package } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { projects, projectCategories } from '@/config/projects';

const gradients = {
  'gradient-1': 'from-indigo-500 via-violet-500 to-fuchsia-500',
  'gradient-2': 'from-cyan-400 via-sky-500 to-indigo-500',
  'gradient-3': 'from-fuchsia-500 via-pink-500 to-rose-500',
  'gradient-4': 'from-emerald-400 via-teal-500 to-cyan-500',
  'gradient-5': 'from-amber-400 via-orange-500 to-rose-500',
  'gradient-6': 'from-violet-500 via-purple-500 to-indigo-500',
};

function Thumb({ kind, label }) {
  return (
    <div className={`relative h-36 w-full overflow-hidden rounded-xl bg-gradient-to-br ${gradients[kind] || gradients['gradient-1']}`}>
      <div className="absolute inset-0 bg-grid-pattern [background-size:24px_24px] opacity-25" />
      <div className="absolute inset-0 noise opacity-[0.06]" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
        <Package className="h-3.5 w-3.5" />
        {label}
      </div>
    </div>
  );
}

export default function Projects() {
  const [cat, setCat] = useState('All');
  const list = useMemo(
    () => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeader
          eyebrow="Free Community Projects"
          title="Open releases, built for the community."
          lede="MIT-style licenses. Full source. Real documentation. Use them, fork them, contribute back."
        />

        <div className="mb-8 flex flex-wrap gap-1.5">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                cat === c
                  ? 'border-brand-500/60 bg-brand-500/15 text-brand-100'
                  : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="card flex flex-col"
            >
              <Thumb kind={p.thumb} label={p.platform} />

              <div className="mt-5 flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                <span className="chip">v{p.version}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-white/40">
                  {p.category}
                </span>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {p.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <a href={p.links.download} target="_blank" rel="noreferrer" className="btn-primary !py-2 text-xs">
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <a href={p.links.docs} target="_blank" rel="noreferrer" className="btn-secondary !py-2 text-xs">
                  <BookOpen className="h-3.5 w-3.5" /> Docs
                </a>
                <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary !py-2 text-xs">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
