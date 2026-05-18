'use client';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { type LocalizedString, pickLocale } from '@/lib/locale';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './contactFormBlock.module.scss';

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

interface Labels {
  name?: LocalizedString;
  namePlaceholder?: LocalizedString;
  company?: LocalizedString;
  companyPlaceholder?: LocalizedString;
  email?: LocalizedString;
  emailPlaceholder?: LocalizedString;
  phone?: LocalizedString;
  phonePlaceholder?: LocalizedString;
  companySize?: LocalizedString;
  companySizePlaceholder?: LocalizedString;
  comments?: LocalizedString;
  commentsPlaceholder?: LocalizedString;
  agreement?: LocalizedString;
}

interface CompanySizeOption {
  _key: string;
  label?: LocalizedString;
  value?: string | null;
}

interface ContactFormProps {
  labels: Labels | null | undefined;
  companySizeOptions: (CompanySizeOption | null)[] | null | undefined;
  ctaText: string;
  ctaColor: ButtonColor;
  locale: Locale;
}

const schema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(1),
  companySize: z.string().min(1),
  comments: z.string().optional(),
  agree: z.literal(true),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({
  labels,
  companySizeOptions,
  ctaText,
  ctaColor,
  locale,
}: ContactFormProps) {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      companySize: '',
      comments: '',
      agree: false as unknown as true,
    },
  });

  const onSubmit = (values: FormData) => {
    // eslint-disable-next-line no-console
    console.log('Contact form:', values);
  };

  const l = (key: keyof Labels) => pickLocale(labels?.[key], locale);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <Typography variant="label_sm" color="side_black" weight="semiBold">
            {l('name')}
            <span className={styles.required}>*</span>
          </Typography>
          <input
            type="text"
            placeholder={l('namePlaceholder')}
            {...register('name')}
            className={clsx(styles.input, formState.errors.name && styles.inputError)}
          />
        </div>
        <div className={styles.field}>
          <Typography variant="label_sm" color="side_black" weight="semiBold">
            {l('company')}
          </Typography>
          <input
            type="text"
            placeholder={l('companyPlaceholder')}
            {...register('company')}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <Typography variant="label_sm" color="side_black" weight="semiBold">
          {l('email')}
          <span className={styles.required}>*</span>
        </Typography>
        <input
          type="email"
          placeholder={l('emailPlaceholder')}
          {...register('email')}
          className={clsx(styles.input, formState.errors.email && styles.inputError)}
        />
      </div>

      <div className={styles.field}>
        <Typography variant="label_sm" color="side_black" weight="semiBold">
          {l('phone')}
          <span className={styles.required}>*</span>
        </Typography>
        <input
          type="tel"
          placeholder={l('phonePlaceholder')}
          {...register('phone')}
          className={clsx(styles.input, formState.errors.phone && styles.inputError)}
        />
      </div>

      <div className={styles.field}>
        <Typography variant="label_sm" color="side_black" weight="semiBold">
          {l('companySize')}
          <span className={styles.required}>*</span>
        </Typography>
        <select
          {...register('companySize')}
          className={clsx(styles.select, formState.errors.companySize && styles.inputError)}
          defaultValue=""
        >
          <option value="" disabled>
            {l('companySizePlaceholder')}
          </option>
          {(companySizeOptions ?? []).map((opt) => {
            if (!opt?.value) return null;
            const label = pickLocale(opt.label, locale) || opt.value;
            return (
              <option key={opt._key} value={opt.value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.field}>
        <Typography variant="label_sm" color="side_black" weight="semiBold">
          {l('comments')}
        </Typography>
        <textarea
          placeholder={l('commentsPlaceholder')}
          {...register('comments')}
          className={styles.textarea}
        />
      </div>

      <label className={styles.agreement}>
        <input type="checkbox" {...register('agree')} className={styles.checkbox} />
        <Typography variant="label_sm" color="side_black">
          {l('agreement')}
        </Typography>
      </label>

      <div className={styles.submit}>
        <Button text={ctaText} color={ctaColor} type="submit" />
      </div>
    </form>
  );
}
