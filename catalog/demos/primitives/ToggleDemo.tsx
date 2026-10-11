import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Toggle } from '@/primitives';

const ToggleProps: PropRow[] = [
  { prop: 'checked', type: 'boolean', description: 'Whether the toggle is on.' },
  { prop: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new checked state when toggled.' },
  { prop: 'label', type: 'string', description: 'Label text displayed alongside the toggle.' },
  { prop: 'labelPosition', type: "'top' | 'left'", default: "'left'", options: ['top', 'left'], description: 'Position of the label relative to the toggle.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width applied to the label.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the toggle.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the root element.' },
  { prop: 'id', type: 'string', description: 'HTML id for the button element.' },
];

export default function ToggleDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);

  return (
    <DemoSection
      title="Toggle"
      description="An on/off switch for settings. Supports labels, sizes, and disabled state."
    >
      <DemoShowcase code={`import { Toggle } from 'admin-ui';

const [checked, setChecked] = useState(false);

<Toggle checked={checked} onChange={setChecked} label="Enable notifications" />`}>
        <Toggle checked={a} onChange={setA} label="Enable notifications" />
      </DemoShowcase>
      <PropsTable props={ToggleProps} />

      <DemoSubsection label="States">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          <Toggle checked={a} onChange={setA} label="Enabled" />
          <Toggle checked={b} onChange={setB} label="Disabled setting" />
          <Toggle checked={true} onChange={() => {}} label="Disabled on" disabled />
          <Toggle checked={false} onChange={() => {}} label="Disabled off" disabled />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          <Toggle checked={c} onChange={setC} label="Small" size="sm" />
          <Toggle checked={c} onChange={setC} label="Medium" size="md" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Without label">
        <div className={sharedStyles.row}>
          <Toggle checked={a} onChange={setA} size="sm" />
          <Toggle checked={b} onChange={setB} size="md" />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
