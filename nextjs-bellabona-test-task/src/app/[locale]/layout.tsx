import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Figtree, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import '@/assets/globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { routing } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/live';
import { siteSettingsQuery } from '@/sanity/queries';
import { JsonLd } from '@/seo/JsonLdScript';
import { buildGraph } from '@/seo/jsonld';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const getSiteSettings = cache(async () => {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  });
  return data;
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const faviconUrl = settings?.favicon?.asset?.url;

  return {
    title: settings?.orgName || 'BellaBona',
    description: settings?.orgDescription || '',
    icons: faviconUrl
      ? {
          icon: faviconUrl,
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const jsonLd = buildGraph(settings, locale);

  return (
    <html lang={locale} className={`${figtree.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={jsonLd} />
        <NextIntlClientProvider>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
