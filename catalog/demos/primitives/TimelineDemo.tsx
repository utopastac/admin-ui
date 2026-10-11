import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Timeline } from '@/primitives';
import type { TimelineItem } from '@/primitives';
import { sampleAvatars } from '../../data/avatars';

const TimelineProps: PropRow[] = [
  { prop: 'items', type: 'TimelineItem[]', description: 'Array of timeline event objects to render.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the root ol element.' },
];

const basicItems: TimelineItem[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    title: 'Account created',
    description: 'User registered via email signup.',
  },
  {
    id: '2',
    timestamp: '1 hour ago',
    title: 'Email verified',
  },
  {
    id: '3',
    timestamp: '30 minutes ago',
    title: 'Profile completed',
    description: 'Name, role, and avatar were set.',
  },
];

const auditItems: TimelineItem[] = [
  {
    id: '1',
    timestamp: 'Apr 6, 09:14',
    title: 'Permission granted',
    description: 'Admin access granted by superadmin@example.com',
    variant: 'success',
  },
  {
    id: '2',
    timestamp: 'Apr 6, 10:02',
    title: 'Settings changed',
    description: 'Two-factor authentication was disabled.',
    variant: 'warning',
  },
  {
    id: '3',
    timestamp: 'Apr 6, 11:45',
    title: 'Suspicious login attempt',
    description: 'Login blocked from unrecognized IP 203.0.113.42.',
    variant: 'error',
  },
  {
    id: '4',
    timestamp: 'Apr 6, 12:30',
    title: 'Password reset',
    description: 'Password was successfully reset.',
    variant: 'info',
  },
];

const avatarItems: TimelineItem[] = [
  {
    id: '1',
    timestamp: '3 days ago',
    title: `Issue opened by ${sampleAvatars[0].name}`,
    description: 'Reported incorrect billing amount on invoice #4821.',
    avatar: sampleAvatars[0],
  },
  {
    id: '2',
    timestamp: '2 days ago',
    title: `Assigned to ${sampleAvatars[1].name}`,
    avatar: sampleAvatars[1],
  },
  {
    id: '3',
    timestamp: 'Yesterday',
    title: `Resolved by ${sampleAvatars[1].name}`,
    description: 'Issued a corrected invoice and refunded the difference.',
    avatar: sampleAvatars[1],
    variant: 'success',
  },
];

const iconItems: TimelineItem[] = [
  {
    id: '1',
    timestamp: '9:00 AM',
    title: 'Build started',
    icon: <span>▶</span>,
  },
  {
    id: '2',
    timestamp: '9:03 AM',
    title: 'Tests passed',
    icon: <span>✓</span>,
    variant: 'success',
  },
  {
    id: '3',
    timestamp: '9:05 AM',
    title: 'Deploy failed',
    description: 'Connection timeout on production cluster.',
    icon: <span>✕</span>,
    variant: 'error',
  },
];

export default function TimelineDemo() {
  return (
    <DemoSection
      title="Timeline"
      description="Ordered list of events with timestamps, connector lines, and optional icons or avatars per entry."
    >
      <DemoShowcase code={`import { Timeline } from 'admin-ui';

<Timeline items={[
  { id: '1', timestamp: '2 hours ago', title: 'Account created', description: 'User registered via email.' },
  { id: '2', timestamp: '1 hour ago', title: 'Email verified' },
  { id: '3', timestamp: '30 minutes ago', title: 'Profile completed' },
]} />`}>
        <Timeline items={basicItems} />
      </DemoShowcase>
      <PropsTable props={TimelineProps} />

      <DemoSubsection label="Variants (audit log)">
        <Timeline items={auditItems} />
      </DemoSubsection>

      <DemoSubsection label="With avatars">
        <Timeline items={avatarItems} />
      </DemoSubsection>

      <DemoSubsection label="With icons">
        <Timeline items={iconItems} />
      </DemoSubsection>
    </DemoSection>
  );
}
