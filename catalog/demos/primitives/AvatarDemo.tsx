import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Avatar } from '@/primitives';
import { sampleAvatars } from '../../data/avatars';

const AvatarProps: PropRow[] = [
  { prop: 'name', type: 'string', description: 'Full name of the person. Used to generate initials when no image is available.' },
  { prop: 'src', type: 'string', default: 'undefined', description: 'URL of the avatar image. Falls back to initials on error or when omitted.' },
  { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the avatar.', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

const [a, b, c] = sampleAvatars;

export default function AvatarDemo() {
  return (
    <DemoSection
      title="Avatar"
      description="Displays a user avatar image or initials fallback. Supports xs, sm, md, lg, and xl sizes."
    >
      <DemoShowcase code={`import { Avatar } from 'admin-ui';

<Avatar name="${a.name}" src={src} size="md" />`}>
        <Avatar name={a.name} src={a.src} size="md" />
      </DemoShowcase>

      <PropsTable props={AvatarProps} />

      <DemoSubsection label="Sizes">
        <div className={sharedStyles.row}>
          <Avatar name={a.name} src={a.src} size="xs" />
          <Avatar name={a.name} src={a.src} size="sm" />
          <Avatar name={a.name} src={a.src} size="md" />
          <Avatar name={a.name} src={a.src} size="lg" />
          <Avatar name={a.name} src={a.src} size="xl" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sample avatars">
        <div className={sharedStyles.row}>
          {sampleAvatars.map(av => (
            <Avatar key={av.id} name={av.name} src={av.src} size="lg" />
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Initials fallback">
        <div className={sharedStyles.row}>
          <Avatar name={a.name} size="sm" />
          <Avatar name={b.name} size="md" />
          <Avatar name={c.name} size="lg" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Broken image (falls back to initials)">
        <Avatar name={a.name} size="md" src="https://broken.invalid/nope.jpg" />
      </DemoSubsection>
    </DemoSection>
  );
}
