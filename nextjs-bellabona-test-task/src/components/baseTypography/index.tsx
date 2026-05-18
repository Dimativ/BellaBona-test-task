'use client';

import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren, createElement, forwardRef } from 'react';

import styles from './baseTypography.module.scss';

export type TypographySeoVariants = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export type BaseTypographyVariants = TypographySeoVariants | 'sup';

export interface BaseTypographyProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  italic?: boolean;
  underline?: boolean;
  centered?: boolean;
  uppercase?: boolean;
  innerline?: boolean;
  className?: string;
  seo?: TypographySeoVariants;
  showTitle?: boolean;
  extraClassName?: string;
}

export interface BaseComponentTypographyProps extends BaseTypographyProps {
  variant?: BaseTypographyVariants;
  variantClassName?: string;
  colorClassName?: string;
  weightClassName?: string;
  italicClassName?: string;
}

export const BaseTypography = forwardRef<HTMLElement, BaseComponentTypographyProps>(
  function BaseTypography(
    {
      variant = 'p',
      variantClassName,
      colorClassName,
      weightClassName,
      italicClassName,
      italic,
      underline,
      centered,
      uppercase,
      innerline,
      className,
      seo,
      showTitle,
      extraClassName,
      children,
      ...rest
    },
    ref,
  ) {
    return createElement(
      seo ?? variant,
      {
        ref,
        title: showTitle && children,
        className: clsx(
          className,
          colorClassName,
          variantClassName,
          weightClassName,
          italic ? italicClassName : '',
          {
            [styles.italic]: italic,
            [styles.centered]: centered,
            [styles.uppercase]: uppercase,
            [styles.underline]: underline,
            [styles.innerline]: innerline,
          },
          extraClassName,
        ),
        ...rest,
      },
      children,
    );
  },
);
