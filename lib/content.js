// Site content storage.
// Defaults live in config/content.json. When an Upstash Redis / Vercel KV store is
// configured, edits made in the admin panel are saved there and override the defaults.
import { revalidateTag } from 'next/cache';
import defaults from '@/config/content.json';

const KEY = 'bytecode:content';
const TAG = 'content';

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeEnabled = Boolean(url && token);

export function getDefaults() {
  return defaults;
}

export async function getContent() {
  if (!storeEnabled) return defaults;
  try {
    const res = await fetch(`${url}/get/${KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [TAG] },
    });
    if (!res.ok) return defaults;
    const { result } = await res.json();
    if (!result) return defaults;
    // Shallow-merge so new top-level sections added to defaults still appear.
    return { ...defaults, ...JSON.parse(result) };
  } catch {
    return defaults;
  }
}

async function command(args) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Store error ${res.status}`);
  return res.json();
}

export async function saveContent(content) {
  if (!storeEnabled) throw new Error('Content store is not configured');
  await command(['SET', KEY, JSON.stringify(content)]);
  revalidateTag(TAG);
}

export async function resetContent() {
  if (!storeEnabled) throw new Error('Content store is not configured');
  await command(['DEL', KEY]);
  revalidateTag(TAG);
}
