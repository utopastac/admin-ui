import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Button } from '@/primitives';
import { PageHeading } from '@/layout';

const PageHeadingProps: PropRow[] = [
  { prop: 'title', type: 'string', description: 'The primary heading text.' },
  { prop: 'description', type: 'string', description: 'Optional secondary description text beneath the title.' },
  { prop: 'actions', type: 'React.ReactNode', description: 'Optional content rendered in the trailing actions slot.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

export default function PageHeadingDemo() {
  return (
    <DemoSection title="PageHeading" description="Top-level page heading with optional description and actions slot.">
      <DemoShowcase code={`import { PageHeading } from 'admin-ui';

<PageHeading
  title="Team Members"
  description="Manage your team's access and permissions."
/>`}>
        <div style={{ width: '100%' }}>
          <PageHeading title="Team Members" description="Manage your team's access and permissions." />
        </div>
      </DemoShowcase>
      <PropsTable props={PageHeadingProps} />

      <DemoSubsection label="Title Only">
        <PageHeading title="Dashboard" />
      </DemoSubsection>
      <DemoSubsection label="With Description">
        <PageHeading title="Team Members" description="Manage your team's access and permissions." />
      </DemoSubsection>
      <DemoSubsection label="With Actions">
        <PageHeading
          title="Projects"
          description="All active and archived projects."
          actions={<Button variant="primary" size="sm">New Project</Button>}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
