import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Blockquote } from '@/primitives';

const BlockquoteProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'The quoted content.' },
  { prop: 'cite', type: 'string', default: 'undefined', description: 'Attribution text displayed as a footer after the quote.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function BlockquoteDemo() {
  return (
    <DemoSection title="Blockquote" description="Styled blockquote for highlighting quoted text or callouts.">
      <DemoShowcase code={`import { Blockquote } from 'admin-ui';

<Blockquote cite="Steve Jobs">
  Design is not just what it looks like. Design is how it works.
</Blockquote>`}>
        <Blockquote cite="Steve Jobs">
          Design is not just what it looks like. Design is how it works.
        </Blockquote>
      </DemoShowcase>

      <PropsTable props={BlockquoteProps} />

      <DemoSubsection label="With Citation">
        <Blockquote cite="Steve Jobs">
          Design is not just what it looks like and feels like. Design is how it works.
        </Blockquote>
      </DemoSubsection>
      <DemoSubsection label="Without Citation">
        <Blockquote>
          The best way to predict the future is to invent it.
        </Blockquote>
      </DemoSubsection>
    </DemoSection>
  );
}
