import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import sharedStyles from '../../shared/styles.module.css';
import { ProgressBar } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const ProgressBarProps: PropRow[] = [
  { prop: 'value', type: 'number', description: 'Progress value between 0 and 100' },
  { prop: 'variant', type: "'default' | 'success' | 'error' | 'warning'", default: "'default'", options: ['default', 'success', 'error', 'warning'], description: 'Semantic colour variant of the progress fill' },
  { prop: 'size', type: "'xs' | 'sm' | 'md'", default: "'md'", options: ['xs', 'sm', 'md'], description: 'Height of the progress bar' },
  { prop: 'label', type: 'string', description: 'ARIA label for the progressbar role' },
  { prop: 'showValue', type: 'boolean', default: 'false', description: 'When true, displays the numeric percentage value' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the root element' },
];

const VALUES = [0, 25, 50, 75, 100] as const;
const VARIANTS = ['default', 'success', 'error', 'warning'] as const;

export default function ProgressBarDemo() {
  return (
    <DemoSection
      title="ProgressBar"
      description="Displays a value within a defined range as a horizontal bar. Supports four semantic variants and three sizes."
    >
      <DemoShowcase code={`import { ProgressBar } from 'admin-ui';

<ProgressBar value={60} />`}>
        <ProgressBar value={60} label="Demo progress" />
      </DemoShowcase>
      <PropsTable props={ProgressBarProps} />

      <DemoSubsection label="Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xxs)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{variant}</span>
              <ProgressBar value={60} variant={variant} label={`${variant} progress`} />
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="All Values × Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{variant}</span>
              {VALUES.map((val) => (
                <ProgressBar key={val} value={val} variant={variant} label={`${variant} at ${val}%`} />
              ))}
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>xs (3px)</span>
            <ProgressBar value={60} size="xs" label="Extra small size" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>sm (6px)</span>
            <ProgressBar value={60} size="sm" label="Small size" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>md (8px)</span>
            <ProgressBar value={60} size="md" label="Medium size" />
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With Value Label">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          {VALUES.map((val) => (
            <ProgressBar key={val} value={val} showValue label={`Progress at ${val}%`} />
          ))}
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
