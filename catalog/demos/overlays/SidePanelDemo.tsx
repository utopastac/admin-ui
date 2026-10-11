import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button, ButtonGroup } from '@/primitives';
import { SidePanel } from '@/overlays';

const SidePanelProps: PropRow[] = [
  { prop: 'isOpen', type: 'boolean', description: 'Whether the panel is visible.' },
  { prop: 'onClose', type: '() => void', description: 'Called when the close button or backdrop is clicked.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Body content of the panel.' },
  { prop: 'title', type: 'React.ReactNode', description: 'Optional heading content in the panel header.' },
  { prop: 'footer', type: 'React.ReactNode', description: 'Optional content rendered in the panel footer.' },
  { prop: 'actions', type: 'React.ReactNode', description: 'Optional content rendered in the header alongside the close button.' },
  { prop: 'width', type: "'sm' | 'md' | 'lg' | 'xl' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large' | number", default: "'md'", description: 'Width of the panel. Accepts a preset name or a pixel number.', options: ['sm', 'md', 'lg', 'xl'] },
  { prop: 'mode', type: "'overlay' | 'push'", default: "'overlay'", description: 'Overlay floats above content; push shifts content aside.', options: ['overlay', 'push'] },
];

export default function SidePanelDemo() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <DemoSection
      title="SidePanel"
      description="A slide-in panel from the right edge with title, body, and optional footer. Supports sm, md, and lg widths."
    >
      <DemoShowcase code={`import { SidePanel, Button } from 'admin-ui';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Panel</Button>
<SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Details">
  Panel content here.
</SidePanel>`}>
        <Button variant="primary" onClick={() => setPanelOpen(true)}>Open Side Panel</Button>
      </DemoShowcase>
      <PropsTable props={SidePanelProps} />

      <DemoSubsection label="Trigger">
        <div className={sharedStyles.row}>
          <Button variant="primary" onClick={() => setPanelOpen(true)}>
            Open Side Panel
          </Button>
        </div>
      </DemoSubsection>

      <SidePanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title="Details"
        width="md"
        footer={
          <ButtonGroup align="end">
            <Button variant="ghost" onClick={() => setPanelOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setPanelOpen(false)}>
              Save
            </Button>
          </ButtonGroup>
        }
      >
        <p style={{ margin: 'var(--admin-space-m)', color: 'var(--admin-text-secondary)', lineHeight: 1.6 }}>
          This is a side panel overlay that slides in from the right. It supports
          a title, scrollable body content, and an optional footer for actions.
        </p>
      </SidePanel>
    </DemoSection>
  );
}
