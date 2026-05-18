import type { Locale } from '@/i18n/routing';

export type LocalizedString = { en?: string | null; de?: string | null } | null | undefined;

export function pickLocale(value: LocalizedString, locale: Locale): string {
  if (!value) return '';
  return value[locale] ?? value.en ?? '';
}
