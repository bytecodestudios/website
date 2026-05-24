// Central configuration — edit this file to update site-wide content.

export const site = {
  name: 'Bytecode Studios',
  short: 'Bytecode',
  tagline:
    'Independent developers. One collective. Building free tools for the community and premium custom solutions for clients.',
  url: 'https://bytecodestudios.dev',
  email: 'contact@bytecodestudios.dev',
  discord: 'https://discord.gg/bytecodestudios',
  github: 'https://github.com/bytecode-studios',
  youtube: 'https://youtube.com/@bytecodestudios',
  docs: 'https://docs.bytecodestudios.dev',
  store: 'https://store.bytecodestudios.dev',
  // Optional Discord webhook used by the inquiry form. Leave empty to disable.
  inquiryWebhook: process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || '',
};

export const nav = [
  { label: 'About',     href: '#about' },
  { label: 'Team',      href: '#team' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
];

export const stats = [
  { label: 'Active developers',   value: 12, suffix: '+' },
  { label: 'Free releases',       value: 48, suffix: '+' },
  { label: 'Custom projects',     value: 130, suffix: '+' },
  { label: 'Community members',   value: 9500, suffix: '+' },
];
