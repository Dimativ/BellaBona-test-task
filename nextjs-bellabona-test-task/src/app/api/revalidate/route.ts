import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook';

const TYPE_TO_TAGS: Record<string, string[]> = {
  siteSettings: ['siteSettings'],
  header: ['header'],
  footer: ['footer'],
  homePage: ['homePage'],
  meal: ['meal', 'homePage'],
  mealCategory: ['mealCategory', 'meal', 'homePage'],
  review: ['review', 'homePage'],
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? '';

  const isValid = await isValidSignature(rawBody, signature, secret);

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const documentType = body?._type;

  if (!documentType) {
    return NextResponse.json({ message: 'Missing _type in body' }, { status: 400 });
  }

  const tags = TYPE_TO_TAGS[documentType];

  if (!tags) {
    return NextResponse.json({
      revalidated: false,
      message: `No tags mapped for type: ${documentType}`,
    });
  }

  tags.forEach((tag) => revalidateTag(tag, 'default'));

  return NextResponse.json({ revalidated: true, tags });
}
