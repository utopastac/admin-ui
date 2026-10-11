import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button } from '@/primitives';
import { Toast, ToastStack } from '@/overlays';

const ToastProps: PropRow[] = [
  { prop: 'id', type: 'string', description: 'Unique identifier for the toast, passed to onDismiss.' },
  { prop: 'message', type: 'string', description: 'Text content of the notification.' },
  { prop: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Visual style and icon for the notification.', options: ['info', 'success', 'warning', 'error'] },
  { prop: 'autoDismiss', type: 'number', description: 'Auto-dismiss the toast after this many milliseconds.' },
  { prop: 'onDismiss', type: '(id: string) => void', description: 'Called when the toast is dismissed. Shows a dismiss button when provided.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

type Variant = 'info' | 'success' | 'warning' | 'error';
type ToastItem = { id: string; message: string; variant: Variant; autoDismiss?: number };

let nextId = 1;

function makeId() {
  return String(nextId++);
}

export default function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const messages: Record<Variant, string> = {
    info: 'Here is some information for you.',
    success: 'Action completed successfully.',
    warning: 'Please review this before continuing.',
    error: 'Something went wrong. Please try again.',
  };

  function addToast(variant: Variant, autoDismiss?: number) {
    setToasts((prev) => [
      ...prev,
      { id: makeId(), message: messages[variant], variant, autoDismiss },
    ]);
  }

  function handleDismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <DemoSection
      title="Toast"
      description="A lightweight notification card. Use Toast for individual alerts, and ToastStack to manage multiple toasts in a fixed screen position."
    >
      <DemoSubsection label="Variants">
        <DemoShowcase code={`import { Toast } from 'admin-ui';

<Toast id="1" message="Here is some information." variant="info" />
<Toast id="2" message="Action completed successfully." variant="success" />
<Toast id="3" message="Please review this." variant="warning" />
<Toast id="4" message="Something went wrong." variant="error" />`}>
          <div className={sharedStyles.column}>
            <Toast id="static-info" message="Here is some information for you." variant="info" />
            <Toast id="static-success" message="Action completed successfully." variant="success" />
            <Toast id="static-warning" message="Please review this before continuing." variant="warning" />
            <Toast id="static-error" message="Something went wrong. Please try again." variant="error" />
          </div>
        </DemoShowcase>
        <PropsTable props={ToastProps} />
      </DemoSubsection>

      <DemoSubsection label="With dismiss">
        <DemoShowcase code={`<Toast
  id="dismissible"
  message="You can dismiss this toast."
  variant="info"
  onDismiss={(id) => console.log('dismissed', id)}
/>`}>
          <Toast
            id="demo-dismiss"
            message="You can dismiss this toast."
            variant="info"
            onDismiss={(id) => console.log('dismissed', id)}
          />
        </DemoShowcase>
      </DemoSubsection>

      <DemoSubsection label="ToastStack — interactive">
        <DemoShowcase code={`import { ToastStack, Button } from 'admin-ui';

const [toasts, setToasts] = useState([]);

function addToast(variant) {
  setToasts((prev) => [...prev, { id: Date.now().toString(), message: '...', variant }]);
}

function handleDismiss(id) {
  setToasts((prev) => prev.filter((t) => t.id !== id));
}

<Button onClick={() => addToast('success')}>Add success toast</Button>
<ToastStack toasts={toasts} onDismiss={handleDismiss} position="bottom-right" />`}>
          <div className={sharedStyles.row}>
            <Button variant="secondary" onClick={() => addToast('info')}>Info</Button>
            <Button variant="secondary" onClick={() => addToast('success')}>Success</Button>
            <Button variant="secondary" onClick={() => addToast('warning')}>Warning</Button>
            <Button variant="secondary" onClick={() => addToast('error')}>Error</Button>
          </div>
        </DemoShowcase>
      </DemoSubsection>

      <DemoSubsection label="Auto-dismiss">
        <DemoShowcase code={`<ToastStack
  toasts={toasts}
  onDismiss={handleDismiss}
  position="bottom-right"
/>

// Pass autoDismiss (ms) per toast
{ id: '1', message: '...', variant: 'success', autoDismiss: 3000 }`}>
          <div className={sharedStyles.row}>
            <Button variant="secondary" onClick={() => addToast('info', 3000)}>Info — 3s</Button>
            <Button variant="secondary" onClick={() => addToast('success', 3000)}>Success — 3s</Button>
            <Button variant="secondary" onClick={() => addToast('warning', 5000)}>Warning — 5s</Button>
            <Button variant="secondary" onClick={() => addToast('error', 5000)}>Error — 5s</Button>
          </div>
        </DemoShowcase>
      </DemoSubsection>

      <ToastStack toasts={toasts} onDismiss={handleDismiss} position="bottom-right" />
    </DemoSection>
  );
}
