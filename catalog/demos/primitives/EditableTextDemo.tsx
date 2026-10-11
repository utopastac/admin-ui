import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { EditableText } from '@/primitives';

const EditableTextProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'The current text value (controlled).' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Fired when the user commits a new non-empty value.' },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Typography and height scale. Accepts s/sm/small, m/md/medium, l/lg/large aliases.', options: ['sm', 'md', 'lg'] },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Renders as a plain span with no edit affordance.' },
  { prop: 'placeholder', type: 'string', default: 'undefined', description: 'Text shown when value is empty.' },
  { prop: 'ariaLabel', type: 'string', default: 'undefined', description: 'Accessible label for the editable region.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
  { prop: 'onEditStart', type: '() => void', default: 'undefined', description: 'Fires when the user enters edit mode.' },
  { prop: 'onEditEnd', type: "(reason: 'commit' | 'cancel') => void", default: 'undefined', description: 'Fires when the user leaves edit mode, either by committing or cancelling.' },
  { prop: 'onCancel', type: '() => void', default: 'undefined', description: 'Fires when the edit is cancelled (Escape or empty commit).' },
];

export default function EditableTextDemo() {
  const [basic, setBasic] = useState('Project Falcon');

  const [smallValue, setSmallValue] = useState('Q4 roadmap');
  const [mediumValue, setMediumValue] = useState('Launch readiness');
  const [largeValue, setLargeValue] = useState('Platform strategy');

  const [disabledValue] = useState('Read-only milestone');

  const [titleValue, setTitleValue] = useState('');

  const [loggedValue, setLoggedValue] = useState('Weekly review agenda');
  const [events, setEvents] = useState<string[]>([]);
  const logEvent = (message: string) => {
    setEvents(prev => [`${new Date().toLocaleTimeString()} — ${message}`, ...prev].slice(0, 8));
  };

  return (
    <DemoSection
      title="EditableText"
      description="An inline text label that swaps to an input on double-click. Commits on Enter or blur, reverts on Escape."
    >
      <DemoShowcase code={`import { EditableText } from 'admin-ui';

const [value, setValue] = useState('Project Falcon');

<EditableText value={value} onChange={setValue} />`}>
        <EditableText value={basic} onChange={setBasic} />
      </DemoShowcase>

      <PropsTable props={EditableTextProps} />

      <DemoSubsection label="Sizes">
        <p style={{ color: 'var(--admin-text-secondary)', margin: 0 }}>
          Double-click any row below and confirm the display and edit states occupy the same pixel footprint — no jitter, no reflow.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', alignItems: 'flex-start' }}>
          <EditableText size="sm" value={smallValue} onChange={setSmallValue} />
          <EditableText size="md" value={mediumValue} onChange={setMediumValue} />
          <EditableText size="lg" value={largeValue} onChange={setLargeValue} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <div className={sharedStyles.row}>
          <EditableText value={disabledValue} onChange={() => {}} disabled />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With placeholder">
        <div className={sharedStyles.row}>
          <EditableText
            value={titleValue}
            onChange={setTitleValue}
            placeholder="Untitled document"
            ariaLabel="Document title"
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Event log">
        <div style={{ display: 'flex', gap: 'var(--admin-space-l)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <EditableText
            value={loggedValue}
            onChange={(next) => {
              setLoggedValue(next);
              logEvent(`onChange("${next}")`);
            }}
            onEditStart={() => logEvent('onEditStart')}
            onEditEnd={(reason) => logEvent(`onEditEnd("${reason}")`)}
            onCancel={() => logEvent('onCancel')}
          />
          <div
            style={{
              flex: '1 1 260px',
              minWidth: 260,
              padding: 'var(--admin-space-s)',
              background: 'var(--admin-surface-secondary)',
              border: '1px solid var(--admin-border-subtle)',
              borderRadius: 'var(--admin-radius-s)',
              font: 'var(--admin-font-mono, ui-monospace, monospace)',
              fontSize: 'var(--admin-font-size-xs)',
              color: 'var(--admin-text-secondary)',
            }}
          >
            {events.length === 0 ? (
              <div style={{ fontStyle: 'italic' }}>Double-click the label to start logging events.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: 'var(--admin-space-m)' }}>
                {events.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
