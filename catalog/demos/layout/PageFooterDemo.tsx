import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Button } from '@/primitives';
import { PageFooter } from '@/layout';

const PageFooterProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Footer content, typically action buttons.' },
  { prop: 'align', type: "'left' | 'center' | 'right'", default: "'right'", description: 'Horizontal alignment of the footer content.', options: ['left', 'center', 'right'] },
  { prop: 'border', type: 'boolean', default: 'true', description: 'Show a top border on the footer.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the footer element.' },
];

export default function PageFooterDemo() {
  return (
    <DemoSection title="PageFooter" description="Page-level footer for actions, typically at the bottom of a form or page.">
      <DemoShowcase code={`import { PageFooter, Button } from 'admin-ui';

<PageFooter>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save Changes</Button>
</PageFooter>`}>
        <div style={{ width: '100%' }}>
          <PageFooter>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </PageFooter>
        </div>
      </DemoShowcase>
      <PropsTable props={PageFooterProps} />

      <DemoSubsection label="Right Aligned (default)">
        <PageFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </PageFooter>
      </DemoSubsection>
      <DemoSubsection label="Left Aligned, No Border">
        <PageFooter align="left" border={false}>
          <Button variant="ghost">Back</Button>
        </PageFooter>
      </DemoSubsection>
      <DemoSubsection label="Center Aligned">
        <PageFooter align="center">
          <Button variant="secondary">Discard</Button>
          <Button variant="primary">Publish</Button>
        </PageFooter>
      </DemoSubsection>
    </DemoSection>
  );
}
