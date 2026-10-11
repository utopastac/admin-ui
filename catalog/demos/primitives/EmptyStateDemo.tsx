import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { EmptyState } from '@/primitives';
import { Button } from '@/primitives';
import { Inbox, Search, FileX, ShieldOff, WifiOff } from 'lucide-react';

const EmptyStateProps: PropRow[] = [
  { prop: 'title', type: 'string', description: 'Primary message text.' },
  { prop: 'illustration', type: 'React.ReactNode', description: 'Illustration or icon rendered above the title.' },
  { prop: 'description', type: 'string', description: 'Secondary descriptive text.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Action elements (e.g. buttons) rendered below the description.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

export default function EmptyStateDemo() {
  return (
    <DemoSection
      title="EmptyState"
      description="Placeholder for zero-data or error states. Accepts an optional illustration node, title, description, and an actions slot."
    >
      <DemoShowcase code={`import { EmptyState } from 'admin-ui';
import { Inbox } from 'lucide-react';

<EmptyState
  illustration={<Inbox size={48} />}
  title="No messages"
  description="Messages from your team will appear here."
/>`}>
        <EmptyState
          illustration={<Inbox size={48} />}
          title="No messages"
          description="Messages from your team will appear here."
        />
      </DemoShowcase>
      <PropsTable props={EmptyStateProps} />

      <DemoSubsection label="With action">
        <EmptyState
          illustration={<Search size={48} />}
          title="No results"
          description="Try adjusting your search or filters to find what you're looking for."
        >
          <Button variant="secondary" size="sm">Clear filters</Button>
        </EmptyState>
      </DemoSubsection>

      <DemoSubsection label="Common states">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--admin-space-m)' }}>
          <EmptyState
            illustration={<FileX size={48} />}
            title="No files found"
            description="Upload a file to get started."
          >
            <Button size="sm">Upload file</Button>
          </EmptyState>
          <EmptyState
            illustration={<ShieldOff size={48} />}
            title="Access denied"
            description="You don't have permission to view this page."
          />
          <EmptyState
            illustration={<WifiOff size={48} />}
            title="Connection lost"
            description="Check your network and try again."
          >
            <Button variant="secondary" size="sm">Retry</Button>
          </EmptyState>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Title only">
        <EmptyState title="Nothing here yet." />
      </DemoSubsection>
    </DemoSection>
  );
}
