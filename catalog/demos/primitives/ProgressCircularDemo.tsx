import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import sharedStyles from '../../shared/styles.module.css';
import { ProgressCircular } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const ProgressCircularProps: PropRow[] = [
  { prop: 'value', type: 'number', description: 'Progress value between 0 and 100' },
  { prop: 'variant', type: "'default' | 'success' | 'error' | 'warning'", default: "'default'", options: ['default', 'success', 'error', 'warning'], description: 'Semantic colour variant of the progress arc' },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", options: ['sm', 'md', 'lg'], description: 'Diameter of the circular indicator' },
  { prop: 'label', type: 'string', description: 'ARIA label for the progressbar role' },
  { prop: 'showValue', type: 'boolean', default: 'false', description: 'When true, displays the numeric percentage value inside the circle' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the root element' },
];

const VALUES = [0, 25, 50, 75, 100] as const;
const VARIANTS = ['default', 'success', 'error', 'warning'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export default function ProgressCircularDemo() {
  return (
    <DemoSection
      title="ProgressCircular"
      description="Displays a value within a defined range as a circular progress indicator. Supports four semantic variants and three sizes."
    >
      <DemoShowcase code={`import { ProgressCircular } from 'admin-ui';

<ProgressCircular value={60} />`}>
        <ProgressCircular value={60} label="Demo progress" />
      </DemoShowcase>
      <PropsTable props={ProgressCircularProps} />

      <DemoSubsection label="Variants">
        <div className={sharedStyles.row}>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--admin-space-xxs)' }}>
              <ProgressCircular value={60} variant={variant} label={`${variant} progress`} />
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{variant}</span>
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div className={sharedStyles.row}>
          {SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--admin-space-xxs)' }}>
              <ProgressCircular value={60} size={size} label={`${size} size`} />
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{size}</span>
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="With Value Label">
        <div className={sharedStyles.row}>
          {VALUES.map((val) => (
            <div key={val} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--admin-space-xxs)' }}>
              <ProgressCircular value={val} showValue label={`Progress at ${val}%`} />
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{val}%</span>
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="All Values × Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{variant}</span>
              <div className={sharedStyles.row}>
                {VALUES.map((val) => (
                  <ProgressCircular key={val} value={val} variant={variant} showValue label={`${variant} at ${val}%`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
