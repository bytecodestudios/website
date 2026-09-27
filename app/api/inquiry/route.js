import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export async function POST(request) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: 'Inquiries are not configured yet.' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const f = {
    name: clip(body.name, 100),
    email: clip(body.email, 200),
    discord: clip(body.discord, 100),
    projectType: clip(body.projectType, 60),
    budget: clip(body.budget, 40),
    timeline: clip(body.timeline, 40),
    description: clip(body.description, 3500),
  };
  if (!f.name || !f.description || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a description.' }, { status: 400 });
  }

  const payload = {
    username: 'Bytecode Inquiries',
    allowed_mentions: { parse: [] },
    embeds: [{
      title: 'New project inquiry',
      color: 0x6173bf,
      fields: [
        { name: 'Name', value: f.name, inline: true },
        { name: 'Email', value: f.email, inline: true },
        { name: 'Discord', value: f.discord || '-', inline: true },
        { name: 'Type', value: f.projectType || '-', inline: true },
        { name: 'Budget', value: f.budget || '-', inline: true },
        { name: 'Timeline', value: f.timeline || '-', inline: true },
      ],
      description: f.description,
      timestamp: new Date().toISOString(),
    }],
  };

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('[inquiry] webhook failed', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ error: 'Could not deliver your inquiry.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
