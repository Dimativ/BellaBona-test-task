import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/live';
import { headerQuery } from '@/sanity/queries';

import { LanguageSwitcher } from '../languageSwitcher';
import { Logo } from '../logo';
import { HeaderActions } from './HeaderActions';
import { HeaderNav } from './HeaderNav';
import { MobileMenu } from './MobileMenu';
import { StickyHeader } from './StickyHeader';
import styles from './header.module.scss';

export async function Header({ locale }: { locale: Locale }) {
  const { data } = await sanityFetch({
    query: headerQuery,
    tags: ['header'],
  });

  return (
    <StickyHeader>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />

          <div className={styles.desktopOnly}>
            <HeaderNav items={data?.navItems ?? []} locale={locale} />
          </div>

          <div className={styles.right}>
            <div className={styles.desktopOnly}>
              <HeaderActions menuButton={data?.menuButton} cta={data?.cta} locale={locale} />
            </div>
            <div className={styles.desktopOnly}>
              <LanguageSwitcher />
            </div>
            <div className={styles.mobileOnly}>
              <MobileMenu
                navItems={data?.navItems ?? []}
                menuButton={data?.menuButton}
                cta={data?.cta}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </header>
    </StickyHeader>
  );
}
