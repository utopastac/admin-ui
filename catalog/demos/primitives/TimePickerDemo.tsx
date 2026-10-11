import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import TimePicker from '@/primitives/TimePicker';

const TimePickerProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'Current time value in 24-hour "HH:MM" format.' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called with the selected time string.' },
  { prop: 'format', type: "'12h' | '24h'", default: "'24h'", options: ['12h', '24h'], description: 'Display format for the time slots and input.' },
  { prop: 'interval', type: 'number', default: '30', description: 'Interval in minutes between time slots.' },
  { prop: 'min', type: 'string', description: 'Minimum selectable time in "HH:MM" format.' },
  { prop: 'max', type: 'string', description: 'Maximum selectable time in "HH:MM" format.' },
  { prop: 'label', type: 'string', description: 'Field label text.' },
  { prop: 'error', type: 'string', description: 'Error message displayed below the field.' },
  { prop: 'helperText', type: 'string', description: 'Helper text displayed below the field.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and dropdown.' },
  { prop: 'id', type: 'string', description: 'HTML id for the input element.' },
];

export default function TimePickerDemo() {
  const [time24, setTime24] = useState('09:00');
  const [time12, setTime12] = useState('14:30');
  const [time15, setTime15] = useState('10:15');
  const [timeMinMax, setTimeMinMax] = useState('12:00');
  const [timeLabeled, setTimeLabeled] = useState('17:00');
  const [timeError, setTimeError] = useState('');
  const [timeDisabled] = useState('08:00');

  return (
    <DemoSection
      title="TimePicker"
      description="A time picker with a scrollable dropdown of time slots. Supports 12-hour and 24-hour formats with configurable intervals and min/max constraints."
    >
      <DemoShowcase code={`import { TimePicker } from 'admin-ui';

const [value, setValue] = useState('09:00');

<TimePicker
  label="Meeting Time"
  value={value}
  onChange={setValue}
/>`}>
        <div style={{ width: '280px' }}>
          <TimePicker
            label="Meeting Time"
            value={time24}
            onChange={setTime24}
            id="tp-showcase"
          />
        </div>
      </DemoShowcase>
      <PropsTable props={TimePickerProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="24-Hour Format">
          <TimePicker
            value={time24}
            onChange={setTime24}
            format="24h"
            id="tp-24h"
          />
        </DemoSubsection>

        <DemoSubsection label="12-Hour Format">
          <TimePicker
            value={time12}
            onChange={setTime12}
            format="12h"
            id="tp-12h"
          />
        </DemoSubsection>

        <DemoSubsection label="15-Minute Intervals">
          <TimePicker
            value={time15}
            onChange={setTime15}
            interval={15}
            id="tp-15min"
          />
        </DemoSubsection>

        <DemoSubsection label="With Min/Max (09:00 - 17:00)">
          <TimePicker
            value={timeMinMax}
            onChange={setTimeMinMax}
            min="09:00"
            max="17:00"
            id="tp-minmax"
          />
        </DemoSubsection>

        <DemoSubsection label="With Label">
          <TimePicker
            label="End Time"
            value={timeLabeled}
            onChange={setTimeLabeled}
            id="tp-labeled"
          />
        </DemoSubsection>

        <DemoSubsection label="With Error">
          <TimePicker
            label="Deadline"
            value={timeError}
            onChange={setTimeError}
            error="Please select a valid time"
            id="tp-error"
          />
        </DemoSubsection>

        <DemoSubsection label="Disabled">
          <TimePicker
            label="Locked Time"
            value={timeDisabled}
            onChange={() => {}}
            disabled
            id="tp-disabled"
          />
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
