// Discord OAuth2 helpers and admin permission check.
const API = 'https://discord.com/api/v10';
const ADMINISTRATOR = 0x8n;
const MANAGE_GUILD = 0x20n;

const list = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);

export const SCOPES = 'identify guilds guilds.members.read';

export function redirectUri(origin) {
  return process.env.DISCORD_REDIRECT_URI || `${origin}/api/auth/callback`;
}

export function authorizeUrl(origin, state) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: redirectUri(origin),
    response_type: 'code',
    scope: SCOPES,
    state,
    prompt: 'none',
  });
  return `https://discord.com/oauth2/authorize?${params}`;
}

export async function exchangeCode(origin, code) {
  const res = await fetch(`${API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri(origin),
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Token exchange failed (${res.status})`);
  return res.json();
}

async function api(path, accessToken) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export const getUser = (token) => api('/users/@me', token);

/**
 * A user may access the admin panel if ANY of these hold:
 *  - their user id is listed in DISCORD_ADMIN_USER_IDS
 *  - they own / have Administrator or Manage Server in DISCORD_GUILD_ID
 *  - they have one of DISCORD_ADMIN_ROLE_IDS in DISCORD_GUILD_ID
 */
export async function isAdmin(user, accessToken) {
  if (list(process.env.DISCORD_ADMIN_USER_IDS).includes(user.id)) return true;

  const guildId = process.env.DISCORD_GUILD_ID;
  if (!guildId) return false;

  const guilds = (await api('/users/@me/guilds', accessToken)) || [];
  const guild = guilds.find((g) => g.id === guildId);
  if (!guild) return false;
  const perms = BigInt(guild.permissions || 0);
  if (guild.owner || perms & ADMINISTRATOR || perms & MANAGE_GUILD) return true;

  const roleIds = list(process.env.DISCORD_ADMIN_ROLE_IDS);
  if (roleIds.length === 0) return false;
  const member = await api(`/users/@me/guilds/${guildId}/member`, accessToken);
  return Boolean(member?.roles?.some((r) => roleIds.includes(r)));
}

export function avatarUrl(user) {
  return user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(user.id) >> 22n) % 6}.png`;
}
