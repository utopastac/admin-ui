import React, { useState, useRef } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import Popover from '@/primitives/Popover';
import Button from '@/primitives/Button';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const PopoverProps: PropRow[] = [
  { prop: 'isOpen', type: 'boolean', description: 'Whether the popover is currently open' },
  { prop: 'onClose', type: '() => void', description: 'Called when the popover should close (click outside or Escape)' },
  { prop: 'anchorRef', type: 'React.RefObject<HTMLElement | null>', description: 'Ref to the element the popover is positioned relative to' },
  { prop: 'children', type: 'React.ReactNode', description: 'Content rendered inside the popover' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the popover element' },
  { prop: 'matchWidth', type: 'boolean', default: 'false', description: 'When true, the popover width matches the anchor width' },
  { prop: 'overlap', type: 'boolean', default: 'false', description: 'When true, aligns the popover top to the anchor top instead of below it' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset from the anchor' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset from the anchor' },
  { prop: 'role', type: 'string', description: 'ARIA role applied to the popover element' },
  { prop: 'aria-label', type: 'string', description: 'ARIA label applied to the popover element' },
];

export default function PopoverDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const basicRef = useRef<HTMLDivElement>(null);

  const [matchOpen, setMatchOpen] = useState(false);
  const matchRef = useRef<HTMLDivElement>(null);

  return (
    <DemoSection
      title="Popover"
      description="A portal-based positioning primitive that renders content into document.body with viewport-aware placement. Used internally by ColorPicker and Select for their dropdowns. Escapes overflow:hidden containers like SidePanel."
    >
      <DemoShowcase
        code={`import { Popover } from 'admin-ui';

const [isOpen, setIsOpen] = useState(false);
const anchorRef = useRef(null);

<div ref={anchorRef}>
  <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
</div>
<Popover
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  anchorRef={anchorRef}
>
  <div>Popover content</div>
</Popover>`}
      >
        <div ref={basicRef}>
          <Button onClick={() => setBasicOpen(!basicOpen)}>
            {basicOpen ? 'Close' : 'Open'} Popover
          </Button>
        </div>
        <Popover
          isOpen={basicOpen}
          onClose={() => setBasicOpen(false)}
          anchorRef={basicRef}
        >
          <div style={{
            padding: 'var(--admin-space-m)',
            background: 'var(--admin-background-primary)',
            border: '1px solid var(--admin-border-subtle)',
            borderRadius: 'var(--admin-radius-md)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}>
            This content is portaled to document.body and positioned relative to the trigger.
          </div>
        </Popover>
      </DemoShowcase>
      <PropsTable props={PopoverProps} />

      <DemoSubsection label="Match Width">
        <div ref={matchRef} style={{ width: '240px' }}>
          <Button onClick={() => setMatchOpen(!matchOpen)}>
            {matchOpen ? 'Close' : 'Open'} (matchWidth)
          </Button>
        </div>
        <Popover
          isOpen={matchOpen}
          onClose={() => setMatchOpen(false)}
          anchorRef={matchRef}
          matchWidth
        >
          <div style={{
            padding: 'var(--admin-space-m)',
            background: 'var(--admin-background-primary)',
            border: '1px solid var(--admin-border-subtle)',
            borderRadius: 'var(--admin-radius-md)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}>
            This popover matches the anchor width.
          </div>
        </Popover>
      </DemoSubsection>
    </DemoSection>
  );
}
