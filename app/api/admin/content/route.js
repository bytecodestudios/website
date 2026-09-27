import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/session';
import { getContent, saveContent, resetContent, storeEnabled } from '@/lib/content';

export const dynamic = 'force-dynamic';

const REQUIRED = ['site', 'team', 'projects', 'services', 'faqs'];

function guard() {
  const session = getSession(cookies());
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!storeEnabled) {
    return NextResponse.json(
      { error: 'No content store configured. Add Upstash Redis (KV) in Vercel, or download the JSON and commit it to config/content.json.' },
      { status: 501 },
    );
  }
  return null;
}

export async function GET() {
  if (!getSession(cookies())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getContent());
}

export async function PUT(request) {
  const denied = guard();
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const missing = REQUIRED.filter((k) => !body || typeof body[k] !== 'object');
  if (missing.length) {
    return NextResponse.json({ error: `Missing sections: ${missing.join(', ')}` }, { status: 400 });
  }

  try {
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin] save failed', err);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function DELETE() {
  const denied = guard();
  if (denied) return denied;
  try {
    await resetContent();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin] reset failed', err);
    return NextResponse.json({ error: 'Failed to reset content' }, { status: 500 });
  }
}
