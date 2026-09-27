'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Globe, MessageCircle, BookOpen, Youtube, Github, X, ExternalLink,
  ShoppingCart, ShoppingBag, UserRound, Headphones,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from './ContentProvider';

const LinkIcon = ({ kind }) => {
  const map = {
    website: Globe, discord: MessageCircle, docs: BookOpen,
    youtube: Youtube, github: Github,
    store: ShoppingCart, tebex: ShoppingBag, portfolio: UserRound, support: Headphones,
  };
  const Icon = map[kind] || Globe;
  return <Icon className="h-4 w-4" />;
};

const linkLabel = {
  website: 'Website', discord: 'Discord', docs: 'Docs',
  youtube: 'YouTube', github: 'GitHub',
  store: 'Store', tebex: 'Tebex', portfolio: 'Portfolio', support: 'Support',
};

function MemberCard({ m, onOpen }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -4 }}
      onClick={() => onOpen(m)}
      className="card group text-left"
    >
      <div className="flex items-center gap-4">
        <div className="ring-grad rounded-2xl p-[1.5px]">
          <div className="rounded-2xl bg-bg-card p-1">
            <img
              src={m.avatar}
              alt={m.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">{m.name}</h3>
            <ExternalLink className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/70" />
          </div>
          <p className="mt-0.5 text-xs text-brand-300">{m.role}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/60">
        {m.bio}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {Object.keys(m.links).filter((k) => m.links[k]).slice(0, 5).map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/60"
          >
            <LinkIcon kind={k} />
            {linkLabel[k]}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function MemberModal({ m, onClose, projects }) {
  if (!m) return null;
  const featured = (m.featured || []).map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="glass-strong relative w-full max-w-xl rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-white/60 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <img src={m.avatar} alt={m.name} className="h-16 w-16 rounded-xl border border-white/10" />
            <div>
              <h3 className="text-xl font-semibold text-white">{m.name}</h3>
              <p className="text-sm text-brand-300">{m.role}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/70">{m.bio}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.tags?.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.entries(m.links).filter(([, href]) => href).map(([k, href]) => (
              <a
                key={k}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary justify-start"
              >
                <LinkIcon kind={k} />
                {linkLabel[k]}
              </a>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                Featured projects
              </div>
              <div className="space-y-2">
                {featured.map((p) => (
                  <a
                    key={p.id}
                    href={p.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm hover:bg-white/[0.06]"
                  >
                    <div>
                      <div className="font-medium text-white">{p.name}</div>
                      <div className="text-xs text-white/50">{p.category}{p.language ? ` · ${p.language}` : ''}{p.stars ? ` · ★ ${p.stars}` : ''}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/40" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Team() {
  const { sections, team, roles, projects } = useContent();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    return team.filter((m) => {
      const matchesRole = role === 'All' || m.tags?.includes(role) || m.role === role;
      const ql = q.trim().toLowerCase();
      const matchesQ =
        !ql ||
        m.name.toLowerCase().includes(ql) ||
        m.role.toLowerCase().includes(ql) ||
        m.bio.toLowerCase().includes(ql);
      return matchesRole && matchesQ;
    });
  }, [team, q, role]);

  return (
    <section id="team" className="section">
      <div className="container-px">
        <SectionHeader {...sections.team} />

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, role or bio"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div className="-mx-1 flex flex-nowrap gap-1.5 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  role === r
                    ? 'border-brand-500/60 bg-brand-500/15 text-brand-100'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MemberCard key={m.id} m={m} onOpen={setActive} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass mt-8 rounded-2xl p-10 text-center text-sm text-white/50">
            No developers match your filters.
          </div>
        )}
      </div>

      {active && <MemberModal m={active} projects={projects} onClose={() => setActive(null)} />}
    </section>
  );
}
