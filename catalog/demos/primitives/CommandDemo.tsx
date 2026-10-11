import React, { useState } from 'react';
import { Home, Settings, FileText, Search, Trash2, Download, LayoutDashboard } from 'lucide-react';
import { Command, CommandDialog } from '@/primitives/Command';
import type { CommandGroup } from '@/primitives/Command';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

type IconComponent = React.ComponentType<{ size?: number }>;
const asIcon = (icon: unknown) => icon as IconComponent;
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import Button from '@/primitives/Button';

const CommandProps: PropRow[] = [
  { prop: 'groups', type: 'CommandGroup[]', description: 'Array of command groups, each with an optional label and list of items.' },
  { prop: 'placeholder', type: 'string', default: "'Search…'", description: 'Placeholder text for the search input.' },
  { prop: 'emptyMessage', type: 'string', default: "'No results.'", description: 'Message shown when no items match the query.' },
  { prop: 'onClose', type: '() => void', description: 'Called when the Escape key is pressed.' },
  { prop: 'header', type: 'React.ReactNode', description: 'Optional content rendered between the search input and results list.' },
  { prop: 'className', type: 'string', description: 'Additional class names.' },
];

const groups: CommandGroup[] = [
  {
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Go to Home', icon: asIcon(Home), shortcut: '⌘H', onSelect: () => {} },
      { id: 'dashboard', label: 'Open Dashboard', icon: asIcon(LayoutDashboard), onSelect: () => {} },
      { id: 'settings', label: 'Open Settings', icon: asIcon(Settings), shortcut: '⌘,', onSelect: () => {} },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'new', label: 'New Document', icon: asIcon(FileText), shortcut: '⌘N', onSelect: () => {} },
      { id: 'search', label: 'Search Files', icon: asIcon(Search), shortcut: '⌘F', onSelect: () => {} },
      { id: 'download', label: 'Download Report', icon: asIcon(Download), onSelect: () => {} },
    ],
  },
  {
    label: 'Danger Zone',
    items: [
      { id: 'delete', label: 'Delete Selected', icon: asIcon(Trash2), onSelect: () => {} },
    ],
  },
];

export default function CommandDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DemoSection
        title="Command"
        description="A searchable command palette. Press ⌘K to open the dialog, or use the inline panel directly."
      >
        <DemoSubsection label="Dialog (⌘K)">
          <DemoShowcase code={`import { CommandDialog } from 'admin-ui';\n\n<CommandDialog open={open} onClose={() => setOpen(false)} groups={groups} />`}>
            <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
            <CommandDialog
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              groups={groups}
              placeholder="Search commands…"
            />
          </DemoShowcase>
        <PropsTable props={CommandProps} />
        </DemoSubsection>

        <DemoSubsection label="Inline Panel">
          <DemoShowcase code={`import { Command } from 'admin-ui';\n\n<Command groups={groups} placeholder="Search commands…" />`}>
            <div style={{ width: 480 }}>
              <Command groups={groups} placeholder="Search commands…" />
            </div>
          </DemoShowcase>
        </DemoSubsection>
      </DemoSection>
    </div>
  );
}
