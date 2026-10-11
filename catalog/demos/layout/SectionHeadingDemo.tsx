import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Button } from '@/primitives';
import { SectionHeading } from '@/layout';

const SectionHeadingProps: PropRow[] = [
  { prop: 'title', type: 'string', description: 'The heading text.' },
  { prop: 'description', type: 'string', description: 'Optional description text beneath the heading.' },
  { prop: 'size', type: 'SectionHeadingSize', default: "'md'", description: 'Visual size of the heading.', options: ['sm', 's', 'small', 'md', 'm', 'medium', 'lg', 'l', 'large'] },
  { prop: 'actions', type: 'React.ReactNode', description: 'Optional content rendered in the trailing actions slot.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

export default function SectionHeadingDemo() {
  return (
    <DemoSection title="SectionHeading" description="Section-level heading with multiple sizes and optional actions.">
      <DemoShowcase code={`import { SectionHeading } from 'admin-ui';

<SectionHeading
  title="Notifications"
  description="Choose how you want to be notified."
/>`}>
        <div style={{ width: '100%' }}>
          <SectionHeading title="Notifications" description="Choose how you want to be notified." />
        </div>
      </DemoShowcase>
      <PropsTable props={SectionHeadingProps} />

      <DemoSubsection label="Large">
        <SectionHeading size="lg" title="General Settings" description="Configure your workspace preferences." />
      </DemoSubsection>
      <DemoSubsection label="Medium (default)">
        <SectionHeading title="Notifications" description="Choose how you want to be notified." />
      </DemoSubsection>
      <DemoSubsection label="Small">
        <SectionHeading size="sm" title="Advanced" />
      </DemoSubsection>
      <DemoSubsection label="With Actions">
        <SectionHeading title="API Keys" description="Manage your API keys." actions={<Button variant="secondary" size="sm">Generate Key</Button>} />
      </DemoSubsection>
    </DemoSection>
  );
}
