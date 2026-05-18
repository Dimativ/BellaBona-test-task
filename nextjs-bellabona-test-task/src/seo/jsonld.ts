import type { SiteSettingsQueryResult } from '@/sanity/sanity.types';

type Settings = NonNullable<SiteSettingsQueryResult>;

type JsonLd = Record<string, unknown>;

function clean<T extends JsonLd>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  ) as T;
}

export function buildOrganizationJsonLd(settings: Settings | null | undefined): JsonLd | null {
  if (!settings) return null;
  const domain = settings.primaryDomain || undefined;
  const logoUrl = settings.logo?.asset?.url || undefined;
  const sameAs = (settings.socials ?? [])
    .map((s) => s?.link)
    .filter((v): v is string => typeof v === 'string' && v.length > 0);

  const node: JsonLd = clean({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': domain ? `${domain.replace(/\/+$/, '')}/#org` : undefined,
    name: settings.orgName,
    legalName: settings.orgLegalName,
    description: settings.orgDescription,
    url: domain,
    logo: logoUrl,
    image: logoUrl,
    email: settings.contactEmail?.value,
    sameAs,
  });

  return node;
}

export function buildWebSiteJsonLd(
  settings: Settings | null | undefined,
  locale: string,
): JsonLd | null {
  if (!settings?.primaryDomain) return null;
  const domain = settings.primaryDomain.replace(/\/+$/, '');

  return clean({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    url: domain,
    name: settings.orgName,
    description: settings.orgDescription,
    inLanguage: locale,
    publisher: { '@id': `${domain}/#org` },
  });
}

export function buildFaqJsonLd(items: Array<{ question: string; answer: string }>): JsonLd | null {
  const mainEntity = items
    .filter((i) => i.question && i.answer)
    .map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.answer,
      },
    }));
  if (mainEntity.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export function buildGraph(settings: Settings | null | undefined, locale: string): JsonLd | null {
  const org = buildOrganizationJsonLd(settings);
  const site = buildWebSiteJsonLd(settings, locale);
  const graph = [org, site].filter(Boolean);
  if (graph.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
