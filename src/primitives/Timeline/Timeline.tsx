import React from 'react';
import styles from './Timeline.module.css';
import Avatar from '../Avatar';

export interface TimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  avatar?: { src?: string; name: string };
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <ol className={`${styles.timeline} ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const variant = item.variant ?? 'default';

        return (
          <li
            key={item.id}
            className={`${styles.item} ${isLast ? styles.last : ''}`}
          >
            <div className={`${styles.indicator} ${!isLast ? styles.withLine : ''}`}>
              {item.avatar ? (
                <div className={styles.avatarWrapper}>
                  <Avatar src={item.avatar.src} name={item.avatar.name} size="sm" />
                </div>
              ) : item.icon ? (
                <div className={`${styles.iconWrapper} ${styles[variant]}`}>
                  {item.icon}
                </div>
              ) : (
                <div
                  className={`${styles.dot} ${styles[variant]}`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className={styles.content}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.timestamp}>{item.timestamp}</span>
              {item.description && (
                <div className={styles.description}>{item.description}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Timeline;
