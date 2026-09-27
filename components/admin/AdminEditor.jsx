'use client';
import { useMemo, useState } from 'react';
import {
  Save, RotateCcw, Download, LogOut, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, AlertTriangle,
  CheckCircle2, Search,
} from 'lucide-react';
import { iconNames } from '@/components/icons';

// Sidebar tabs → top-level content keys.
const TABS = [
  { label: 'Site & Links', keys: ['site', 'nav'] },
  { label: 'Hero & Stats', keys: ['hero', 'stats'] },
  { label: 'Section Headings', keys: ['sections'] },
  { label: 'About', keys: ['about'] },
  { label: 'Team', keys: ['roles', 'team'] },
  { label: 'Projects', keys: ['projectCategories', 'projects'] },
  { label: 'Services', keys: ['services', 'workflow', 'timelineNote'] },
  { label: 'Portfolio', keys: ['portfolio'] },
  { label: 'Testimonials', keys: ['testimonials'] },
  { label: 'FAQ', keys: ['faqs'] },
  { label: 'Raw JSON', keys: [] },
];

const TEAM_LINK_KEYS = ['website', 'store', 'tebex', 'portfolio', 'github', 'support', 'discord', 'docs', 'youtube'];
const LONG = /^(desc|description|bio|summary|lede|quote|a|tagline)$/;

const humanize = (k) => String(k).replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

function blank(v) {
  if (Array.isArray(v)) return [];
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  if (typeof v === 'number') return 0;
  if (typeof v === 'boolean') return false;
  return '';
}

// Shapes for new items, so lists can be emptied and refilled safely.
const TEMPLATES = {
  projects: { id: '', name: 'new-project', description: '', category: 'Web Apps', platform: '', language: '', stars: 0, owner: '', thumb: '', links: { github: '', download: '', docs: '' } },
  portfolio: { id: '', title: 'New case study', summary: '', tech: [], outcomes: [], link: '' },
  testimonials: { quote: '', name: 'New testimonial', role: '' },
  faqs: { q: 'New question', a: '' },
  services: { id: '', name: 'New service', desc: '', from: '' },
  team: { id: '', name: 'New member', role: 'Core Team', tags: [], avatar: '', bio: '', links: {}, featured: [] },
  stats: { label: '', value: 0, suffix: '' },
  nav: { label: '', href: '#' },
  workflow: { icon: 'Rocket', title: '', desc: '' },
  pillars: { icon: 'Sparkles', title: '', desc: '' },
  focus: { icon: 'Sparkles', title: '', desc: '' },
};

const newId = (prefix) => `${prefix}-${Date.now().toString(36)}`;

const itemTitle = (it, i) => it?.name || it?.title || it?.label || it?.q || it?.quote?.slice(0, 50) || it?.id || `Item ${i + 1}`;

function Node({ name, value, onChange, path, options }) {
  // Icon picker
  if (name === 'icon' && typeof value === 'string') {
    return (
      <Labeled name={name}>
        <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
          {iconNames.map((n) => <option key={n}>{n}</option>)}
        </select>
      </Labeled>
    );
  }
  // Select from known options (e.g. category, owner)
  if (options?.[name] && typeof value === 'string') {
    return (
      <Labeled name={name}>
        <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">-</option>
          {options[name].map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Labeled>
    );
  }
  if (typeof value === 'string') {
    const long = LONG.test(name) || value.length > 90;
    return (
      <Labeled name={name}>
        {long ? (
          <textarea className="input resize-y" rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </Labeled>
    );
  }
  if (typeof value === 'number') {
    return (
      <Labeled name={name}>
        <input type="number" className="input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </Labeled>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {humanize(name)}
      </label>
    );
  }
  if (Array.isArray(value)) {
    const isObjects = TEMPLATES[name] || (value.length > 0 && typeof value[0] === 'object');
    if (!isObjects) return <StringList name={name} value={value} onChange={onChange} />;
    return <ObjectList name={name} value={value} onChange={onChange} path={path} options={options} />;
  }
  if (value && typeof value === 'object') {
    let obj = value;
    if (name === 'links' && path.startsWith('team')) {
      obj = Object.fromEntries(TEAM_LINK_KEYS.map((k) => [k, value[k] || '']));
    }
    return (
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-white/50">{humanize(name)}</legend>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(obj).map(([k, v]) => (
            <div key={k} className={typeof v === 'object' || LONG.test(k) ? 'md:col-span-2' : ''}>
              <Node
                name={k}
                value={v}
                path={`${path}.${k}`}
                options={options}
                onChange={(nv) => {
                  const next = { ...obj, [k]: nv };
                  // Drop empty team links so they don't render.
                  if (name === 'links') for (const key of Object.keys(next)) if (next[key] === '') delete next[key];
                  onChange(next);
                }}
              />
            </div>
          ))}
        </div>
      </fieldset>
    );
  }
  return null;
}

function Labeled({ name, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-white/55">{humanize(name)}</span>
      {children}
    </label>
  );
}

function StringList({ name, value, onChange }) {
  const [text, setText] = useState(value.join('\n'));
  return (
    <Labeled name={`${humanize(name)} (one per line)`}>
      <textarea
        className="input resize-y font-mono text-xs"
        rows={Math.min(8, Math.max(3, value.length + 1))}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean));
        }}
      />
    </Labeled>
  );
}

function ObjectList({ name, value, onChange, path, options }) {
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState('');
  const update = (i, v) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const remove = (i) => {
    if (!confirm(`Remove "${itemTitle(value[i], i)}"?`)) return;
    onChange(value.filter((_, j) => j !== i));
    setOpen(null);
  };
  const add = () => {
    const item = structuredClone(TEMPLATES[name] || blank(value[0]));
    if ('id' in item) item.id = newId(name);
    onChange([item, ...value]);
    setOpen(0);
    setQ('');
  };
  const ql = q.trim().toLowerCase();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">
          {humanize(name)} <span className="text-white/40">({value.length})</span>
        </h3>
        <div className="flex items-center gap-2">
          {value.length > 8 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              <input className="input !py-1.5 !pl-8 text-xs" placeholder="Filter…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          )}
          <button type="button" onClick={add} className="btn-secondary !px-3 !py-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {value.map((item, i) => {
          if (ql && !JSON.stringify(item).toLowerCase().includes(ql)) return null;
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 px-3 py-2">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex-1 truncate text-left text-sm text-white/85">
                  {itemTitle(item, i)}
                </button>
                <IconBtn onClick={() => move(i, -1)} label="Move up"><ChevronUp className="h-4 w-4" /></IconBtn>
                <IconBtn onClick={() => move(i, 1)} label="Move down"><ChevronDown className="h-4 w-4" /></IconBtn>
                <IconBtn onClick={() => remove(i)} label="Remove" danger><Trash2 className="h-4 w-4" /></IconBtn>
              </div>
              {isOpen && (
                <div className="grid gap-3 border-t border-white/10 p-4 md:grid-cols-2">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className={typeof v === 'object' || LONG.test(k) ? 'md:col-span-2' : ''}>
                      <Node name={k} value={v} path={`${path}.${k}`} options={options} onChange={(nv) => update(i, { ...item, [k]: nv })} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IconBtn({ onClick, label, danger, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg p-1.5 text-white/50 hover:bg-white/[0.06] ${danger ? 'hover:text-rose-400' : 'hover:text-white'}`}
    >
      {children}
    </button>
  );
}

function RawJson({ content, onChange }) {
  const [text, setText] = useState(() => JSON.stringify(content, null, 2));
  const [err, setErr] = useState('');
  return (
    <div>
      <p className="mb-3 text-sm text-white/55">Edit the full content document directly. Changes apply when the JSON is valid.</p>
      <textarea
        className="input h-[70vh] font-mono text-xs"
        spellCheck={false}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value));
            setErr('');
          } catch (x) {
            setErr(x.message);
          }
        }}
      />
      {err && <p className="mt-2 text-xs text-rose-400">{err}</p>}
    </div>
  );
}

export default function AdminEditor({ initial, user, storeEnabled }) {
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState({ busy: false, msg: '', ok: true });
  const dirty = content !== saved;

  const options = useMemo(() => ({
    category: (content.projectCategories || []).filter((c) => c !== 'All').map((c) => ({ value: c, label: c })),
    owner: (content.team || []).map((m) => ({ value: m.id, label: m.name })),
    role: (content.roles || []).filter((r) => r !== 'All').map((r) => ({ value: r, label: r })),
  }), [content.projectCategories, content.team, content.roles]);

  const call = async (method, body) => {
    setStatus({ busy: true, msg: '', ok: true });
    try {
      const res = await fetch('/api/admin/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      return true;
    } catch (e) {
      setStatus({ busy: false, msg: e.message, ok: false });
      return false;
    }
  };

  const save = async () => {
    if (await call('PUT', content)) {
      setSaved(content);
      setStatus({ busy: false, msg: 'Saved. The live site is updated.', ok: true });
    }
  };

  const reset = async () => {
    if (!confirm('Discard all admin edits and restore the defaults from config/content.json?')) return;
    if (await call('DELETE')) window.location.reload();
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(content, null, 2) + '\n'], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const current = TABS[tab];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <img src="/logo-mark.png" alt="" className="h-8 w-8" />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-white">Admin</span>
          <a href="/" target="_blank" className="ml-1 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
            View site <ExternalLink className="h-3 w-3" />
          </a>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {dirty && <span className="text-xs text-amber-300">Unsaved changes</span>}
            <button onClick={download} className="btn-secondary !px-3 !py-2 text-xs" title="Download content.json">
              <Download className="h-3.5 w-3.5" /> JSON
            </button>
            <button onClick={reset} disabled={!storeEnabled || status.busy} className="btn-secondary !px-3 !py-2 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={save} disabled={!storeEnabled || !dirty || status.busy} className="btn-primary !px-4 !py-2 text-xs">
              <Save className="h-3.5 w-3.5" /> {status.busy ? 'Saving…' : 'Save'}
            </button>
            <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3">
              <img src={user.avatar} alt="" className="h-7 w-7 rounded-full" />
              <span className="hidden text-xs text-white/70 sm:inline">{user.username}</span>
              <form action="/api/auth/logout" method="post">
                <button className="rounded-lg p-1.5 text-white/50 hover:bg-white/[0.06] hover:text-white" title="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {!storeEnabled && (
          <div className="mb-5 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              No content store is connected, so changes can’t be saved online. Add an Upstash Redis database from the
              Vercel Marketplace (it sets <code>KV_REST_API_URL</code> / <code>KV_REST_API_TOKEN</code>), or edit here, download
              the JSON and commit it to <code>config/content.json</code>.
            </div>
          </div>
        )}
        {status.msg && (
          <div className={`mb-5 flex items-center gap-2 rounded-xl border p-3 text-sm ${status.ok ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-rose-400/30 bg-rose-400/10 text-rose-300'}`}>
            {status.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />} {status.msg}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setTab(i)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  tab === i ? 'bg-brand-500/20 text-white' : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="glass min-w-0 space-y-6 rounded-2xl p-5 md:p-6">
            {current.keys.length === 0 ? (
              <RawJson content={content} onChange={setContent} />
            ) : (
              current.keys.map((k) => (
                <Node
                  key={k}
                  name={k}
                  value={content[k] ?? ''}
                  path={k}
                  options={options}
                  onChange={(v) => setContent((c) => ({ ...c, [k]: v }))}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
