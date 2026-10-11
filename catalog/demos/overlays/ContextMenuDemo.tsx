import React from 'react';
import { Edit2, Copy, Clipboard, Trash2, Download, Share2, Star, EyeOff } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { ContextMenu } from '@/overlays';
import type { ContextMenuItem } from '@/overlays';

const ContextMenuProps: PropRow[] = [
  { prop: 'items', type: 'ContextMenuItem[]', description: 'Menu items to display.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Wrap children to intercept right-click. Omit to use controlled mode.' },
  { prop: 'open', type: 'boolean', description: 'Controlled mode: whether the menu is open.' },
  { prop: 'position', type: '{ x: number; y: number }', description: 'Controlled mode: position of the menu.' },
  { prop: 'onClose', type: '() => void', description: 'Controlled mode: called when the menu should close.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the wrapper element.' },
];

export default function ContextMenuDemo() {
  const menuItems: ContextMenuItem[] = [
    { label: 'Edit', onClick: () => {}, shortcut: '⌘E' },
    { label: 'Copy', onClick: () => {}, shortcut: '⌘C' },
    { label: 'Paste', onClick: () => {}, shortcut: '⌘V' },
    { label: '', separator: true },
    { label: 'Delete', onClick: () => {}, variant: 'destructive', shortcut: '⌫' },
  ];

  const menuItemsWithIcons: ContextMenuItem[] = [
    { label: 'Edit', icon: Edit2, onClick: () => {}, shortcut: '⌘E' },
    { label: 'Copy', icon: Copy, onClick: () => {}, shortcut: '⌘C' },
    { label: 'Paste', icon: Clipboard, onClick: () => {}, shortcut: '⌘V' },
    { label: '', separator: true },
    { label: 'Download', icon: Download, onClick: () => {} },
    { label: 'Share', icon: Share2, onClick: () => {} },
    { label: 'Favourite', icon: Star, onClick: () => {} },
    { label: 'Hide', icon: EyeOff, onClick: () => {} },
    { label: '', separator: true },
    { label: 'Delete', icon: Trash2, onClick: () => {}, variant: 'destructive', shortcut: '⌫' },
  ];
  return (
    <DemoSection title="ContextMenu" description="Right-click context menu displaying a list of actions.">
      <DemoShowcase code={`import { ContextMenu } from 'admin-ui';

const items = [
  { label: 'Edit', onClick: () => {}, shortcut: '⌘E' },
  { label: 'Copy', onClick: () => {}, shortcut: '⌘C' },
];

<ContextMenu items={items}>
  <div>Right-click here</div>
</ContextMenu>`}>
        <ContextMenu items={menuItems}>
          <div style={{ border: '2px dashed var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xxl)', textAlign: 'center', color: 'var(--admin-text-subtle)', cursor: 'default' }}>
            Right-click here to open context menu
          </div>
        </ContextMenu>
      </DemoShowcase>
      <PropsTable props={ContextMenuProps} />

      <DemoSubsection label="Right-Click Area">
        <ContextMenu items={menuItems}>
          <div style={{ border: '2px dashed var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xxl)', textAlign: 'center', color: 'var(--admin-text-subtle)', cursor: 'default' }}>
            Right-click here to open context menu
          </div>
        </ContextMenu>
      </DemoSubsection>

      <DemoSubsection label="With Icons">
        <ContextMenu items={menuItemsWithIcons}>
          <div style={{ border: '2px dashed var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xxl)', textAlign: 'center', color: 'var(--admin-text-subtle)', cursor: 'default' }}>
            Right-click here to open context menu with icons
          </div>
        </ContextMenu>
      </DemoSubsection>
    </DemoSection>
  );
}
