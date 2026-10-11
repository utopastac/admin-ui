import React from 'react';
import { CodeBlock } from '@/primitives';
import styles from './DemoShowcase.module.css';

interface DemoShowcaseProps {
  children: React.ReactNode;
  code: string;
  language?: string;
}

export function DemoShowcase({ children, code, language = 'tsx' }: DemoShowcaseProps) {
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {children}
      </div>
      <CodeBlock language={language}>{code}</CodeBlock>
    </div>
  );
}
