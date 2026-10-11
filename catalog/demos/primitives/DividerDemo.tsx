import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Divider } from '@/primitives';

const DividerProps: PropRow[] = [
  { prop: 'orientation', type: 'string', default: "'horizontal'", options: ['horizontal', 'vertical'], description: 'Direction of the divider.' },
  { prop: 'size', type: 'string', default: "'md'", options: ['sm', 'md', 'lg'], description: 'Thickness of the divider (1px, 2px, 4px).' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

export default function DividerDemo() {
  return (
    <DemoSection
      title="Divider"
      description="A visual separator between content sections. Renders horizontally or vertically in three thickness sizes."
    >
      <DemoShowcase code={`import { Divider } from 'admin-ui';

<Divider />`}>
        <Divider />
      </DemoShowcase>
      <PropsTable props={DividerProps} />

      <DemoSubsection label="Horizontal sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-l)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
            <span style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>sm (1px)</span>
            <Divider size="sm" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
            <span style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>md (2px)</span>
            <Divider size="md" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
            <span style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>lg (4px)</span>
            <Divider size="lg" />
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Vertical divider in a flex row">
        <div className={sharedStyles.row} style={{ alignItems: 'center', height: '2rem' }}>
          <span>Section A</span>
          <Divider orientation="vertical" size="md" />
          <span>Section B</span>
          <Divider orientation="vertical" size="md" />
          <span>Section C</span>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Between content sections">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          <div>
            <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-primary)' }}>
              Profile information
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>
              Name, email, and contact details
            </p>
          </div>
          <Divider />
          <div>
            <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-primary)' }}>
              Account settings
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>
              Password, notifications, and preferences
            </p>
          </div>
          <Divider />
          <div>
            <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-primary)' }}>
              Danger zone
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>
              Delete or deactivate account
            </p>
          </div>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
