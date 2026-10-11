import React, { useState } from 'react';
import { Globe, Circle, Triangle, Square, Tag, Star } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Select } from '@/primitives';
import type { SelectOption } from '@/primitives';

const SelectProps: PropRow[] = [
  { prop: 'options', type: 'SelectOption[]', description: 'Array of options to display in the dropdown.' },
  { prop: 'value', type: 'string', description: 'The currently selected option value.' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called when a new option is selected.' },
  { prop: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder shown when no value is selected.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select control.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the trigger button.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the container.' },
  { prop: 'label', type: 'string', description: 'Field label text.' },
  { prop: 'labelPosition', type: "'top' | 'left'", options: ['top', 'left'], description: 'Position of the label relative to the field.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width applied to the label.' },
  { prop: 'error', type: 'string', description: 'Error message displayed below the field.' },
  { prop: 'helperText', type: 'string', description: 'Helper text displayed below the field.' },
  { prop: 'id', type: 'string', description: 'HTML id for the trigger element.' },
];

const frameworks: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

const regions: SelectOption[] = [
  { value: 'us-east', label: 'US East', start: <Globe size={14} /> },
  { value: 'us-west', label: 'US West', start: <Globe size={14} /> },
  { value: 'eu-west', label: 'EU West', start: <Globe size={14} /> },
  { value: 'ap-south', label: 'AP South', start: <Globe size={14} /> },
];

const shapes: SelectOption[] = [
  { value: 'circle', label: 'Circle', description: 'Round shape with no corners', start: <Circle size={14} /> },
  { value: 'triangle', label: 'Triangle', description: 'Three-sided polygon', start: <Triangle size={14} /> },
  { value: 'square', label: 'Square', description: 'Four equal sides', start: <Square size={14} /> },
];

const priorities: SelectOption[] = [
  { value: 'low', label: 'Low', start: <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--admin-green-60)', display: 'inline-block' }} /> },
  { value: 'medium', label: 'Medium', start: <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--admin-orange-60)', display: 'inline-block' }} /> },
  { value: 'high', label: 'High', start: <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--admin-red-60)', display: 'inline-block' }} /> },
];

const labels: SelectOption[] = [
  { value: 'bug', label: 'Bug', start: <Tag size={14} /> },
  { value: 'feature', label: 'Feature', start: <Star size={14} /> },
  { value: 'chore', label: 'Chore', start: <Tag size={14} /> },
];

export default function SelectDemo() {
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('');
  const [shape, setShape] = useState('');
  const [priority, setPriority] = useState('medium');
  const [label, setLabel] = useState('');

  return (
    <DemoSection title="Select" description="Dropdown picker for choosing from a list of options.">
      <DemoShowcase code={`import { Select } from 'admin-ui';

const [value, setValue] = useState('');
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

<Select options={options} value={value} onChange={setValue} />`}>
        <div style={{ width: '280px' }}>
          <Select options={frameworks} value={value} onChange={setValue} placeholder="Choose a framework..." />
        </div>
      </DemoShowcase>
      <PropsTable props={SelectProps} />

      <DemoSubsection label="Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)', maxWidth: 280 }}>
          <Select options={frameworks} value={value} onChange={setValue} size="md" placeholder="Medium (default)" />
          <Select options={frameworks} value={value} onChange={setValue} size="sm" placeholder="Small" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With start icon">
        <div style={{ maxWidth: 280 }}>
          <Select options={regions} value={region} onChange={setRegion} placeholder="Select region..." />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With start icon and description">
        <div style={{ maxWidth: 320 }}>
          <Select options={shapes} value={shape} onChange={setShape} placeholder="Select shape..." />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With colour dots">
        <div style={{ maxWidth: 240 }}>
          <Select options={priorities} value={priority} onChange={setPriority} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With label">
        <div style={{ maxWidth: 320 }}>
          <Select options={labels} value={label} onChange={setLabel} placeholder="Select label..." label="Label" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With left label">
        <div style={{ maxWidth: 400 }}>
          <Select options={frameworks} value={value} onChange={setValue} placeholder="Choose a framework..." label="Framework" labelPosition="left" labelWidth={100} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <div style={{ maxWidth: 280 }}>
          <Select options={frameworks} value="react" onChange={() => {}} disabled />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With error">
        <div style={{ maxWidth: 280 }}>
          <Select options={frameworks} value="" onChange={setValue} placeholder="Choose a framework..." error="This field is required" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With helper text">
        <div style={{ maxWidth: 280 }}>
          <Select options={frameworks} value={value} onChange={setValue} placeholder="Choose a framework..." helperText="This will determine which template is used." />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
