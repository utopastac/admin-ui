import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Badge } from '@/primitives';

const BadgeProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Content displayed inside the badge.' },
  { prop: 'variant', type: "'default' | 'success' | 'warning' | 'info'", default: "'default'", description: 'Semantic colour variant.', options: ['default', 'success', 'warning', 'info'] },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Size of the badge.', options: ['sm', 'md'] },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function BadgeDemo() {
  return (
    <DemoSection
      title="Badge"
      description="Small inline labels for status indicators and counts. Available in four semantic variants."
    >
      <DemoShowcase code={`import { Badge } from 'admin-ui';

<Badge variant="success">Active</Badge>`}>
        <Badge variant="success">Active</Badge>
      </DemoShowcase>

      <PropsTable props={BadgeProps} />

      <DemoSubsection label="Variants">
        <div className={sharedStyles.row}>
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div className={sharedStyles.row}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </DemoSubsection>

      <DemoSubsection label="All Variants x Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          {(['default', 'success', 'warning', 'info'] as const).map((variant) => (
            <div key={variant} className={sharedStyles.row}>
              {(['sm', 'md'] as const).map((size) => (
                <Badge key={`${variant}-${size}`} variant={variant} size={size}>
                  {variant} {size}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
