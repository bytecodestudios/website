export const projectCategories = [
  'All', 'FiveM', 'Discord Bots', 'Tools', 'UI Assets', 'Web Utilities', 'Open Source',
];

export const projects = [
  {
    id: 'bc-economy',
    name: 'bc-economy',
    description: 'Modular economy framework for FiveM with banks, businesses, taxes and pluggable shops.',
    platform: 'FiveM',
    category: 'FiveM',
    version: '2.3.1',
    thumb: 'gradient-1',
    links: {
      download: 'https://github.com/bytecode-studios/bc-economy/releases',
      docs:     'https://docs.bytecodestudios.dev/bc-economy',
      github:   'https://github.com/bytecode-studios/bc-economy',
    },
  },
  {
    id: 'bc-jobs',
    name: 'bc-jobs',
    description: 'Roleplay job system with progression trees, payouts, and event hooks.',
    platform: 'FiveM',
    category: 'FiveM',
    version: '1.7.0',
    thumb: 'gradient-2',
    links: {
      download: 'https://github.com/bytecode-studios/bc-jobs/releases',
      docs:     'https://docs.bytecodestudios.dev/bc-jobs',
      github:   'https://github.com/bytecode-studios/bc-jobs',
    },
  },
  {
    id: 'bc-tickets',
    name: 'bc-tickets',
    description: 'A polished, themable ticket system for Discord with transcripts and tagging.',
    platform: 'Discord',
    category: 'Discord Bots',
    version: '3.0.4',
    thumb: 'gradient-3',
    links: {
      download: 'https://github.com/bytecode-studios/bc-tickets',
      docs:     'https://docs.bytecodestudios.dev/bc-tickets',
      github:   'https://github.com/bytecode-studios/bc-tickets',
    },
  },
  {
    id: 'bc-ui-kit',
    name: 'bc-ui-kit',
    description: 'Free UI components and layout primitives for in-game and web dashboards.',
    platform: 'Web / Game',
    category: 'UI Assets',
    version: '0.9.2',
    thumb: 'gradient-4',
    links: {
      download: 'https://github.com/bytecode-studios/bc-ui-kit',
      docs:     'https://docs.bytecodestudios.dev/bc-ui-kit',
      github:   'https://github.com/bytecode-studios/bc-ui-kit',
    },
  },
  {
    id: 'bc-cli',
    name: 'bc-cli',
    description: 'A developer CLI to scaffold scripts, bots and dashboards in one command.',
    platform: 'Cross-platform',
    category: 'Tools',
    version: '1.2.0',
    thumb: 'gradient-5',
    links: {
      download: 'https://github.com/bytecode-studios/bc-cli',
      docs:     'https://docs.bytecodestudios.dev/bc-cli',
      github:   'https://github.com/bytecode-studios/bc-cli',
    },
  },
  {
    id: 'bc-webhooks',
    name: 'bc-webhooks',
    description: 'Tiny edge-ready library for sending styled Discord webhook embeds.',
    platform: 'Node / Edge',
    category: 'Web Utilities',
    version: '1.0.5',
    thumb: 'gradient-6',
    links: {
      download: 'https://github.com/bytecode-studios/bc-webhooks',
      docs:     'https://docs.bytecodestudios.dev/bc-webhooks',
      github:   'https://github.com/bytecode-studios/bc-webhooks',
    },
  },
];

export const portfolio = [
  {
    id: 'case-haven',
    title: 'Haven RP — Full server framework',
    summary: 'Custom FiveM framework, HUD, banking, jobs and admin dashboard built for a 500-slot community.',
    tech: ['FiveM', 'Lua', 'React', 'PostgreSQL'],
    outcomes: ['+38% player retention', '< 4ms script tick', '0 production incidents in 90 days'],
    thumb: 'gradient-3',
  },
  {
    id: 'case-orbit',
    title: 'Orbit — Creator Discord bot suite',
    summary: 'Bot platform for a 240k-member creator community with payments, perks and moderator tooling.',
    tech: ['Node.js', 'Discord.js', 'Stripe', 'Redis'],
    outcomes: ['$120k+ processed via perks', '99.98% uptime', 'Replaced 3 paid SaaS tools'],
    thumb: 'gradient-1',
  },
  {
    id: 'case-spectra',
    title: 'Spectra — Analytics dashboard',
    summary: 'Realtime web dashboard surfacing 14M+ events per day with sub-second filtering.',
    tech: ['Next.js', 'tRPC', 'ClickHouse', 'Tailwind'],
    outcomes: ['200ms p95 dashboard load', 'Replaced legacy Grafana stack', 'Used by 9 internal teams'],
    thumb: 'gradient-5',
  },
];

export const services = [
  { id: 'fivem',  name: 'Custom FiveM Scripts',   desc: 'Bespoke gamemodes, frameworks and systems built around your community.', from: '$250' },
  { id: 'bots',   name: 'Discord Bots',           desc: 'Production-grade bots with dashboards, payments and integrations.',       from: '$200' },
  { id: 'web',    name: 'Web Dashboards',         desc: 'Realtime admin panels and customer-facing apps in Next.js.',              from: '$600' },
  { id: 'ui',    name: 'UI / UX Systems',         desc: 'Design systems, branding and in-app interface design.',                   from: '$400' },
  { id: 'auto',  name: 'Automation Tools',        desc: 'Internal tooling, CLIs and CI workflows to remove toil.',                 from: '$300' },
  { id: 'api',   name: 'Backend & APIs',          desc: 'Typed APIs, queues and integrations engineered to scale.',                from: '$500' },
  { id: 'integ', name: 'Integrations',            desc: 'Stripe, Discord, FiveM, third-party APIs — connected cleanly.',           from: '$250' },
];

export const testimonials = [
  {
    quote: 'Bytecode delivered our framework two weeks ahead of schedule and the codebase is genuinely a joy to extend.',
    name:  'Marcus L.',
    role:  'Lead, Haven RP',
  },
  {
    quote: 'They treated our 240k-member community like their own. The bot platform paid for itself in the first month.',
    name:  'Priya S.',
    role:  'Founder, Orbit Creators',
  },
  {
    quote: 'The free releases got us hooked. Hiring them for paid work was the easiest decision of the quarter.',
    name:  'Jonas R.',
    role:  'CTO, Spectra Labs',
  },
  {
    quote: 'Clean architecture, thorough docs, no surprises. Exactly what a senior team should ship.',
    name:  'Elena V.',
    role:  'Engineering Manager',
  },
];

export const faqs = [
  {
    q: 'How does Bytecode Studios work?',
    a: 'Each developer runs their own independent store and brand. We collaborate under Bytecode Studios on free community releases and larger custom projects that benefit from a multi-disciplinary team.',
  },
  {
    q: 'Are the free releases really free?',
    a: 'Yes. All open releases are MIT or similarly permissive, with full source, documentation, and an active community for support.',
  },
  {
    q: 'How do I request a custom project?',
    a: 'Use the inquiry form below, or reach us on Discord. We respond within 24 hours on business days with scope, timeline and pricing.',
  },
  {
    q: 'What does pricing look like?',
    a: 'Small scripts start around $200. Larger custom systems, dashboards and bot platforms are quoted after a short discovery call.',
  },
  {
    q: 'Can I hire a specific developer directly?',
    a: 'Absolutely. Every team card links to that developer\'s personal store and Discord — work with them directly or route through the collective.',
  },
];
