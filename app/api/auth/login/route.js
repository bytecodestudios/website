import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { authorizeUrl } from '@/lib/discord';

export const dynamic = 'force-dynamic';

export function GET(request) {
  const { origin } = new URL(request.url);
  if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
    return NextResponse.redirect(`${origin}/admin?error=not_configured`);
  }
  const state = crypto.randomBytes(16).toString('hex');
  const res = NextResponse.redirect(authorizeUrl(origin, state));
  res.cookies.set('bc_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
}
