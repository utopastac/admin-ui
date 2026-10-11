import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button, ToolbarButton } from '@/primitives';
import { Tooltip } from '@/overlays';
import { Settings, Info, Trash2 } from 'lucide-react';

const TooltipProps: PropRow[] = [
  { prop: 'content', type: 'string', description: 'Text displayed inside the tooltip.' },
  { prop: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", options: ['top', 'bottom', 'left', 'right'], description: 'Side of the trigger element where the tooltip appears.' },
  { prop: 'delay', type: 'number', default: '0', description: 'Delay in milliseconds before the tooltip appears.' },
  { prop: 'children', type: 'React.ReactElement', description: 'The element that triggers the tooltip on hover/focus.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the wrapper span.' },
];

export default function TooltipDemo() {
  return (
    <DemoSection
      title="Tooltip"
      description="A floating label that appears on hover or focus to provide additional context."
    >
      <DemoShowcase code={`import { Tooltip, Button } from 'admin-ui';

<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`}>
        <Tooltip content="Save your changes">
          <Button>Save</Button>
        </Tooltip>
      </DemoShowcase>
      <PropsTable props={TooltipProps} />

      <DemoSubsection label="Placement">
        <div className={sharedStyles.row} style={{ gap: 'var(--admin-space-xl)', padding: 'var(--admin-space-xl) 0' }}>
          <Tooltip content="Appears above" placement="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Appears below" placement="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Appears left" placement="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Appears right" placement="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With Icon Buttons">
        <div className={sharedStyles.row} style={{ gap: 'var(--admin-space-m)' }}>
          <Tooltip content="Settings">
            <ToolbarButton icon={Settings} aria-label="Settings" />
          </Tooltip>
          <Tooltip content="More information">
            <ToolbarButton icon={Info} aria-label="More information" />
          </Tooltip>
          <Tooltip content="Delete item">
            <ToolbarButton icon={Trash2} aria-label="Delete item" />
          </Tooltip>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With Delay">
        <Tooltip content="This tooltip appears after a 500ms delay" delay={500}>
          <Button variant="secondary">Hover and wait</Button>
        </Tooltip>
      </DemoSubsection>
    </DemoSection>
  );
}
