import React, { useState } from 'react';
import { Settings, Search, Plus, X, Copy, Trash2, Edit, Download, Bold, Italic, Underline, ZoomIn } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { ToolbarButton } from '@/primitives';

const ToolbarButtonProps: PropRow[] = [
  { prop: 'icon', type: 'LucideIcon | React.ComponentType<{ size?: number }>', description: 'Icon component to render inside the button.' },
  { prop: 'onClick', type: '() => void', description: 'Click handler.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the button and icon.' },
  { prop: 'pressed', type: 'boolean', description: 'When provided, renders the button as a toggle with aria-pressed.' },
  { prop: 'inUse', type: 'boolean', description: 'Applies the in-use visual state (active but not pressed).' },
  { prop: 'selected', type: 'boolean', description: 'Applies the selected visual state.' },
  { prop: 'aria-label', type: 'string', description: 'Accessible label for the button.' },
  { prop: 'title', type: 'string', description: 'Native title attribute shown as a browser tooltip.' },
  { prop: 'tooltip', type: "string | Omit<TooltipProps, 'children'>", description: 'Tooltip configuration. A string is used as the content.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the button.' },
  { prop: 'disabled', type: 'boolean', description: 'Disables the button.' },
];

export default function ToolbarButtonDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(true);
  const [underline, setUnderline] = useState(false);

  return (
    <DemoSection
      title="ToolbarButton"
      description="Icon-only buttons for toolbars and action bars. Accepts any Lucide icon. Supports a pressed toggle state."
    >
      <DemoShowcase code={`import { ToolbarButton } from 'admin-ui';
import { Settings } from 'lucide-react';

<ToolbarButton icon={Settings} aria-label="Settings" onClick={() => {}} />`}>
        <ToolbarButton icon={Settings} title="Settings" aria-label="Settings" onClick={() => {}} />
      </DemoShowcase>
      <PropsTable props={ToolbarButtonProps} />

      <DemoSubsection label='size="md" (default)'>
        <div className={sharedStyles.row}>
          <ToolbarButton icon={Settings} title="Settings" aria-label="Settings" onClick={() => {}} />
          <ToolbarButton icon={Search} title="Search" aria-label="Search" onClick={() => {}} />
          <ToolbarButton icon={Plus} title="Add" aria-label="Add" onClick={() => {}} />
          <ToolbarButton icon={X} title="Close" aria-label="Close" onClick={() => {}} />
          <ToolbarButton icon={Copy} title="Copy" aria-label="Copy" onClick={() => {}} />
          <ToolbarButton icon={Trash2} title="Delete" aria-label="Delete" onClick={() => {}} />
        </div>
      </DemoSubsection>

      <DemoSubsection label='size="sm"'>
        <div className={sharedStyles.row}>
          <ToolbarButton icon={Edit} title="Edit" aria-label="Edit" size="sm" onClick={() => {}} />
          <ToolbarButton icon={Download} title="Download" aria-label="Download" size="sm" onClick={() => {}} />
          <ToolbarButton icon={X} title="Close" aria-label="Close" size="sm" onClick={() => {}} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="In Use">
        <div className={sharedStyles.row}>
          <ToolbarButton icon={ZoomIn} title="Zoom (default)" aria-label="Zoom" onClick={() => {}} />
          <ToolbarButton icon={ZoomIn} title="Zoom (in use)" aria-label="Zoom" inUse onClick={() => {}} />
          <ToolbarButton icon={ZoomIn} title="Zoom (pressed)" aria-label="Zoom" pressed onClick={() => {}} />
        </div>
        <div className={sharedStyles.row}>
          <ToolbarButton icon={ZoomIn} title="Zoom sm (default)" aria-label="Zoom" size="sm" onClick={() => {}} />
          <ToolbarButton icon={ZoomIn} title="Zoom sm (in use)" aria-label="Zoom" size="sm" inUse onClick={() => {}} />
          <ToolbarButton icon={ZoomIn} title="Zoom sm (pressed)" aria-label="Zoom" size="sm" pressed onClick={() => {}} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With tooltip">
        <div className={sharedStyles.row}>
          <ToolbarButton icon={Bold} aria-label="Bold" tooltip="Bold" onClick={() => {}} />
          <ToolbarButton icon={Italic} aria-label="Italic" tooltip={{ content: 'Italic', placement: 'bottom' }} onClick={() => {}} />
          <ToolbarButton icon={Underline} aria-label="Underline" tooltip={{ content: 'Underline', placement: 'right' }} onClick={() => {}} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Pressed / Toggle">
        <div className={sharedStyles.row}>
          <ToolbarButton icon={Bold} title="Bold" aria-label="Bold" pressed={bold} onClick={() => setBold(!bold)} />
          <ToolbarButton icon={Italic} title="Italic" aria-label="Italic" pressed={italic} onClick={() => setItalic(!italic)} />
          <ToolbarButton icon={Underline} title="Underline" aria-label="Underline" pressed={underline} onClick={() => setUnderline(!underline)} />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
