# Bytecode Studios — Website

Premium, community-focused site for the Bytecode Studios developer collective.
Built with **Next.js 14 (App Router)**, **TailwindCSS**, **Framer Motion** and **lucide-react**.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content

All content is config-driven — no code changes required to update copy.

| File | What it controls |
| --- | --- |
| `config/site.js`     | Brand info, official links, navigation, stat counters |
| `config/team.js`     | Team directory (cards, roles, personal links) |
| `config/projects.js` | Free releases, portfolio case studies, services, testimonials, FAQ |

### Adding a team member

Append to the `team` array in `config/team.js`:

```js
{
  id: 'newdev',
  name: 'New Dev',
  role: 'FiveM Developer',
  tags: ['FiveM Developer'],
  avatar: 'https://…',
  bio: '…',
  links: {
    website: 'https://…',
    discord: 'https://…',
    docs:    'https://…',
    github:  'https://…',
    youtube: 'https://…',
  },
  featured: ['bc-economy'], // optional project ids
}
```

### Adding a free release

Append to `projects` in `config/projects.js` with category, version and links.

### Discord webhook for inquiries

Set in `.env.local`:

```
NEXT_PUBLIC_DISCORD_WEBHOOK=https://discord.com/api/webhooks/…
```

When present, the contact form posts a styled embed to that channel.
Without it, the form simulates a successful submit (for placeholder/demo use).

## Tech

- Next.js 14 App Router (JS, no TS toolchain required)
- TailwindCSS 3 — dark-first design tokens in `tailwind.config.js`
- Framer Motion for transitions
- Custom animated canvas background, gradient accents, glassmorphism cards
- SEO: metadata, sitemap and robots routes built in

## Structure

```
app/
  layout.js          root layout, fonts, nav + footer
  page.js            single-page composition of every section
  globals.css        design tokens, utilities, animations
components/          UI building blocks
config/              all editable content (team, projects, services, …)
```

## Production

```bash
npm run build
npm start
```

Deploy anywhere Next.js runs — Vercel is the fastest path.
