import React, { useState } from 'react';
import styles from './Avatar.module.css';
import { resolveSize, SizeSmMdLg } from '@/utils/resolveSize';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'xl' | SizeSmMdLg;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const resolvedSize = resolveSize(size, 'md');

  return (
    <div className={`${styles.avatar} ${styles[resolvedSize]} ${className}`} title={name}>
      {showImage ? (
        <img src={src} alt={name} className={styles.image} onError={() => setImgError(true)} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
