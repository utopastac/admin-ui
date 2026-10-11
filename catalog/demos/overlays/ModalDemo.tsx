import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button, ButtonGroup } from '@/primitives';
import { Modal } from '@/overlays';

const ModalProps: PropRow[] = [
  { prop: 'isOpen', type: 'boolean', description: 'Whether the modal is visible.' },
  { prop: 'onClose', type: '() => void', description: 'Called when the close button or backdrop is clicked.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Body content of the modal.' },
  { prop: 'title', type: 'string', description: 'Optional heading text in the modal header.' },
  { prop: 'footer', type: 'React.ReactNode', description: 'Optional content rendered in the modal footer.' },
  { prop: 'headerBorder', type: 'boolean', default: 'true', description: 'Show a bottom border on the header.' },
  { prop: 'footerBorder', type: 'boolean', default: 'true', description: 'Show a top border on the footer.' },
  { prop: 'maxWidth', type: "'sm' | 'md' | 'lg' | 'full' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large'", default: "'md'", description: 'Maximum width of the modal dialog.', options: ['sm', 'md', 'lg', 'full'] },
];

export default function ModalDemo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DemoSection
      title="Modal"
      description="A dialog overlay with title, body, and optional footer. Supports sm, md, and lg widths."
    >
      <DemoShowcase code={`import { Modal, Button } from 'admin-ui';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Title">
  Modal content here.
</Modal>`}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
      </DemoShowcase>
      <PropsTable props={ModalProps} />

      <DemoSubsection label="Trigger">
        <div className={sharedStyles.row}>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
        </div>
      </DemoSubsection>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        maxWidth="md"
        headerBorder
        footerBorder
        footer={
          <ButtonGroup align="end">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </ButtonGroup>
        }
      >
        <p style={{ margin: 0, color: 'var(--admin-text-secondary)', lineHeight: 1.6 }}>
          Are you sure you want to proceed with this action? This will apply
          changes to your current project and cannot be easily undone.
        </p>
      </Modal>
    </DemoSection>
  );
}
