'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles, MessageCircle, Code2 } from 'lucide-react';
import BackgroundFX from './BackgroundFX';
import { site, stats } from '@/config/site';
import Counter from './Counter';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <BackgroundFX />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            A developer collective · est. 2024
          </span>

          <h1 className="h-display mt-2">
            <span className="gradient-text">Independent developers.</span>
            <br />
            One collective.
          </h1>

          <p className="lede mx-auto mt-6 max-w-2xl">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="btn-primary">
              <Sparkles className="h-4 w-4" />
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#team" className="btn-secondary">
              <Users className="h-4 w-4" />
              Meet the Team
            </a>
            <a href="#contact" className="btn-secondary">
              <Code2 className="h-4 w-4" />
              Request Custom Work
            </a>
            <a href={site.discord} target="_blank" rel="noreferrer" className="btn-secondary">
              <MessageCircle className="h-4 w-4" />
              Join Discord
            </a>
          </div>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-bg-card/60 px-5 py-6">
                <div className="text-2xl font-semibold text-white md:text-3xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
