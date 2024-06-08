import { kv } from '@vercel/kv';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params: { path } }: { params: { path: string[] } },
) => {
  const key = path.join('/');
  const editRedirect = () =>
    NextResponse.redirect(new URL(`/_/links/edit/${key}`, req.url), 307);

  if (!(await kv.sismember('links', key))) {
    return editRedirect();
  }

  const target = await kv.hget<string>(key, 'target');

  if (!target) {
    // broken, remove index
    await kv.srem('links', key);
    return editRedirect();
  }

  return NextResponse.redirect(target, 308);
};
