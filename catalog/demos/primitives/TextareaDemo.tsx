import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Textarea } from '@/primitives';

const TextareaProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'Controlled value of the textarea.' },
  { prop: 'defaultValue', type: 'string', description: 'Uncontrolled default value.' },
  { prop: 'onChange', type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void', description: 'Change event handler.' },
  { prop: 'placeholder', type: 'string', description: 'Placeholder text.' },
  { prop: 'label', type: 'string', description: 'Field label text.' },
  { prop: 'error', type: 'string', description: 'Error message displayed below the field.' },
  { prop: 'helperText', type: 'string', description: 'Helper text displayed below the field.' },
  { prop: 'rows', type: 'number', default: '4', description: 'Number of visible text rows.' },
  { prop: 'resize', type: "'none' | 'vertical' | 'both'", default: "'vertical'", options: ['none', 'vertical', 'both'], description: 'Controls which directions the textarea can be resized.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
  { prop: 'id', type: 'string', description: 'HTML id for the textarea element.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the textarea element.' },
];

export default function TextareaDemo() {
  const [bio, setBio] = useState('');
  const [notes, setNotes] = useState('Followed up on 2024-03-15. Customer confirmed the issue is reproducible.');
  const [errorValue, setErrorValue] = useState('This is invalid content that needs to be corrected before submitting.');
  const [helperValue, setHelperValue] = useState('');

  return (
    <DemoSection
      title="Textarea"
      description="Multi-line text input with optional label, error message, and helper text. Supports controlled and uncontrolled usage."
    >
      <DemoShowcase code={`import { Textarea } from 'admin-ui';

const [value, setValue] = useState('');

<Textarea
  label="Bio"
  placeholder="Tell us about yourself"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  id="bio"
/>`}>
        <div style={{ width: '360px' }}>
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            id="textarea-showcase"
          />
        </div>
      </DemoShowcase>
      <PropsTable props={TextareaProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="With Label">
          <Textarea
            label="Case Notes"
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            id="textarea-notes"
          />
        </DemoSubsection>

        <DemoSubsection label="With Error">
          <Textarea
            label="Description"
            value={errorValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setErrorValue(e.target.value)}
            error="Description must not contain restricted content"
            id="textarea-error"
          />
        </DemoSubsection>

        <DemoSubsection label="With Helper Text">
          <Textarea
            label="Summary"
            value={helperValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHelperValue(e.target.value)}
            helperText="Briefly describe the issue in 2-3 sentences"
            placeholder="What happened, when, and what was the impact?"
            id="textarea-helper"
          />
        </DemoSubsection>

        <DemoSubsection label="Disabled">
          <Textarea
            label="Internal Notes"
            defaultValue="This record has been archived and is read-only."
            disabled
            id="textarea-disabled"
          />
        </DemoSubsection>

        <DemoSubsection label="More Rows (8)">
          <Textarea
            label="Full Report"
            placeholder="Provide a detailed account of the incident including all relevant context and timeline..."
            rows={8}
            id="textarea-rows"
          />
        </DemoSubsection>

        <DemoSubsection label="No Resize">
          <Textarea
            label="Short Response"
            placeholder="Enter your response"
            rows={3}
            resize="none"
            id="textarea-no-resize"
          />
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
