import React from 'react';
import { DemoSection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { PageContents } from '@/navigation';
import type { PageContentsItem } from '@/navigation';

const PageContentsProps: PropRow[] = [
  { prop: 'items', type: 'PageContentsItem[]', description: 'Navigation items with optional nested children (max 2 levels).' },
  { prop: 'label', type: 'string', description: 'Optional heading rendered above the links.' },
  { prop: 'truncate', type: 'boolean', default: 'false', description: 'Truncate long link labels with an ellipsis instead of wrapping.' },
];

const items: PageContentsItem[] = [
  {
    label: 'Getting started',
    href: '#pc-getting-started',
    children: [
      { label: 'Installation', href: '#pc-installation' },
      { label: 'Configuration', href: '#pc-configuration' },
    ],
  },
  {
    label: 'Usage',
    href: '#pc-usage',
    children: [
      { label: 'Basic example', href: '#pc-basic-example' },
      { label: 'With nesting', href: '#pc-with-nesting' },
    ],
  },
  { label: 'API reference', href: '#pc-api-reference' },
  { label: 'Accessibility', href: '#pc-accessibility' },
];

function SectionBlock({ id, title }: { id: string; title: string }) {
  return (
    <div
      id={id}
      style={{
        height: 240,
        padding: 'var(--admin-space-l)',
        background: 'var(--admin-surface-subtle)',
        borderRadius: 'var(--admin-radius-m)',
        marginBottom: 'var(--admin-space-m)',
      }}
    >
      <h2 style={{ margin: 0, fontSize: 'var(--admin-font-size-m)', color: 'var(--admin-text-primary)' }}>
        {title}
      </h2>
    </div>
  );
}

export default function PageContentsDemo() {
  return (
    <DemoSection
      title="PageContents"
      description="Scroll-aware anchor navigation for long pages. Tracks the active section via IntersectionObserver and highlights the current item and its ancestors."
    >
      <DemoShowcase
        code={`import { PageContents } from 'admin-ui';
import type { PageContentsItem } from 'admin-ui';

const items: PageContentsItem[] = [
  {
    label: 'Getting started',
    href: '#getting-started',
    children: [
      { label: 'Installation', href: '#installation' },
      { label: 'Configuration', href: '#configuration' },
    ],
  },
  { label: 'API reference', href: '#api-reference' },
];

<PageContents items={items} label="On this page" />`}
      >
        <div style={{ display: 'flex', gap: 'var(--admin-space-xl)', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: 'var(--admin-space-l)', width: 200, flexShrink: 0 }}>
            <PageContents items={items} label="On this page" />
          </div>
          <div style={{ flex: 1, maxHeight: 480, overflowY: 'auto', paddingRight: 'var(--admin-space-s)' }}>
            <SectionBlock id="pc-getting-started" title="Getting started" />
            <SectionBlock id="pc-installation" title="Installation" />
            <SectionBlock id="pc-configuration" title="Configuration" />
            <SectionBlock id="pc-usage" title="Usage" />
            <SectionBlock id="pc-basic-example" title="Basic example" />
            <SectionBlock id="pc-with-nesting" title="With nesting" />
            <SectionBlock id="pc-api-reference" title="API reference" />
            <SectionBlock id="pc-accessibility" title="Accessibility" />
          </div>
        </div>
      </DemoShowcase>
      <PropsTable props={PageContentsProps} />
    </DemoSection>
  );
}
