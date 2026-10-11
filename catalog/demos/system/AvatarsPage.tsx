import React from 'react';
import Avatar from '@/primitives/Avatar';
import { sampleAvatars } from '../../data/avatars';
import { DemoSection } from '../../shared/DemoSection';
import { SystemTokenList } from '../../shared/SystemTokenList';
import styles from './AvatarsPage.module.css';

const AvatarsPage: React.FC = () => {
  return (
    <DemoSection
      title="Avatars"
      description="Pre-built avatar samples available via sampleAvatars from catalog/data/avatars. Each is an SVG data URI with a colored background, head circle, and shoulder arc."
    >
      <SystemTokenList
        labelWidth="160px"
        rows={sampleAvatars.map((avatar) => ({
          preview: <Avatar src={avatar.src} name={avatar.name} size="md" className={styles.avatar} />,
          label: avatar.name,
          description: avatar.role,
          token: avatar.id,
        }))}
      />
    </DemoSection>
  );
};

export default AvatarsPage;
