import React from 'react';
import { PageHeading, SectionHeading } from '@/layout';
import styles from './styles.module.css';

export function DemoSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.sectionContainer}>
      <PageHeading title={title} description={description} />
      {children}
    </div>
  );
}

export function DemoSubsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.subsection}>
      <SectionHeading size="md" title={label} />
      {children}
    </div>
  );
}
