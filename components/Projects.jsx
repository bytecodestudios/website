'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Github, Star, Code2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import CircuitThumb from './CircuitThumb';
import { useContent } from './ContentProvider';

const PAGE = 9;

export default function Projects() {
  const { sections, projects, projectCategories, team } = useContent();
  const [cat, setCat] = useState('All');
  const [owner, setOwner] = useState('all');
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(
    () => projects.filter((p) => (cat === 'All' || p.category === cat) && (owner === 'all' || p.owner === owner)),
    [projects, cat, owner],
  );
  const memberName = (id) => team.find((m) => m.id === id)?.name;
  const counts = useMemo(() => {
    const c = { All: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [projects]);

  const pick = (fn) => (v) => { fn(v); setShown(PAGE); };

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeader {...sections.projects} />

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => pick(setCat)(c)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  cat === c
                    ? 'border-brand-400/60 bg-brand-500/20 text-brand-50'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
                }`}
              >
                {c} <span className="ml-1 text-white/35">{counts[c] || 0}</span>
              </button>
            ))}
          </div>
          <select
            value={owner}
            onChange={(e) => pick(setOwner)(e.target.value)}
            className="input !w-auto !py-2 text-xs"
            aria-label="Filter by team member"
          >
            <option value="all">All members</option>
            {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: (i % PAGE) * 0.03 }}
              className="card flex flex-col"
            >
              <CircuitThumb seed={p.id}>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                  <Code2 className="h-3.5 w-3.5" />
                  {p.language || p.platform}
                </div>
                {p.stars > 0 && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 text-xs text-white/90 backdrop-blur">
                    <Star className="h-3 w-3" /> {p.stars}
                  </div>
                )}
              </CircuitThumb>

              <div className="mt-5 flex items-center gap-2">
                <h3 className="truncate text-base font-semibold text-white">{p.name}</h3>
                {p.version && <span className="chip">v{p.version}</span>}
                <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wider text-white/40">
                  {p.category}
                </span>
              </div>
              {memberName(p.owner) && (
                <div className="mt-1 text-xs text-brand-300">by {memberName(p.owner)}</div>
              )}

              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.description}</p>

              <div className="mt-5 flex gap-2">
                {p.links?.download && (
                  <a href={p.links.download} target="_blank" rel="noreferrer" className="btn-primary flex-1 !py-2 text-xs">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                )}
                {p.links?.docs && (
                  <a href={p.links.docs} target="_blank" rel="noreferrer" className="btn-secondary flex-1 !py-2 text-xs">
                    <BookOpen className="h-3.5 w-3.5" /> Docs
                  </a>
                )}
                {p.links?.github && (
                  <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary flex-1 !py-2 text-xs">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {list.length === 0 && (
          <div className="glass mt-8 rounded-2xl p-10 text-center text-sm text-white/50">
            No projects match your filters.
          </div>
        )}

        {shown < list.length && (
          <div className="mt-10 text-center">
            <button onClick={() => setShown((n) => n + PAGE)} className="btn-secondary">
              Show more ({list.length - shown} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
