import { NextResponse } from 'next/server';
import { exchangeCode, getUser, isAdmin, avatarUrl } from '@/lib/discord';
import { createSessionValue, SESSION_COOKIE, sessionCookieOptions } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  const { origin } = url;
  const fail = (error) => {
    const res = NextResponse.redirect(`${origin}/admin?error=${error}`);
    res.cookies.delete('bc_oauth_state');
    return res;
  };

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state || state !== request.cookies.get('bc_oauth_state')?.value) {
    return fail('invalid_state');
  }

  try {
    const { access_token } = await exchangeCode(origin, code);
    const user = await getUser(access_token);
    if (!user) return fail('oauth');
    if (!(await isAdmin(user, access_token))) return fail('forbidden');

    const res = NextResponse.redirect(`${origin}/admin`);
    res.cookies.delete('bc_oauth_state');
    res.cookies.set(
      SESSION_COOKIE,
      createSessionValue({
        id: user.id,
        username: user.global_name || user.username,
        avatar: avatarUrl(user),
      }),
      sessionCookieOptions,
    );
    return res;
  } catch (err) {
    console.error('[auth] callback failed', err);
    return fail('oauth');
  }
}
