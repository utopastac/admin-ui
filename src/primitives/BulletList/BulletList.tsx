import React from 'react';
import styles from './BulletList.module.css';

interface BulletListProps {
  items: string[];
  size?: 'sm' | 'md';
  className?: string;
}

const BulletList: React.FC<BulletListProps> = ({
  items,
  size = 'md',
  className = '',
}) => {
  const listClass = [styles.list, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={listClass}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
