'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from './ContentProvider';

export default function Testimonials() {
  const { sections, testimonials } = useContent();
  const [i, setI] = useState(0);
  const total = testimonials.length;
  const go = (d) => setI((p) => (p + d + total) % total);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % total), 6500);
    return () => clearInterval(t);
  }, [total]);

  const t = testimonials[i];
  if (!t) return null;

  return (
    <section className="section">
      <div className="container-px">
        <SectionHeader {...sections.testimonials} align="center" />

        <div className="relative mx-auto max-w-3xl">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12">
            <Quote className="absolute -left-2 -top-2 h-24 w-24 text-white/[0.04]" />

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <p className="text-lg leading-relaxed text-white/85 md:text-xl">
                  “{t.quote}”
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="ring-grad h-10 w-10 rounded-full p-[1.5px]">
                    <div className="grid h-full w-full place-items-center rounded-full bg-bg-card text-sm font-semibold text-brand-200">
                      {t.name[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => go(-1)} className="btn-secondary !p-2" aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} className="btn-secondary !p-2" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
