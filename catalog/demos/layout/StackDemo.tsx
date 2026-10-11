import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Stack } from '@/layout';

const StackProps: PropRow[] = [
  { prop: 'direction', type: "'column' | 'row'", default: "'column'", description: 'Flex direction of the stack.', options: ['column', 'row'] },
  { prop: 'gap', type: 'SpaceScale', default: "'m'", description: 'Space between children.', options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] },
  { prop: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'Cross-axis alignment of children.', options: ['start', 'center', 'end', 'stretch'] },
  { prop: 'wrap', type: 'boolean', default: 'false', description: 'Allow children to wrap onto multiple lines.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Content to arrange.' },
];

const box = (height = '40px') => ({
  background: 'var(--admin-surface-subtle)',
  borderRadius: 'var(--admin-radius-sm)',
  padding: 'var(--admin-space-s)',
  height,
});

export default function StackDemo() {
  return (
    <DemoSection title="Stack" description="Flex-based layout primitive for arranging children vertically or horizontally with consistent spacing.">
      <PropsTable props={StackProps} />
      <DemoSubsection label="Vertical stack — gap variants">
        {(['xs', 's', 'm', 'l', 'xl'] as const).map((gap) => (
          <div key={gap} style={{ marginBottom: 'var(--admin-space-l)' }}>
            <p style={{ marginBottom: 'var(--admin-space-xs)', fontSize: '12px', color: 'var(--admin-text-subtle)' }}>gap="{gap}"</p>
            <Stack gap={gap}>
              <div style={box()} />
              <div style={box()} />
              <div style={box()} />
            </Stack>
          </div>
        ))}
      </DemoSubsection>

      <DemoSubsection label="Horizontal row — align variants">
        {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
          <div key={align} style={{ marginBottom: 'var(--admin-space-l)' }}>
            <p style={{ marginBottom: 'var(--admin-space-xs)', fontSize: '12px', color: 'var(--admin-text-subtle)' }}>align="{align}"</p>
            <Stack direction="row" align={align} style={{ background: 'var(--admin-surface-raised)', borderRadius: 'var(--admin-radius-sm)', padding: 'var(--admin-space-m)', height: '80px' }}>
              <div style={{ ...box('30px'), width: '60px' }} />
              <div style={{ ...box('50px'), width: '60px' }} />
              <div style={{ ...box('20px'), width: '60px' }} />
            </Stack>
          </div>
        ))}
      </DemoSubsection>

      <DemoSubsection label="Wrap — row that wraps at narrow widths">
        <Stack direction="row" wrap gap="s" style={{ maxWidth: '320px' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ ...box('40px'), width: '80px', flexShrink: 0 }} />
          ))}
        </Stack>
      </DemoSubsection>

    </DemoSection>
  );
}
