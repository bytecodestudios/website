# Bytecode Studios Website

Site for Bytecode Studios: a team building meaningful digital solutions, from web platforms and automation to FiveM resources.
Built with **Next.js 14 (App Router)**, **TailwindCSS**, **Framer Motion** and **lucide-react**.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content

All site content lives in **`config/content.json`** (site info, team, projects, services, portfolio, FAQ, section headings…).

### Admin panel (`/admin`)

Sign in with Discord to edit everything in the browser. Access is granted if **any** of these match:

- your user ID is in `DISCORD_ADMIN_USER_IDS`
- you own, or have **Administrator** / **Manage Server** in, `DISCORD_GUILD_ID`
- you have a role listed in `DISCORD_ADMIN_ROLE_IDS` in that server

Saved edits are stored in Upstash Redis (Vercel KV) and go live immediately. Without a store, the panel
still works as an editor. Use **JSON** to download the result and commit it to `config/content.json`.

### Contact form → Discord

The inquiry form posts to `/api/inquiry`, which forwards a styled embed to `DISCORD_WEBHOOK_URL`
server-side, so the webhook URL is never exposed to visitors.

## Environment variables

Copy `.env.example` to `.env.local` for local dev, and add the same keys in
**Vercel → Project → Settings → Environment Variables**.

| Variable | Purpose |
| --- | --- |
| `DISCORD_WEBHOOK_URL` | Channel webhook that receives inquiries |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | Discord application for admin login (redirect: `https://<domain>/api/auth/callback`) |
| `DISCORD_GUILD_ID`, `DISCORD_ADMIN_ROLE_IDS`, `DISCORD_ADMIN_USER_IDS` | Who may access `/admin` |
| `SESSION_SECRET` | 32+ random chars for signing admin sessions |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis (set automatically when connected in Vercel) |

## Tech

- Next.js 14 App Router (JS, no TS toolchain required)
- TailwindCSS 3, dark-first design tokens in `tailwind.config.js`
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
config/content.json  all editable content (defaults for the admin panel)
lib/                 content store, Discord auth, sessions
app/admin/           admin panel
app/api/             inquiry + auth + admin APIs
```

## Production

```bash
npm run build
npm start
```

Deploy anywhere Next.js runs. Vercel is the fastest path.
