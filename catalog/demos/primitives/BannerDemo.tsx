import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Banner } from '@/primitives';
import { Info, CheckCircle, AlertTriangle, XCircle, Bell } from 'lucide-react';

const BannerProps: PropRow[] = [
  { prop: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'error'", description: 'Semantic colour variant.', options: ['default', 'info', 'success', 'warning', 'error'] },
  { prop: 'message', type: 'string', description: 'Primary message text displayed in the banner.' },
  { prop: 'title', type: 'string', default: 'undefined', description: 'Optional bold title shown above the message.' },
  { prop: 'icon', type: 'LucideIcon', default: 'undefined', description: 'Lucide icon component to display on the left.' },
  { prop: 'dismissible', type: 'boolean', default: 'false', description: 'When true, renders a dismiss button that hides the banner.' },
  { prop: 'onDismiss', type: '() => void', default: 'undefined', description: 'Called when the dismiss button is clicked.' },
  { prop: 'layout', type: "'inline' | 'full'", default: "'inline'", description: 'Controls whether the banner spans the full width or fits inline.', options: ['inline', 'full'] },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function BannerDemo() {
  return (
    <DemoSection
      title="Banner"
      description="Full-width or inline notifications for system-level messages. Available in four semantic variants with optional title, icon, and dismiss support."
    >
      <DemoShowcase code={`import { Banner } from 'admin-ui';

<Banner variant="info" message="Your session expires in 10 minutes." />`}>
        <Banner variant="info" message="Your session expires in 10 minutes." />
      </DemoShowcase>

      <PropsTable props={BannerProps} />

      <DemoSubsection label="Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Banner variant="default" message="This record is read-only. Contact an admin to request changes." />
          <Banner variant="info" message="Your account is scheduled for maintenance on Friday at 10pm." />
          <Banner variant="success" message="Your changes have been saved and published successfully." />
          <Banner variant="warning" message="You are approaching your storage limit. Consider removing unused files." />
          <Banner variant="error" message="We could not process your request. Please try again or contact support." />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With title">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Banner variant="default" title="Read-only mode" message="You can view this content but cannot make changes." />
          <Banner variant="info" title="Scheduled maintenance" message="The system will be unavailable on Sunday from 2am to 4am UTC." />
          <Banner variant="success" title="Deployment complete" message="Version 3.2.1 has been deployed to production and is now live." />
          <Banner variant="warning" title="Action required" message="Your API key expires in 7 days. Rotate it now to avoid service interruption." />
          <Banner variant="error" title="Authentication failed" message="Your credentials could not be verified. Please sign in again." />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With icon">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Banner variant="default" icon={Bell} message="You have pending items that require your attention." />
          <Banner variant="info" icon={Info} message="Two-factor authentication is available for your account." />
          <Banner variant="success" icon={CheckCircle} message="Your password has been updated successfully." />
          <Banner variant="warning" icon={AlertTriangle} message="This action will affect all users in your organization." />
          <Banner variant="error" icon={XCircle} message="Failed to connect to the database. Check your connection settings." />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Dismissible">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Banner
            variant="info"
            title="New features available"
            message="We've added bulk export and advanced filtering. Dismiss this banner once you've explored the updates."
            dismissible
          />
          <Banner
            variant="warning"
            message="Your trial ends in 3 days. Upgrade to keep access to all features."
            dismissible
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Full width">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          <Banner variant="default" layout="full" message="You are viewing a snapshot. Live data is not reflected here." />
          <Banner variant="info" layout="full" message="Read-only mode is active. Changes are disabled until maintenance is complete." />
          <Banner variant="success" layout="full" message="All systems are operational." />
          <Banner variant="warning" layout="full" message="High traffic detected. Response times may be slower than usual." />
          <Banner variant="error" layout="full" message="Service disruption detected in the EU region. Our team is investigating." />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
