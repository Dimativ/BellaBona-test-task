import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { BlockRenderer } from '@/blocks/blockRenderer';
import { type Locale, routing } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/live';
import { homePageQuery } from '@/sanity/queries';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

async function getHomePage(): Promise<HomePageQueryResult> {
  const { data } = await sanityFetch({
    query: homePageQuery,
    tags: ['homePage'],
  });
  return data as HomePageQueryResult;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getHomePage();
  const seo = data?.seo;
  const ogUrl = seo?.ogImage?.asset?.url;

  return {
    title: seo?.metaTitle || undefined,
    description: seo?.metaDescription || undefined,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots: {
      index: seo?.index !== 'noindex',
      follow: seo?.follow !== 'nofollow',
    },
    openGraph: ogUrl
      ? {
          images: [{ url: ogUrl }],
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getHomePage();

  return <BlockRenderer blocks={data?.blocks ?? null} locale={locale} />;
}
