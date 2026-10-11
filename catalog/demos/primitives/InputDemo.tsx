import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { Input } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const InputProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'Current input value' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called with the updated value on every change' },
  { prop: 'type', type: 'string', default: "'text'", description: 'HTML input type' },
  { prop: 'label', type: 'string', description: 'Label text shown above the input' },
  { prop: 'error', type: 'string', description: 'Error message shown below the input' },
  { prop: 'helperText', type: 'string', description: 'Helper text shown below the input' },
  { prop: 'placeholder', type: 'string', description: 'Placeholder text for the input' },
  { prop: 'prefix', type: 'string', description: 'Short label rendered inside the leading edge of the input (e.g. "$", "https://").' },
  { prop: 'prefixSlot', type: 'React.ReactNode', description: 'Replaces the prefix text with a custom node (e.g. an icon).' },
  { prop: 'min', type: 'number', description: 'Minimum value for number inputs' },
  { prop: 'max', type: 'number', description: 'Maximum value for number inputs' },
  { prop: 'step', type: 'number', description: 'Step increment for number inputs' },
  { prop: 'onBlur', type: '() => void', description: 'Called when the input loses focus' },
  { prop: 'id', type: 'string', description: 'HTML id forwarded to the input element' },
  { prop: 'className', type: 'string', description: 'Additional class names applied to the outermost element' },
];

export default function InputDemo() {
  const [inputBasic, setInputBasic] = useState('');
  const [inputLabeled, setInputLabeled] = useState('Hello world');
  const [inputError, setInputError] = useState('bad value');
  const [inputHelper, setInputHelper] = useState('');
  const [inputNumber, setInputNumber] = useState('50');
  const [inputCurrency, setInputCurrency] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputStep, setInputStep] = useState('1.0');

  return (
    <DemoSection
      title="Input"
      description="Text inputs with optional labels, error messages, helper text, and number type support."
    >
      <DemoShowcase code={`import { Input } from 'admin-ui';

const [value, setValue] = useState('');

<Input label="Full Name" value={value} onChange={setValue} />`}>
        <div style={{ width: '280px' }}>
          <Input label="Full Name" value={inputLabeled} onChange={setInputLabeled} id="input-showcase" />
        </div>
      </DemoShowcase>
      <PropsTable props={InputProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Basic">
          <Input
            value={inputBasic}
            onChange={setInputBasic}
            id="input-basic"
          />
        </DemoSubsection>

        <DemoSubsection label="With Label">
          <Input
            label="Full Name"
            value={inputLabeled}
            onChange={setInputLabeled}
            id="input-labeled"
          />
        </DemoSubsection>

        <DemoSubsection label="With Error">
          <Input
            label="Email"
            value={inputError}
            onChange={setInputError}
            error="Please enter a valid email address"
            id="input-error"
          />
        </DemoSubsection>

        <DemoSubsection label="With Helper Text">
          <Input
            label="Username"
            value={inputHelper}
            onChange={setInputHelper}
            helperText="Must be 3-20 characters, letters and numbers only"
            id="input-helper"
          />
        </DemoSubsection>

        <DemoSubsection label="Number Type">
          <Input
            label="Quantity"
            type="number"
            value={inputNumber}
            onChange={setInputNumber}
            min={0}
            max={100}
            id="input-number"
          />
        </DemoSubsection>

        <DemoSubsection label="Prefix — currency">
          <Input
            label="Amount"
            prefix="$"
            value={inputCurrency}
            onChange={setInputCurrency}
            placeholder="0.00"
            id="input-currency"
          />
        </DemoSubsection>

        <DemoSubsection label="Prefix — URL">
          <Input
            label="Website"
            prefix="https://"
            value={inputUrl}
            onChange={setInputUrl}
            placeholder="example.com"
            id="input-url"
          />
        </DemoSubsection>

        <DemoSubsection label="Step (0.1 increments)">
          <Input
            label="Rating"
            type="number"
            value={inputStep}
            onChange={setInputStep}
            min={0}
            max={5}
            step={0.1}
            id="input-step"
          />
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
