import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { CopyButton } from '../../shared/CopyButton';
import styles from './TypographyPage.module.css';

const headingMixins = [
  { mixin: 'type-heading-xl', className: styles.headingXl },
  { mixin: 'type-heading-l',  className: styles.headingL  },
  { mixin: 'type-heading-m',  className: styles.headingM  },
  { mixin: 'type-heading-s',  className: styles.headingS  },
  { mixin: 'type-heading-xs', className: styles.headingXs },
];

const bodyMixins = [
  { mixin: 'type-body-l',         className: styles.bodyL        },
  { mixin: 'type-body-m',         className: styles.bodyM        },
  { mixin: 'type-body-s',         className: styles.bodyS        },
  { mixin: 'type-body-xs',        className: styles.bodyXs       },
  { mixin: 'type-body-ui',        className: styles.bodyUi       },
  { mixin: 'type-body-m-strong',  className: styles.bodyMStrong  },
  { mixin: 'type-body-s-strong',  className: styles.bodySStrong  },
  { mixin: 'type-body-xs-strong', className: styles.bodyXsStrong },
  { mixin: 'type-overline',       className: styles.overline     },
];

const monoMixins = [
  { mixin: 'type-mono-s',  className: styles.monoS  },
  { mixin: 'type-mono-xs', className: styles.monoXs },
];

export default function TypographyPage() {
  return (
    <div className={styles.page}>
      <DemoSection title="Typography" description="Type scale, weights, letter-spacing tokens, and PostCSS mixins.">

        <DemoSubsection label="Type Scale">
          <div className={styles.scaleList}>
            {[
              { token: '--admin-font-size-4xl', label: '4xl', value: '36px' },
              { token: '--admin-font-size-3xl', label: '3xl', value: '30px' },
              { token: '--admin-font-size-2xl', label: '2xl', value: '24px' },
              { token: '--admin-font-size-xl',  label: 'xl',  value: '20px' },
              { token: '--admin-font-size-l',   label: 'l',   value: '18px' },
              { token: '--admin-font-size-m',   label: 'm',   value: '16px' },
              { token: '--admin-font-size-s',   label: 's',   value: '14px' },
              { token: '--admin-font-size-xs',  label: 'xs',  value: '12px' },
              { token: '--admin-font-size-ui',  label: 'ui',  value: '11px' },
            ].map(({ token, label, value }) => (
              <div key={token} className={styles.row}>
                <span className={`${styles.sampleText} ${styles.scaleText}`} style={{ fontSize: `var(${token})` }}>
                  The quick brown fox
                </span>
                <code className={styles.metaCode}>{label} · {value} · {token}</code>
              </div>
            ))}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Font Weights">
          <div className={styles.weightList}>
            {[
              { token: '--admin-font-weight-body',     label: 'body (400)',     weight: 'var(--admin-font-weight-body)'     },
              { token: '--admin-font-weight-medium',   label: 'medium (500)',   weight: 'var(--admin-font-weight-medium)'   },
              { token: '--admin-font-weight-emphasis', label: 'emphasis (600)', weight: 'var(--admin-font-weight-emphasis)' },
            ].map(({ token, label, weight }) => (
              <div key={token} className={styles.row}>
                <span className={styles.sampleText} style={{ fontWeight: weight as string }}>
                  The quick brown fox
                </span>
                <code className={styles.metaCodeWrap}>{label} · {token}</code>
              </div>
            ))}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Letter Spacing">
          <div className={styles.spacingList}>
            {[
              { token: '--admin-tracking-tightest', label: 'tightest (−0.055em)' },
              { token: '--admin-tracking-tighter',  label: 'tighter (−0.04em)'  },
              { token: '--admin-tracking-tight',    label: 'tight (−0.03em)'    },
              { token: '--admin-tracking-snug',     label: 'snug (−0.02em)'     },
              { token: '--admin-tracking-normal',   label: 'normal (−0.01em)'   },
              { token: '--admin-tracking-wide',     label: 'wide (0.01em)'      },
            ].map(({ token, label }) => (
              <div key={token} className={styles.row}>
                <span className={styles.sampleText} style={{ letterSpacing: `var(${token})` }}>
                  LETTER SPACING
                </span>
                <code className={styles.metaCodeWrap}>{label} · {token}</code>
              </div>
            ))}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Heading Mixins">
          <div className={styles.mixinList}>
            {headingMixins.map(({ mixin, className }) => (
              <div key={mixin} className={styles.mixinRow}>
                <span className={className}>The quick brown fox</span>
                <div className={styles.mixinMeta}>
                  <code className={styles.mixinName}>@mixin {mixin}</code>
                  <CopyButton value={`@mixin ${mixin};`} />
                </div>
              </div>
            ))}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Body Mixins">
          <div className={styles.mixinList}>
            {bodyMixins.map(({ mixin, className }) => (
              <div key={mixin} className={styles.mixinRow}>
                <span className={className}>The quick brown fox</span>
                <div className={styles.mixinMeta}>
                  <code className={styles.mixinName}>@mixin {mixin}</code>
                  <CopyButton value={`@mixin ${mixin};`} />
                </div>
              </div>
            ))}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Mono Mixins">
          <div className={styles.mixinList}>
            {monoMixins.map(({ mixin, className }) => (
              <div key={mixin} className={styles.mixinRow}>
                <span className={className}>The quick brown fox</span>
                <div className={styles.mixinMeta}>
                  <code className={styles.mixinName}>@mixin {mixin}</code>
                  <CopyButton value={`@mixin ${mixin};`} />
                </div>
              </div>
            ))}
          </div>
        </DemoSubsection>

      </DemoSection>
    </div>
  );
}
