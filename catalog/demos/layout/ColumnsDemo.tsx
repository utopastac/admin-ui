import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Columns } from '@/layout';

const ColumnsProps: PropRow[] = [
  { prop: 'count', type: '2 | 3 | 4', default: '2', description: 'Number of equal-width columns.', options: ['2', '3', '4'] },
  { prop: 'gap', type: 'SpaceScale', default: "'m'", description: 'Gap between columns.', options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] },
  { prop: 'children', type: 'React.ReactNode', description: 'Column content elements.' },
];

const box = {
  background: 'var(--admin-surface-subtle)',
  borderRadius: 'var(--admin-radius-sm)',
  padding: 'var(--admin-space-s)',
  height: '60px',
};

export default function ColumnsDemo() {
  return (
    <DemoSection title="Columns" description="Grid-based layout primitive for equal-width column arrangements.">
      <PropsTable props={ColumnsProps} />
      <DemoSubsection label="2 columns (default)">
        <Columns>
          <div style={box} />
          <div style={box} />
        </Columns>
      </DemoSubsection>

      <DemoSubsection label="3 columns">
        <Columns count={3}>
          <div style={box} />
          <div style={box} />
          <div style={box} />
        </Columns>
      </DemoSubsection>

      <DemoSubsection label="4 columns">
        <Columns count={4}>
          <div style={box} />
          <div style={box} />
          <div style={box} />
          <div style={box} />
        </Columns>
      </DemoSubsection>

      <DemoSubsection label="Gap variants">
        {(['xs', 's', 'm', 'l', 'xl'] as const).map((gap) => (
          <div key={gap} style={{ marginBottom: 'var(--admin-space-l)' }}>
            <p style={{ marginBottom: 'var(--admin-space-xs)', fontSize: '12px', color: 'var(--admin-text-subtle)' }}>gap="{gap}"</p>
            <Columns gap={gap}>
              <div style={box} />
              <div style={box} />
            </Columns>
          </div>
        ))}
      </DemoSubsection>

    </DemoSection>
  );
}
