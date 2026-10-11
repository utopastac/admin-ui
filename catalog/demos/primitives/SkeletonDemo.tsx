import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Skeleton } from '@/primitives';

const SkeletonProps: PropRow[] = [
  { prop: 'variant', type: "'text' | 'circle' | 'rect'", default: "'rect'", options: ['text', 'circle', 'rect'], description: 'Shape of the skeleton placeholder.' },
  { prop: 'width', type: 'string | number', description: 'Width of the skeleton element.' },
  { prop: 'height', type: 'string | number', description: 'Height of the skeleton element.' },
  { prop: 'lines', type: 'number', default: '1', description: 'Number of text lines to render when variant is "text".' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the root element.' },
];

export default function SkeletonDemo() {
  return (
    <DemoSection
      title="Skeleton"
      description="Pulsing placeholder shapes that mimic loading content. Available in three variants: rect, text, and circle."
    >
      <DemoShowcase code={`import { Skeleton } from 'admin-ui';

<Skeleton variant="rect" width="100%" height="3rem" />`}>
        <Skeleton variant="rect" width="100%" height="3rem" />
      </DemoShowcase>
      <PropsTable props={SkeletonProps} />

      <DemoSubsection label="Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)', width: '100%' }}>
          <div className={sharedStyles.row} style={{ alignItems: 'center' }}>
            <span style={{ width: '4rem', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>rect</span>
            <Skeleton variant="rect" width="200px" height="2.5rem" />
          </div>
          <div className={sharedStyles.row} style={{ alignItems: 'center' }}>
            <span style={{ width: '4rem', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>text</span>
            <Skeleton variant="text" width="200px" />
          </div>
          <div className={sharedStyles.row} style={{ alignItems: 'center' }}>
            <span style={{ width: '4rem', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>circle</span>
            <Skeleton variant="circle" width="40px" height="40px" />
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Text — lines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)', width: '100%' }}>
          <div>
            <p style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-secondary)', marginBottom: 'var(--admin-space-xs)' }}>lines=1</p>
            <Skeleton variant="text" lines={1} />
          </div>
          <div>
            <p style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-secondary)', marginBottom: 'var(--admin-space-xs)' }}>lines=2</p>
            <Skeleton variant="text" lines={2} />
          </div>
          <div>
            <p style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-secondary)', marginBottom: 'var(--admin-space-xs)' }}>lines=3</p>
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)', width: '100%' }}>
          <Skeleton variant="rect" width="100%" height="1rem" />
          <Skeleton variant="rect" width="100%" height="2rem" />
          <Skeleton variant="rect" width="100%" height="4rem" />
          <Skeleton variant="rect" width="100%" height="8rem" />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Card loading composition">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--admin-space-s)',
          padding: 'var(--admin-space-m, 1rem)',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-sm)',
          width: '320px',
        }}>
          {/* Header row: avatar + name/meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--admin-space-s)' }}>
            <Skeleton variant="circle" width="40px" height="40px" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          {/* Body text */}
          <Skeleton variant="text" lines={3} />
          {/* Image placeholder */}
          <Skeleton variant="rect" width="100%" height="160px" />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
