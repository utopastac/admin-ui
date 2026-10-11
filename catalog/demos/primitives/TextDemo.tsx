import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Text } from '@/primitives';
import type { TextVariant } from '@/primitives';

const TextProps: PropRow[] = [
  { prop: 'variant', type: 'TextVariant', options: ['heading-xl', 'heading-l', 'heading-m', 'heading-s', 'heading-xs', 'overline', 'body-m', 'body-s', 'body-xs', 'body-m-strong', 'body-s-strong', 'body-xs-strong'], description: 'Typography variant determining font size, weight, and line-height.' },
  { prop: 'as', type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'li'", default: "'span'", description: 'HTML element to render.' },
  { prop: 'color', type: "'primary' | 'secondary' | 'subtle' | 'highlight' | 'warning' | 'inverted-primary'", default: "'primary'", options: ['primary', 'secondary', 'subtle', 'highlight', 'warning', 'inverted-primary'], description: 'Semantic text color mapped to --admin-text-* tokens.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for layout or overrides.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Text content to render.' },
];

export default function TextDemo() {
  return (
    <DemoSection
      title="Text"
      description="Typography component for consistent text styling. Supports heading, body, and overline variants with semantic color options."
    >
      <DemoShowcase code={`import { Text } from 'admin-ui';

<Text variant="heading-m">Page Title</Text>
<Text variant="body-s" color="secondary">Supporting description text.</Text>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          <Text variant="heading-m">Page Title</Text>
          <Text variant="body-s" color="secondary">Supporting description text.</Text>
        </div>
      </DemoShowcase>
      <PropsTable props={TextProps} />

      <DemoSubsection label="Headings">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          {(['heading-xl', 'heading-l', 'heading-m', 'heading-s', 'heading-xs'] as TextVariant[]).map((v) => (
            <Text key={v} variant={v} as="div">{v}</Text>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          {(['body-m', 'body-s', 'body-xs'] as TextVariant[]).map((v) => (
            <Text key={v} variant={v} as="div">The quick brown fox jumps over the lazy dog ({v})</Text>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Body Strong">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          {(['body-m-strong', 'body-s-strong', 'body-xs-strong'] as TextVariant[]).map((v) => (
            <Text key={v} variant={v} as="div">The quick brown fox jumps over the lazy dog ({v})</Text>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Overline">
        <Text variant="overline">Category Label</Text>
      </DemoSubsection>

      <DemoSubsection label="Colors">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          <Text variant="body-s" color="primary" as="div">Primary (default)</Text>
          <Text variant="body-s" color="secondary" as="div">Secondary</Text>
          <Text variant="body-s" color="subtle" as="div">Subtle</Text>
          <Text variant="body-s" color="highlight" as="div">Highlight</Text>
          <Text variant="body-s" color="warning" as="div">Warning</Text>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Utility Classes (JSX)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
          <div className="admin-type-heading-m">admin-type-heading-m</div>
          <div className="admin-type-body-s">admin-type-body-s</div>
          <div className="admin-type-body-s-strong">admin-type-body-s-strong</div>
          <div className="admin-type-overline">admin-type-overline</div>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
