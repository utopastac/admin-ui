import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import DatePicker from '@/primitives/DatePicker';

const DatePickerProps: PropRow[] = [
  { prop: 'value', type: 'string | [string, string]', description: 'Selected date (ISO string) or date range tuple.' },
  { prop: 'onChange', type: '(value: string | [string, string]) => void', description: 'Called when the selected date or range changes.' },
  { prop: 'mode', type: 'string', default: "'single'", options: ['single', 'range'], description: 'Whether to select a single date or a range.' },
  { prop: 'min', type: 'string', description: 'Minimum selectable date (ISO string).' },
  { prop: 'max', type: 'string', description: 'Maximum selectable date (ISO string).' },
  { prop: 'label', type: 'string', description: 'Label rendered above the input.' },
  { prop: 'error', type: 'string', description: 'Error message to display.' },
  { prop: 'helperText', type: 'string', description: 'Helper text displayed below the input.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled.' },
  { prop: 'id', type: 'string', description: 'ID forwarded to the underlying input.' },
  { prop: 'autoClose', type: 'boolean', default: 'false', description: 'In range mode, close the calendar automatically after the second date is selected.' },
];

export default function DatePickerDemo() {
  const [singleDate, setSingleDate] = useState('2026-03-05');
  const [rangeValue, setRangeValue] = useState<[string, string]>(['2026-03-05', '2026-03-12']);
  const [constrainedDate, setConstrainedDate] = useState('2026-03-15');
  const [labeledDate, setLabeledDate] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [disabledDate] = useState('2026-03-05');

  return (
    <DemoSection
      title="DatePicker"
      description="A date picker with calendar dropdown popup. Supports single date and date range modes with optional min/max constraints."
    >
      <DemoShowcase code={`import { DatePicker } from 'admin-ui';

const [value, setValue] = useState('2026-03-05');

<DatePicker
  label="Date"
  value={value}
  onChange={setValue}
/>`}>
        <div style={{ width: '280px' }}>
          <DatePicker
            label="Date"
            value={singleDate}
            onChange={(v) => setSingleDate(v as string)}
            id="dp-showcase"
          />
        </div>
      </DemoShowcase>
      <PropsTable props={DatePickerProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Single Date">
          <DatePicker
            value={singleDate}
            onChange={(v) => setSingleDate(v as string)}
            id="dp-single"
          />
        </DemoSubsection>

        <DemoSubsection label="Date Range">
          <DatePicker
            mode="range"
            value={rangeValue}
            onChange={(v) => setRangeValue(v as [string, string])}
            id="dp-range"
          />
        </DemoSubsection>

        <DemoSubsection label="With Min/Max Constraints">
          <DatePicker
            label="Select Date (Mar 1 – Mar 31)"
            value={constrainedDate}
            onChange={(v) => setConstrainedDate(v as string)}
            min="2026-03-01"
            max="2026-03-31"
            id="dp-constrained"
          />
        </DemoSubsection>

        <DemoSubsection label="With Label">
          <DatePicker
            label="Appointment Date"
            value={labeledDate}
            onChange={(v) => setLabeledDate(v as string)}
            helperText="Choose your preferred date"
            id="dp-labeled"
          />
        </DemoSubsection>

        <DemoSubsection label="With Error">
          <DatePicker
            label="Due Date"
            value={errorDate}
            onChange={(v) => setErrorDate(v as string)}
            error="A date is required"
            id="dp-error"
          />
        </DemoSubsection>

        <DemoSubsection label="Disabled">
          <DatePicker
            label="Locked Date"
            value={disabledDate}
            onChange={() => {}}
            disabled
            id="dp-disabled"
          />
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
