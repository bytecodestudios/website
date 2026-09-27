'use client';
import { motion } from 'framer-motion';
import { Github, BookOpen, Mail } from 'lucide-react';
import { useContent } from './ContentProvider';

export default function LinksHub() {
  const { site } = useContent();
  const items = [
    { icon: Github,        label: 'Official GitHub',   href: site.github,  blurb: 'Open-source projects & code' },
    { icon: BookOpen,      label: 'Documentation',     href: site.docs,    blurb: 'Guides & API references' },
    { icon: Mail,          label: 'Contact',           href: site.email ? `mailto:${site.email}` : '', blurb: site.email },
  ].filter((it) => it.href);
  return (
    <section className="section">
      <div className="container-px">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-steel/15 blur-3xl" />

          <div className="relative grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow mb-4">Official links</span>
              <h2 className="h-section gradient-text">One place for everything Bytecode.</h2>
              <p className="lede mt-4">
                Bookmark these, they never change. Each member also has their own links in the team directory.
              </p>
            </div>

            <div className="grid gap-3 md:col-span-8">
              {items.map((it, i) => (
                <motion.a
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="ring-grad rounded-xl p-[1.5px]">
                    <div className="rounded-xl bg-bg-card p-2.5">
                      <it.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{it.label}</div>
                    <div className="truncate text-xs text-white/50">{it.blurb}</div>
                  </div>
                  <div className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/70">→</div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
