import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Spinner } from '@/primitives';

const SpinnerProps: PropRow[] = [
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", options: ['sm', 'md', 'lg'], description: 'Size of the spinner.' },
  { prop: 'variant', type: "'default' | 'inverted'", default: "'default'", options: ['default', 'inverted'], description: 'Color variant. Use inverted on dark backgrounds.' },
  { prop: 'label', type: 'string', default: "'Loading'", description: 'Accessible label for screen readers (aria-label).' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

export default function SpinnerDemo() {
  return (
    <DemoSection
      title="Spinner"
      description="Loading indicator. Available in three sizes (sm, md, lg) and two variants (default, inverted)."
    >
      <DemoShowcase code={`import { Spinner } from 'admin-ui';

<Spinner />`}>
        <Spinner />
      </DemoShowcase>
      <PropsTable props={SpinnerProps} />

      <DemoSubsection label="Sizes">
        <div className={sharedStyles.row}>
          <Spinner size="sm" label="Loading small" />
          <Spinner size="md" label="Loading medium" />
          <Spinner size="lg" label="Loading large" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Variants">
        <div className={sharedStyles.row}>
          <Spinner variant="default" label="Loading default" />
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: 'var(--admin-space-m)',
            borderRadius: 'var(--admin-radius-m)',
            background: 'var(--admin-surface-inverted-primary)',
          }}
        >
          <Spinner variant="inverted" label="Loading inverted" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Inline with text">
        <div className={sharedStyles.row}>
          <Spinner size="sm" label="Loading" />
          <span style={{ color: 'var(--admin-text-secondary)', fontSize: 'var(--admin-font-size-s)' }}>
            Loading...
          </span>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
