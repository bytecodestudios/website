'use client';
import { useEffect, useState } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nav, site } from '@/config/site';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-px">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? 'glass-strong shadow-lg shadow-black/30'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-sm font-semibold tracking-tight text-white">
              {site.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a href={site.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" />
            </a>
            <a href={site.discord} target="_blank" rel="noreferrer" className="btn-primary">
              Join Discord
            </a>
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-white/80 hover:bg-white/[0.05]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-strong mt-2 rounded-2xl p-3 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={n.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.05]"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a href={site.discord} className="btn-primary w-full" target="_blank" rel="noreferrer">
                    Join Discord
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
