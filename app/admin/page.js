import { cookies } from 'next/headers';
import { getSession } from '@/lib/session';
import { getContent, storeEnabled } from '@/lib/content';
import AdminEditor from '@/components/admin/AdminEditor';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin | Bytecode Studios', robots: { index: false } };

const errors = {
  forbidden: "Your Discord account doesn't have permission to manage this site.",
  invalid_state: 'Login session expired. Please try again.',
  oauth: 'Discord login failed. Please try again.',
  not_configured: 'Discord login is not configured. Set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET.',
};

export default async function AdminPage({ searchParams }) {
  const session = getSession(cookies());

  if (!session) {
    return (
      <div className="grid min-h-screen place-items-center p-4">
        <div className="glass-strong w-full max-w-sm rounded-3xl p-8 text-center">
          <img src="/logo-mark.png" alt="" className="mx-auto h-16 w-16" />
          <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-white">Bytecode Admin</h1>
          <p className="mt-2 text-sm text-white/60">Sign in with Discord to manage site content.</p>
          {searchParams?.error && (
            <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
              {errors[searchParams.error] || 'Something went wrong.'}
            </p>
          )}
          <a href="/api/auth/login" className="btn mt-6 w-full bg-[#5865F2] text-white hover:bg-[#4752c4]">
            Continue with Discord
          </a>
          <a href="/" className="mt-4 inline-block text-xs text-white/40 hover:text-white/70">← Back to site</a>
        </div>
      </div>
    );
  }

  const content = await getContent();
  return <AdminEditor initial={content} user={session} storeEnabled={storeEnabled} />;
}
