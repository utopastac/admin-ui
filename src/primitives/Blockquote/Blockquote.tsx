import React from 'react';
import styles from './Blockquote.module.css';

interface BlockquoteProps {
  children: React.ReactNode;
  cite?: string;
  className?: string;
}

const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  cite,
  className = '',
}) => {
  const blockquoteClass = [styles.blockquote, className].filter(Boolean).join(' ');

  return (
    <blockquote className={blockquoteClass}>
      <div className={styles.content}>{children}</div>
      {cite && <footer className={styles.cite}>&mdash; {cite}</footer>}
    </blockquote>
  );
};

export default Blockquote;
