import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { FieldLabel } from '@/primitives';

const FieldLabelProps: PropRow[] = [
  { prop: 'label', type: 'string', description: 'Label text.' },
  { prop: 'children', type: 'React.ReactNode', description: 'The form control to label.' },
  { prop: 'size', type: 'string', default: "'sm'", options: ['sm', 'lg'], description: 'Label font size.' },
  { prop: 'labelPosition', type: 'string', default: "'top'", options: ['top', 'left'], description: 'Whether the label appears above or to the left of the control.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width for the label (useful for aligning multiple fields).' },
  { prop: 'htmlFor', type: 'string', description: 'Associates the label with an input by ID.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Applies disabled styling to the label.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

const inputStyle: React.CSSProperties = {
  height: 'var(--admin-input-height-sm)',
  padding: '0 var(--admin-space-s)',
  border: '1px solid transparent',
  borderRadius: 'var(--admin-radius-sm)',
  backgroundColor: 'var(--admin-input-background)',
  color: 'var(--admin-text-primary)',
  outline: 'none',
  width: '100%',
};

export default function FieldLabelDemo() {
  return (
    <DemoSection
      title="FieldLabel"
      description="A layout wrapper that renders a label alongside children. Supports top or left positioning, fixed label widths, two sizes, and a disabled state."
    >
      <DemoShowcase code={`import { FieldLabel } from 'admin-ui';

<FieldLabel label="Full Name" htmlFor="name-input">
  <input id="name-input" style={inputStyle} />
</FieldLabel>`}>
        <div style={{ width: '280px' }}>
          <FieldLabel label="Full Name" htmlFor="showcase-input">
            <input id="showcase-input" style={inputStyle} />
          </FieldLabel>
        </div>
      </DemoShowcase>
      <PropsTable props={FieldLabelProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Top label">
          <FieldLabel label="Email" htmlFor="top-input">
            <input id="top-input" style={inputStyle} />
          </FieldLabel>
        </DemoSubsection>

        <DemoSubsection label="Left label">
          <FieldLabel label="Email" labelPosition="left" htmlFor="left-input">
            <input id="left-input" style={inputStyle} />
          </FieldLabel>
        </DemoSubsection>

        <DemoSubsection label="Fixed label width">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
            <FieldLabel label="Name" labelPosition="left" labelWidth={80} htmlFor="fw-name">
              <input id="fw-name" style={inputStyle} />
            </FieldLabel>
            <FieldLabel label="Email" labelPosition="left" labelWidth={80} htmlFor="fw-email">
              <input id="fw-email" style={inputStyle} />
            </FieldLabel>
          </div>
        </DemoSubsection>

        <DemoSubsection label="Small size (default)">
          <FieldLabel label="Username" size="sm" htmlFor="sm-input">
            <input id="sm-input" style={inputStyle} />
          </FieldLabel>
        </DemoSubsection>

        <DemoSubsection label="Large size">
          <FieldLabel label="Username" size="lg" htmlFor="lg-input">
            <input id="lg-input" style={inputStyle} />
          </FieldLabel>
        </DemoSubsection>

        <DemoSubsection label="Disabled">
          <FieldLabel label="Read only" disabled htmlFor="disabled-input">
            <input id="disabled-input" style={inputStyle} disabled />
          </FieldLabel>
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
