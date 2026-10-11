import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import GradientPicker from '@/primitives/GradientPicker';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const GradientPickerProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'A CSS gradient string, e.g. "linear-gradient(90deg, #d9d9d9 0%, #737373 100%)"' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called with the updated CSS gradient string on every change' },
  { prop: 'inline', type: 'boolean', default: 'false', description: 'When true, renders the picker panel directly instead of as a popover trigger' },
  { prop: 'label', type: 'string', description: 'Optional label text shown above or beside the picker' },
  { prop: 'labelPosition', type: "'top' | 'left'", default: "'top'", options: ['top', 'left'], description: 'Position of the label relative to the picker' },
  { prop: 'labelWidth', type: 'number | string', description: 'Width of the label column when labelPosition is "left"' },
  { prop: 'id', type: 'string', description: 'HTML id forwarded to the trigger button' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover' },
];

export default function GradientPickerDemo() {
  const [trigger, setTrigger] = useState('linear-gradient(90deg, #d9d9d9 0%, #737373 100%)');
  const [basic, setBasic] = useState('linear-gradient(90deg, #d9d9d9 0%, #737373 100%)');
  const [multiStop, setMultiStop] = useState('linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)');
  const [radial, setRadial] = useState('radial-gradient(circle, #ffffff 0%, #3b82f6 100%)');
  const [diagonal, setDiagonal] = useState('linear-gradient(135deg, #f97316 0%, #eab308 100%)');

  return (
    <DemoSection
      title="GradientPicker"
      description="A gradient editor with draggable color stops, linear/radial type switching, angle control, and per-stop color and opacity. Produces a CSS gradient string. By default renders as a strip trigger that opens the picker in a popover; pass inline to render the panel directly."
    >
      <DemoShowcase code={`import { GradientPicker } from 'admin-ui';

const [gradient, setGradient] = useState(
  'linear-gradient(90deg, #d9d9d9 0%, #737373 100%)'
);

// Trigger mode (default) — strip opens a popover
<GradientPicker label="Background" value={gradient} onChange={setGradient} />`}>
        <div style={{ width: '280px' }}>
          <GradientPicker label="Background" value={trigger} onChange={setTrigger} />
        </div>
      </DemoShowcase>
      <PropsTable props={GradientPickerProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--admin-space-xl)' }}>
        <DemoSubsection label="Inline panel — live preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
            <div style={{
              height: 64,
              borderRadius: 'var(--admin-radius-md)',
              background: basic,
              border: '1px solid var(--admin-border-subtle)',
            }} />
            <GradientPicker inline value={basic} onChange={setBasic} />
          </div>
        </DemoSubsection>

        <DemoSubsection label="Inline panel — multi-stop">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
            <div style={{
              height: 64,
              borderRadius: 'var(--admin-radius-md)',
              background: multiStop,
              border: '1px solid var(--admin-border-subtle)',
            }} />
            <GradientPicker inline value={multiStop} onChange={setMultiStop} />
          </div>
        </DemoSubsection>

        <DemoSubsection label="Inline panel — radial">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
            <div style={{
              height: 64,
              borderRadius: 'var(--admin-radius-md)',
              background: radial,
              border: '1px solid var(--admin-border-subtle)',
            }} />
            <GradientPicker inline value={radial} onChange={setRadial} />
          </div>
        </DemoSubsection>

        <DemoSubsection label="Inline panel — diagonal (135°)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
            <div style={{
              height: 64,
              borderRadius: 'var(--admin-radius-md)',
              background: diagonal,
              border: '1px solid var(--admin-border-subtle)',
            }} />
            <GradientPicker inline value={diagonal} onChange={setDiagonal} />
          </div>
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
