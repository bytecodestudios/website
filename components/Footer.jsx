import { Github, MessageCircle, Youtube, BookOpen, Mail } from 'lucide-react';
import Logo from './Logo';
import { site, nav } from '@/config/site';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg-soft/60 backdrop-blur">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight text-white">{site.name}</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Social href={site.github}  icon={Github}        label="GitHub" />
              <Social href={site.discord} icon={MessageCircle} label="Discord" />
              <Social href={site.youtube} icon={Youtube}       label="YouTube" />
              <Social href={site.docs}    icon={BookOpen}      label="Docs" />
              <Social href={`mailto:${site.email}`} icon={Mail} label="Email" />
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Navigate</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-white/65 hover:text-white">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Community</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={site.discord} target="_blank" rel="noreferrer" className="text-white/65 hover:text-white">Discord server</a></li>
              <li><a href={site.github}  target="_blank" rel="noreferrer" className="text-white/65 hover:text-white">Open source on GitHub</a></li>
              <li><a href={site.docs}    target="_blank" rel="noreferrer" className="text-white/65 hover:text-white">Documentation</a></li>
              <li><a href={site.store}   target="_blank" rel="noreferrer" className="text-white/65 hover:text-white">Marketplace</a></li>
              <li><a href={`mailto:${site.email}`} className="text-white/65 hover:text-white">{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
