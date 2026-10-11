import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { CompactInput } from '@/primitives';

const CompactInputProps: PropRow[] = [
  { prop: 'prefix', type: 'string', description: 'Short label shown before the input (e.g. "W", "#").' },
  { prop: 'value', type: 'string', description: 'Current input value.' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called when the input value changes.' },
  { prop: 'prefixSlot', type: 'React.ReactNode', description: 'Replaces the prefix text with a custom node (e.g. a color swatch).' },
  { prop: 'label', type: 'string', description: 'Optional label rendered via FieldLabel.' },
  { prop: 'labelPosition', type: 'string', default: "'top'", options: ['top', 'left'], description: 'Position of the label.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width for the label column (useful when aligning multiple left-labelled inputs).' },
  { prop: 'type', type: 'string', default: "'text'", description: 'HTML input type.' },
  { prop: 'error', type: 'boolean', default: 'false', description: 'Whether to show error styling.' },
  { prop: 'min', type: 'number', description: 'Minimum value (for number inputs).' },
  { prop: 'max', type: 'number', description: 'Maximum value (for number inputs).' },
  { prop: 'step', type: 'number', default: '1', description: 'Step increment (for number inputs).' },
  { prop: 'scrub', type: 'boolean', default: 'false', description: 'Enables click-drag scrubbing on the prefix to adjust the numeric value.' },
  { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
  { prop: 'width', type: 'number | string', description: 'Fixed width for the input wrapper.' },
  { prop: 'onBlur', type: '() => void', description: 'Called when the input loses focus.' },
  { prop: 'id', type: 'string', description: 'ID forwarded to the underlying input.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

export default function CompactInputDemo() {
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('50');
  const [errorVal, setErrorVal] = useState('abc');
  const [scrubVal, setScrubVal] = useState('42');
  const [stepVal, setStepVal] = useState('0.5');
  const [colorVal, setColorVal] = useState('#4A90E2');
  const [labelTopVal, setLabelTopVal] = useState('200');
  const [labelLeftVal, setLabelLeftVal] = useState('300');
  const [placeholderVal, setPlaceholderVal] = useState('');
  const [fixedWidthVal, setFixedWidthVal] = useState('128');

  return (
    <DemoSection
      title="CompactInput"
      description="A compact inline input for property panel and inspector UIs. Not a form input — error state is a boolean border highlight only, with no error message. For form inputs with validation messages, use Input."
    >
      <DemoShowcase code={`import { CompactInput } from 'admin-ui';

const [value, setValue] = useState('100');

<CompactInput prefix="W" value={value} onChange={setValue} />`}>
        <CompactInput prefix="W" value={width} onChange={setWidth} id="compact-showcase" />
      </DemoShowcase>
      <PropsTable props={CompactInputProps} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Text input">
          <CompactInput prefix="W" value={width} onChange={setWidth} id="compact-width" />
        </DemoSubsection>

        <DemoSubsection label="Number input">
          <CompactInput prefix="H" type="number" value={height} onChange={setHeight} min={0} max={999} id="compact-height" />
        </DemoSubsection>

        <DemoSubsection label="Error state">
          <CompactInput prefix="X" value={errorVal} onChange={setErrorVal} error id="compact-error" />
        </DemoSubsection>

        <DemoSubsection label="Placeholder">
          <CompactInput prefix="Q" value={placeholderVal} onChange={setPlaceholderVal} placeholder="enter value" id="compact-placeholder" />
        </DemoSubsection>

        <DemoSubsection label="Fixed width">
          <CompactInput prefix="W" value={fixedWidthVal} onChange={setFixedWidthVal} width={80} id="compact-fixed-width" />
        </DemoSubsection>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Scrub (drag prefix to adjust)">
          <CompactInput
            prefix="N"
            type="number"
            value={scrubVal}
            onChange={setScrubVal}
            min={0}
            max={100}
            scrub
            id="compact-scrub"
          />
        </DemoSubsection>

        <DemoSubsection label="Step (0.1 increments)">
          <CompactInput
            prefix="S"
            type="number"
            value={stepVal}
            onChange={setStepVal}
            min={0}
            max={10}
            step={0.1}
            id="compact-step"
          />
        </DemoSubsection>

        <DemoSubsection label="Scrub + step (0.1)">
          <CompactInput
            prefix="V"
            type="number"
            value={stepVal}
            onChange={setStepVal}
            min={0}
            max={10}
            step={0.1}
            scrub
            id="compact-scrub-step"
          />
        </DemoSubsection>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="prefixSlot — color swatch">
          <CompactInput
            prefix="#"
            prefixSlot={
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: colorVal,
                }}
              />
            }
            value={colorVal}
            onChange={setColorVal}
            id="compact-prefix-slot"
          />
        </DemoSubsection>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="label — top (default)">
          <CompactInput
            prefix="W"
            label="Width"
            labelPosition="top"
            value={labelTopVal}
            onChange={setLabelTopVal}
            id="compact-label-top"
          />
        </DemoSubsection>

        <DemoSubsection label="label — left">
          <CompactInput
            prefix="W"
            label="Width"
            labelPosition="left"
            value={labelLeftVal}
            onChange={setLabelLeftVal}
            id="compact-label-left"
          />
        </DemoSubsection>

        <DemoSubsection label="labelWidth — fixed label column">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
            <CompactInput prefix="W" label="Width" labelPosition="left" labelWidth={60} value={labelLeftVal} onChange={setLabelLeftVal} id="compact-lw-1" />
            <CompactInput prefix="H" label="Height" labelPosition="left" labelWidth={60} value={height} onChange={setHeight} id="compact-lw-2" />
            <CompactInput prefix="R" label="Rotation" labelPosition="left" labelWidth={60} value={stepVal} onChange={setStepVal} id="compact-lw-3" />
          </div>
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
