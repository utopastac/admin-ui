import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Checkbox } from '@/primitives';

const CheckboxProps: PropRow[] = [
  { prop: 'checked', type: 'boolean', description: 'Whether the checkbox is checked.' },
  { prop: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new checked state when the checkbox changes.' },
  { prop: 'label', type: 'string', default: 'undefined', description: 'Label text rendered beside the checkbox.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox when true.' },
  { prop: 'inputPosition', type: "'left' | 'right'", default: "'left'", description: 'Position of the checkbox relative to the label.', options: ['left', 'right'] },
  { prop: 'id', type: 'string', default: 'undefined', description: 'HTML id applied to the input element.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function CheckboxDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);

  return (
    <DemoSection
      title="Checkbox"
      description="A styled checkbox for forms. Supports labels and disabled state."
    >
      <DemoShowcase code={`import { Checkbox } from 'admin-ui';

const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onChange={setChecked} label="Accept terms" />`}>
        <Checkbox checked={a} onChange={setA} label="Accept terms" />
      </DemoShowcase>

      <PropsTable props={CheckboxProps} />

      <DemoSubsection label="States">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Checkbox checked={a} onChange={setA} label="Checked" />
          <Checkbox checked={b} onChange={setB} label="Unchecked" />
          <Checkbox checked={true} onChange={() => {}} label="Disabled checked" disabled />
          <Checkbox checked={false} onChange={() => {}} label="Disabled unchecked" disabled />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Without label">
        <div className={sharedStyles.row}>
          <Checkbox checked={c} onChange={setC} />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
