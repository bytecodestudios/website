'use client';
import { motion } from 'framer-motion';
import { Gamepad2, Bot, Globe, Wrench, Palette, ServerCog, Zap, Heart, Users } from 'lucide-react';
import SectionHeader from './SectionHeader';

const focus = [
  { icon: Gamepad2,  title: 'FiveM Development',   desc: 'Frameworks, gamemodes, HUDs, inventories and server systems built for scale.' },
  { icon: Bot,       title: 'Discord Bots',         desc: 'Production bots with dashboards, payments, moderation and tooling.' },
  { icon: Globe,     title: 'Web Development',      desc: 'Marketing sites, dashboards and realtime apps on Next.js + edge.' },
  { icon: Wrench,    title: 'Tooling',              desc: 'CLIs, generators and developer tools that remove daily friction.' },
  { icon: ServerCog, title: 'Automation',           desc: 'Event-driven pipelines, queues and integrations across SaaS.' },
  { icon: Palette,   title: 'UI / UX Systems',      desc: 'Design systems, components, motion and brand-aligned interfaces.' },
  { icon: ServerCog, title: 'Custom Systems',       desc: 'Bespoke backends, APIs and integrations engineered to fit.' },
];

const pillars = [
  { icon: Heart, title: 'Community first',         desc: 'We ship free, open releases the same week the idea lands. Always.' },
  { icon: Zap,   title: 'Ship-ready quality',      desc: 'Typed, tested, documented. Production-grade by default — even the free stuff.' },
  { icon: Users, title: 'A collective, not a studio', desc: 'Each member runs their own brand. Together we tackle work no individual could.' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeader
          eyebrow="About Bytecode Studios"
          title="A collective built on craft and community."
          lede="Bytecode Studios is a group of independent developers who each run their own store and brand. We unite under one banner to ship free tools the community can rely on, and to take on premium custom work that benefits from a multi-disciplinary team."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card group"
            >
              <div className="ring-grad mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                <p.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Focus areas */}
        <div className="mt-16">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Focus areas
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {focus.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="glass flex items-start gap-3 rounded-xl p-4 transition-colors hover:border-white/20"
              >
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                <div>
                  <div className="text-sm font-medium text-white">{f.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/55">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
