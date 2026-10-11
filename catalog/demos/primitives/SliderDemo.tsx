import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Slider } from '@/primitives';

const SliderProps: PropRow[] = [
  { prop: 'value', type: 'number | [number, number]', description: 'Current value. Pass a tuple for range mode.' },
  { prop: 'onChange', type: '(value: number | [number, number]) => void', description: 'Called when the value changes.' },
  { prop: 'min', type: 'number', default: '0', description: 'Minimum value.' },
  { prop: 'max', type: 'number', default: '100', description: 'Maximum value.' },
  { prop: 'step', type: 'number', description: 'Step increment for snapping.' },
  { prop: 'labels', type: '{ start?: string; end?: string }', description: 'Labels displayed at the start and end of the slider.' },
  { prop: 'stepLabels', type: '(string | number)[]', description: 'Labels shown beneath each step position.' },
  { prop: 'showTooltip', type: 'boolean', default: 'false', description: 'Shows the current value in a tooltip above the thumb while dragging.' },
  { prop: 'tooltipFormat', type: '(value: number) => string', description: 'Custom formatter for the tooltip value.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the slider track and thumb.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction when true.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the root element.' },
  { prop: 'id', type: 'string', description: 'HTML id attribute for the root element.' },
];

export default function SliderDemo() {
  const [basicValue, setBasicValue] = useState(50);
  const [continuousValue, setContinuousValue] = useState(40);
  const [steppedValue, setSteppedValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [tooltipValue, setTooltipValue] = useState(60);
  const [tooltipFormatValue, setTooltipFormatValue] = useState(75);
  const [smValue, setSmValue] = useState(30);
  const [mdValue, setMdValue] = useState(70);
  const [labelStepValue, setLabelStepValue] = useState(50);
  const [disabledValue] = useState(40);

  return (
    <DemoSection
      title="Slider"
      description="A horizontal range input for selecting numeric values. Supports continuous and stepped modes, single and range selection, and flexible labeling."
    >
      <DemoShowcase code={`import { Slider } from 'admin-ui';

const [value, setValue] = useState(50);

<Slider value={value} onChange={(v) => setValue(v as number)} />`}>
        <div style={{ maxWidth: 400 }}>
          <Slider value={basicValue} onChange={(v) => setBasicValue(v as number)} />
        </div>
      </DemoShowcase>
      <PropsTable props={SliderProps} />

      <DemoSubsection label="Continuous">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', maxWidth: 400 }}>
          <Slider
            value={continuousValue}
            onChange={(v) => setContinuousValue(v as number)}
            labels={{ start: '0', end: '100' }}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Stepped">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', maxWidth: 400 }}>
          <Slider
            value={steppedValue}
            onChange={(v) => setSteppedValue(v as number)}
            step={10}
            min={0}
            max={100}
            stepLabels={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Range">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', maxWidth: 400 }}>
          <Slider
            value={rangeValue}
            onChange={(v) => setRangeValue(v as [number, number])}
            labels={{ start: 'Min', end: 'Max' }}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With Tooltip">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-l)', maxWidth: 400 }}>
          <Slider
            value={tooltipValue}
            onChange={(v) => setTooltipValue(v as number)}
            showTooltip
          />
          <Slider
            value={tooltipFormatValue}
            onChange={(v) => setTooltipFormatValue(v as number)}
            showTooltip
            tooltipFormat={(v) => `${v}%`}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-l)', maxWidth: 400 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
            <span>Small</span>
            <Slider value={smValue} onChange={(v) => setSmValue(v as number)} size="sm" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
            <span>Medium</span>
            <Slider value={mdValue} onChange={(v) => setMdValue(v as number)} size="md" />
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Stepped with Labels">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', maxWidth: 400 }}>
          <Slider
            value={labelStepValue}
            onChange={(v) => setLabelStepValue(v as number)}
            step={25}
            min={0}
            max={100}
            stepLabels={['Very Low', 'Low', 'Medium', 'High', 'Very High']}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', maxWidth: 400 }}>
          <Slider value={disabledValue} onChange={() => {}} disabled />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
