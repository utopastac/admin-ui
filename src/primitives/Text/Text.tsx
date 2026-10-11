import React from 'react';
import styles from './Text.module.css';

/**
 * All available typography variants.
 *
 * Headings: heading-xl, heading-l, heading-m, heading-s, heading-xs
 * Overline: overline (uppercase, semibold, xs)
 * Body:     body-m, body-s, body-xs
 * Strong:   body-m-strong, body-s-strong, body-xs-strong
 */
export type TextVariant =
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'heading-xs'
  | 'overline'
  | 'body-m'
  | 'body-s'
  | 'body-xs'
  | 'body-m-strong'
  | 'body-s-strong'
  | 'body-xs-strong';

/**
 * Semantic text color names matching --admin-text-* tokens.
 * Defaults to 'primary' when omitted.
 */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'highlight'
  | 'warning'
  | 'inverted-primary';

type ElementTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'li';

interface TextProps {
  /** Typography variant — determines font size, weight, line-height, and letter-spacing. */
  variant: TextVariant;
  /** HTML element to render. Defaults to 'span'. */
  as?: ElementTag;
  /** Semantic text color. Maps to --admin-text-* tokens. Defaults to 'primary'. */
  color?: TextColor;
  /** Additional CSS class for layout or overrides. */
  className?: string;
  children: React.ReactNode;
}

/** CSS class names use camelCase for hyphenated variants */
const variantClassMap: Record<TextVariant, string> = {
  'heading-xl': 'headingXl',
  'heading-l': 'headingL',
  'heading-m': 'headingM',
  'heading-s': 'headingS',
  'heading-xs': 'headingXs',
  'overline': 'overline',
  'body-m': 'bodyM',
  'body-s': 'bodyS',
  'body-xs': 'bodyXs',
  'body-m-strong': 'bodyMStrong',
  'body-s-strong': 'bodySStrong',
  'body-xs-strong': 'bodyXsStrong',
};

const colorClassMap: Record<TextColor, string> = {
  'primary': 'colorPrimary',
  'secondary': 'colorSecondary',
  'subtle': 'colorSubtle',
  'highlight': 'colorHighlight',
  'warning': 'colorWarning',
  'inverted-primary': 'colorInvertedPrimary',
};

/**
 * Text renders styled typography using the admin design system.
 *
 * Encapsulates all font-family, weight, size, line-height, and letter-spacing
 * values so consumers never need to manually compose token variables.
 *
 * ```tsx
 * <Text variant="heading-m" as="h2">Section Title</Text>
 * <Text variant="body-s" color="secondary">Subtitle text</Text>
 * <Text variant="overline">LABEL</Text>
 * ```
 */
const Text: React.FC<TextProps> = ({
  variant,
  as: Tag = 'span',
  color = 'primary',
  className = '',
  children,
}) => {
  const variantClass = styles[variantClassMap[variant]];
  const colorClass = styles[colorClassMap[color]];

  return (
    <Tag className={`${variantClass} ${colorClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Text;
