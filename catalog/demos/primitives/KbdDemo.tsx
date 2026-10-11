import React from 'react';
import Kbd from '@/primitives/Kbd';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import Text from '@/primitives/Text';
import Stack from '@/layout/Stack';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const KbdProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'The keyboard shortcut text or symbols to display' },
];

export default function KbdDemo() {
  return (
    <div>
      <DemoSection title="Kbd" description="Inline keyboard shortcut badge for use in tooltips, help text, and command lists.">
        <DemoSubsection label="Shortcuts">
          <DemoShowcase code="<Kbd>⌘K</Kbd>">
            <Stack direction="row" gap="s" align="center">
              <Kbd>⌘K</Kbd>
              <Kbd>⌘Z</Kbd>
              <Kbd>⇧⌘Z</Kbd>
              <Kbd>Escape</Kbd>
              <Kbd>Enter</Kbd>
              <Kbd>Tab</Kbd>
            </Stack>
          </DemoShowcase>
        </DemoSubsection>
        <PropsTable props={KbdProps} />

        <DemoSubsection label="Inline in text">
          <DemoShowcase code={`Press <Kbd>⌘K</Kbd> to open the command palette.`}>
            <Text variant="body-m">
              Press <Kbd>⌘K</Kbd> to open the command palette, or <Kbd>Escape</Kbd> to close it.
            </Text>
          </DemoShowcase>
        </DemoSubsection>
      </DemoSection>
    </div>
  );
}
