import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import Radio from '@/primitives/Radio/Radio';
import RadioGroup from '@/primitives/Radio/RadioGroup';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const RadioProps: PropRow[] = [
  { prop: 'checked', type: 'boolean', description: 'Whether the radio button is selected' },
  { prop: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new checked state on change' },
  { prop: 'label', type: 'string', description: 'Text label shown beside the radio button' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'When true, prevents interaction and applies a disabled appearance' },
  { prop: 'inputPosition', type: "'left' | 'right'", default: "'left'", options: ['left', 'right'], description: 'Position of the radio circle relative to the label' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the wrapper element' },
  { prop: 'id', type: 'string', description: 'HTML id forwarded to the input element' },
  { prop: 'name', type: 'string', description: 'HTML name attribute forwarded to the input element' },
  { prop: 'value', type: 'string', description: 'HTML value attribute forwarded to the input element' },
];

export default function RadioDemo() {
  const [selected, setSelected] = useState('a');
  const [standalone, setStandalone] = useState(false);
  const [direction, setDirection] = useState('email');

  return (
    <DemoSection
      title="Radio"
      description="A styled radio button for single-select choices. Use RadioGroup for managing a set of options."
    >
      <DemoShowcase code={`import { RadioGroup } from 'admin-ui';

const [value, setValue] = useState('email');

<RadioGroup
  value={value}
  onChange={setValue}
  name="contact"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'mail', label: 'Mail' },
  ]}
/>`}>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          name="demo"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
        />
      </DemoShowcase>
      <PropsTable props={RadioProps} />

      <DemoSubsection label="Standalone Radio">
        <Radio
          checked={standalone}
          onChange={setStandalone}
          label="Toggle me"
        />
      </DemoSubsection>

      <DemoSubsection label="Horizontal layout">
        <RadioGroup
          value={direction}
          onChange={setDirection}
          name="contact-method"
          direction="horizontal"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'mail', label: 'Mail' },
          ]}
        />
      </DemoSubsection>

      <DemoSubsection label="Disabled states">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Radio checked={true} onChange={() => {}} label="Selected disabled" disabled />
          <Radio checked={false} onChange={() => {}} label="Unselected disabled" disabled />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled group">
        <RadioGroup
          value="read"
          onChange={() => {}}
          name="permission"
          disabled
          options={[
            { value: 'read', label: 'Read only' },
            { value: 'write', label: 'Read and write' },
            { value: 'admin', label: 'Admin' },
          ]}
        />
      </DemoSubsection>

      <DemoSubsection label="With individual disabled option">
        <RadioGroup
          value="standard"
          onChange={() => {}}
          name="plan"
          options={[
            { value: 'basic', label: 'Basic' },
            { value: 'standard', label: 'Standard' },
            { value: 'premium', label: 'Premium', disabled: true },
          ]}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
