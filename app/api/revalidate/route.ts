import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

const { REVALIDATE_SECRET } = process.env;

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret') || (await request.clone().json().catch(() => ({}))).secret;

  if (!REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: 'Missing REVALIDATE_SECRET env' }, { status: 500 });
  }

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  // Clear cached Notion payloads so fresh data is fetched on next request
  revalidateTag('notion:dataSource');
  revalidateTag('notion:page');
  revalidateTag('notion:blocks');

  // Refresh list/detail routes
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');

  return NextResponse.json({ revalidated: true });
}

export const runtime = 'nodejs';
