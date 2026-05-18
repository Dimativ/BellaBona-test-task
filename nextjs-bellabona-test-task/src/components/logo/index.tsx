import { Link } from '@/i18n/navigation';

import styles from './logo.module.scss';

export function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="BellaBona — home">
      BELLABONA
    </Link>
  );
}
