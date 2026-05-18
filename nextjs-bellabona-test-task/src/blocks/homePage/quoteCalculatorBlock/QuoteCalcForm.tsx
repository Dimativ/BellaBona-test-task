'use client';

import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CalendarIcon, UsersIcon, WarnIcon } from '@/assets';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { type LocalizedString, pickLocale } from '@/lib/locale';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  DAYS_DEFAULT,
  DAYS_OPTIONS,
  EMPLOYEES_DEFAULT,
  EMPLOYEES_MAX,
  EMPLOYEES_MIN,
  MEAL_PRICE_HIGH,
  MEAL_PRICE_LOW,
  PARTICIPATION_HIGH,
  PARTICIPATION_LOW,
  SUBSIDY_DEFAULT,
  SUBSIDY_MAX,
  SUBSIDY_MIN,
  WEEKS_PER_MONTH,
} from './constants';
import styles from './quoteCalculatorBlock.module.scss';

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

interface ResultCardData {
  title?: LocalizedString;
  perUnitLabel?: LocalizedString;
  note?: LocalizedString;
}

interface QuoteCalcFormProps {
  daysQuestion: string;
  dayLabelSingular: string;
  dayLabelPlural: string;
  employeesQuestion: string;
  employeesUnitLabel: string;
  subsidyQuestion: string;
  subsidyUnitLabel: string;
  employeesCard: ResultCardData | null | undefined;
  companyCard: ResultCardData | null | undefined;
  emailLabel: string;
  ctaText: string;
  ctaColor: ButtonColor;
  locale: Locale;
}

const schema = z.object({
  days: z.number().int().min(1).max(5),
  employees: z.number().int().min(EMPLOYEES_MIN).max(EMPLOYEES_MAX),
  subsidy: z.number().min(SUBSIDY_MIN).max(SUBSIDY_MAX),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

const fmtEur = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
const fmtInt = (n: number) => `${n} €`;

function calcEmployeePerMeal(subsidy: number) {
  const low = Math.max(0, MEAL_PRICE_LOW - subsidy);
  const high = Math.max(0, MEAL_PRICE_HIGH - subsidy);
  return { low, high };
}

function calcCompanyPerMonth(employees: number, days: number, subsidy: number) {
  const base = employees * subsidy * days * WEEKS_PER_MONTH;
  return { low: Math.round(base * PARTICIPATION_LOW), high: Math.round(base * PARTICIPATION_HIGH) };
}

export function QuoteCalcForm({
  daysQuestion,
  dayLabelSingular,
  dayLabelPlural,
  employeesQuestion,
  employeesUnitLabel,
  subsidyQuestion,
  subsidyUnitLabel,
  employeesCard,
  companyCard,
  emailLabel,
  ctaText,
  ctaColor,
  locale,
}: QuoteCalcFormProps) {
  const { control, register, handleSubmit, watch, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      days: DAYS_DEFAULT,
      employees: EMPLOYEES_DEFAULT,
      subsidy: SUBSIDY_DEFAULT,
      email: '',
    },
  });

  const days = watch('days');
  const employees = watch('employees');
  const subsidy = watch('subsidy');

  const employeePerMeal = calcEmployeePerMeal(subsidy);
  const companyPerMonth = calcCompanyPerMonth(employees, days, subsidy);

  const employeesProgress = ((employees - EMPLOYEES_MIN) / (EMPLOYEES_MAX - EMPLOYEES_MIN)) * 100;
  const subsidyProgress = ((subsidy - SUBSIDY_MIN) / (SUBSIDY_MAX - SUBSIDY_MIN)) * 100;

  const onSubmit = (values: FormData) => {
    // eslint-disable-next-line no-console
    console.log('Quote request:', values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Typography variant="label_xl" color="side_black" extraClassName={styles.question}>
          <CalendarIcon className={styles.questionIcon} />
          {daysQuestion}
        </Typography>
        <Controller
          control={control}
          name="days"
          render={({ field }) => (
            <div className={styles.daysGroup} style={{ marginTop: 16 }}>
              {DAYS_OPTIONS.map((d) => {
                const active = field.value === d;
                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => field.onChange(d)}
                    className={clsx(styles.dayButton, active && styles.dayButtonActive)}
                    aria-pressed={active}
                  >
                    <Typography variant="h3" seo="p" extraClassName={styles.dayNumber}>
                      {d}
                    </Typography>
                    <Typography variant="label_sm" extraClassName={styles.dayLabel}>
                      {d === 1 ? dayLabelSingular : dayLabelPlural}
                    </Typography>
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      <div className={styles.row}>
        <Typography variant="label_xl" color="side_black" extraClassName={styles.question}>
          <UsersIcon className={styles.questionIcon} />
          {employeesQuestion}
        </Typography>
        <Controller
          control={control}
          name="employees"
          render={({ field }) => (
            <div className={styles.slider}>
              <input
                type="range"
                min={EMPLOYEES_MIN}
                max={EMPLOYEES_MAX}
                step={1}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className={styles.sliderInput}
                style={{ ['--progress' as never]: `${employeesProgress}%` }}
                aria-label={employeesQuestion}
              />
              <div className={styles.sliderTicks}>
                <Typography variant="label_sm">{EMPLOYEES_MIN}</Typography>
                <Typography variant="label_sm" extraClassName={styles.sliderMidValue}>
                  {field.value} {employeesUnitLabel}
                </Typography>
                <Typography variant="label_sm">{EMPLOYEES_MAX}</Typography>
              </div>
            </div>
          )}
        />
      </div>

      <div className={styles.row}>
        <Typography variant="label_xl" color="side_black" extraClassName={styles.question}>
          <UsersIcon className={styles.questionIcon} />
          {subsidyQuestion}
        </Typography>
        <Controller
          control={control}
          name="subsidy"
          render={({ field }) => (
            <div className={styles.slider}>
              <input
                type="range"
                min={SUBSIDY_MIN}
                max={SUBSIDY_MAX}
                step={0.1}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className={styles.sliderInput}
                style={{ ['--progress' as never]: `${subsidyProgress}%` }}
                aria-label={subsidyQuestion}
              />
              <div className={styles.sliderTicks}>
                <Typography variant="label_sm">{fmtInt(SUBSIDY_MIN)}</Typography>
                <Typography variant="label_sm" extraClassName={styles.sliderMidValue}>
                  {fmtEur(field.value)} {subsidyUnitLabel}
                </Typography>
                <Typography variant="label_sm">{fmtInt(SUBSIDY_MAX)}</Typography>
              </div>
            </div>
          )}
        />
      </div>

      <div className={styles.results}>
        <div className={clsx(styles.resultCard, styles.resultCardDark)}>
          <div className={styles.resultCardHead}>
            <Typography variant="label_sm" color="light_white">
              {pickLocale(employeesCard?.title, locale)}
            </Typography>
            <Typography variant="label_xl" color="light_white" weight="semiBold">
              {fmtEur(employeePerMeal.low)} - {fmtEur(employeePerMeal.high)} / dish
            </Typography>
            {employeesCard?.perUnitLabel && (
              <Typography variant="label_sm" color="light_white">
                {pickLocale(employeesCard.perUnitLabel, locale)}
              </Typography>
            )}
          </div>
          {employeesCard?.note && (
            <div className={styles.resultNote}>
              <WarnIcon className={styles.resultNoteIcon} />
              <Typography variant="label_sm" color="side_black">
                {pickLocale(employeesCard.note, locale)}
              </Typography>
            </div>
          )}
        </div>

        <div className={clsx(styles.resultCard, styles.resultCardLight)}>
          <div className={styles.resultCardHead}>
            <Typography variant="label_sm" color="green">
              {pickLocale(companyCard?.title, locale)}
            </Typography>
            <Typography variant="label_xl" color="green" weight="semiBold">
              {companyPerMonth.low} € - {companyPerMonth.high} € / mo
            </Typography>
            {companyCard?.perUnitLabel && (
              <Typography variant="label_sm" color="green">
                {pickLocale(companyCard.perUnitLabel, locale)}
              </Typography>
            )}
          </div>
          {companyCard?.note && (
            <div className={styles.resultNote}>
              <WarnIcon className={styles.resultNoteIcon} />
              <Typography variant="label_sm" color="side_black">
                {pickLocale(companyCard.note, locale)}
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className={styles.emailRow}>
        <Typography variant="label_md" extraClassName={styles.emailLabel}>
          {emailLabel}
        </Typography>
        <input
          type="email"
          {...register('email')}
          className={clsx(styles.emailInput, formState.errors.email && styles.emailInputError)}
          aria-invalid={!!formState.errors.email}
        />
        {formState.errors.email && (
          <Typography variant="label_sm" extraClassName={styles.error}>
            {formState.errors.email.message}
          </Typography>
        )}
      </div>

      <div className={styles.submit}>
        <Button text={ctaText} color={ctaColor} type="submit" />
      </div>
    </form>
  );
}
