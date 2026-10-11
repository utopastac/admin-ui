import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Button, ButtonGroup } from '@/primitives';

const ButtonGroupProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Button elements to group together.' },
  { prop: 'align', type: "'start' | 'center' | 'end'", default: "'end'", description: 'Horizontal alignment of the buttons within the group.', options: ['start', 'center', 'end'] },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function ButtonGroupDemo() {
  return (
    <DemoSection
      title="ButtonGroup"
      description="Groups buttons together with configurable horizontal alignment (start, center, end)."
    >
      <DemoShowcase code={`import { Button, ButtonGroup } from 'admin-ui';

<ButtonGroup align="end">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Submit</Button>
</ButtonGroup>`}>
        <div style={{ width: '100%' }}>
          <ButtonGroup align="end">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Submit</Button>
          </ButtonGroup>
        </div>
      </DemoShowcase>

      <PropsTable props={ButtonGroupProps} />

      <DemoSubsection label='align="start"'>
        <ButtonGroup align="start">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </DemoSubsection>

      <DemoSubsection label='align="center"'>
        <ButtonGroup align="center">
          <Button variant="ghost">Back</Button>
          <Button variant="primary">Continue</Button>
        </ButtonGroup>
      </DemoSubsection>

      <DemoSubsection label='align="end"'>
        <ButtonGroup align="end">
          <Button variant="ghost">Discard</Button>
          <Button variant="secondary">Save Draft</Button>
          <Button variant="primary">Publish</Button>
        </ButtonGroup>
      </DemoSubsection>
    </DemoSection>
  );
}
