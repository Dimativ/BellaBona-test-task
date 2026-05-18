import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import { QuoteCalcForm } from './QuoteCalcForm';
import styles from './quoteCalculatorBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type QuoteCalculatorBlockData = Extract<HomeBlocks[number], { _type: 'quoteCalculatorBlock' }>;
type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function QuoteCalculatorBlock({
  data,
  locale,
}: {
  data: QuoteCalculatorBlockData;
  locale: Locale;
}) {
  const title = pickLocale(data.title, locale);
  const ctaText = pickLocale(data.cta?.text, locale);
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? 'green';

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <FadeIn>
          <div className={styles.card}>
            {title && (
              <Typography
                variant="h2"
                color="black"
                weight="semiBold"
                centered
                extraClassName={styles.title}
              >
                {title}
              </Typography>
            )}

            <QuoteCalcForm
              daysQuestion={pickLocale(data.daysQuestion, locale)}
              dayLabelSingular={pickLocale(data.dayLabelSingular, locale)}
              dayLabelPlural={pickLocale(data.dayLabelPlural, locale)}
              employeesQuestion={pickLocale(data.employeesQuestion, locale)}
              employeesUnitLabel={pickLocale(data.employeesUnitLabel, locale)}
              subsidyQuestion={pickLocale(data.subsidyQuestion, locale)}
              subsidyUnitLabel={pickLocale(data.subsidyUnitLabel, locale)}
              employeesCard={data.employeesCard}
              companyCard={data.companyCard}
              emailLabel={pickLocale(data.emailLabel, locale)}
              ctaText={ctaText}
              ctaColor={ctaColor}
              locale={locale}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
