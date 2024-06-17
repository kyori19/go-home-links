import { kv } from '@vercel/kv';
import { permanentRedirect, redirect } from 'next/navigation';

const getTarget = async (key: string) => {
  if (!(await kv.sismember('links', key))) {
    return null;
  }

  const target = await kv.hget<string>(key, 'target');

  if (!target) {
    // broken, remove index
    await kv.srem('links', key);
    return null;
  }

  return target;
};

export const GET = async (
  _: unknown,
  { params: { path } }: { params: { path: string[] } },
) => {
  const key = path.map((x) => encodeURIComponent(x)).join('/');
  const target = await getTarget(key);

  if (!target) {
    redirect(`/_/links/edit/${key}`);
  }

  return permanentRedirect(target);
};
