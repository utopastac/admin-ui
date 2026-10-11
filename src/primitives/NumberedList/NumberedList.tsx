import React from 'react';
import styles from './NumberedList.module.css';

interface NumberedListProps {
  items: string[];
  size?: 'sm' | 'md';
  start?: number;
  className?: string;
}

const NumberedList: React.FC<NumberedListProps> = ({
  items,
  size = 'md',
  start = 1,
  className,
}) => {
  const classList = [
    styles.numberedList,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ol
      className={classList}
      start={start}
      style={{ counterReset: `list-counter ${start - 1}` }}
    >
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {item}
        </li>
      ))}
    </ol>
  );
};

export default NumberedList;
