import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button } from '@/primitives';
import { AlertDialog } from '@/overlays';

const AlertDialogProps: PropRow[] = [
  { prop: 'isOpen', type: 'boolean', description: 'Whether the dialog is visible.' },
  { prop: 'onConfirm', type: '() => void', description: 'Called when the confirm button is clicked.' },
  { prop: 'onCancel', type: '() => void', description: 'Called when the cancel button or backdrop is clicked.' },
  { prop: 'title', type: 'string', description: 'Heading text for the dialog.' },
  { prop: 'description', type: 'string', description: 'Body text for the dialog.' },
  { prop: 'confirmLabel', type: 'string', default: "'Continue'", description: 'Label for the confirm button.' },
  { prop: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Label for the cancel button.' },
  { prop: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'Visual style of the confirm button.', options: ['default', 'destructive'] },
];

export default function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<'default' | 'destructive'>('default');
  return (
    <DemoSection title="AlertDialog" description="A modal dialog for important confirmations requiring a user response.">
      <DemoShowcase code={`import { AlertDialog } from 'admin-ui';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<AlertDialog
  isOpen={open}
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
  title="Are you sure?"
  description="This action cannot be undone."
/>`}>
        <Button onClick={() => { setVariant('default'); setOpen(true); }}>Open Dialog</Button>
      </DemoShowcase>
      <PropsTable props={AlertDialogProps} />

      <DemoSubsection label="Default">
        <div className={sharedStyles.row}>
          <Button onClick={() => { setVariant('default'); setOpen(true); }}>Open Dialog</Button>
          <Button variant="secondary" onClick={() => { setVariant('destructive'); setOpen(true); }}>Destructive</Button>
        </div>
        <AlertDialog
          isOpen={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          variant={variant}
          confirmLabel={variant === 'destructive' ? 'Delete' : 'Continue'}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
