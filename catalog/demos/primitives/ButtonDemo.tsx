import React from 'react';
import { Plus, ChevronDown, Download, ArrowRight } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Button } from '@/primitives';

const ButtonProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Button label or content.' },
  { prop: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Visual style of the button.', options: ['primary', 'secondary', 'ghost'] },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the button.', options: ['sm', 'md', 'lg'] },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button when true.' },
  { prop: 'onClick', type: '() => void', default: 'undefined', description: 'Click handler.' },
  { prop: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML button type attribute.', options: ['button', 'submit', 'reset'] },
  { prop: 'aria-label', type: 'string', default: 'undefined', description: 'Accessible label for icon-only buttons.' },
  { prop: 'tooltip', type: 'string | Omit<TooltipProps, "children">', default: 'undefined', description: 'Tooltip shown on hover. Pass a string for simple text or a TooltipProps object for full control.' },
  { prop: 'startIcon', type: 'LucideIcon', default: 'undefined', description: 'Icon rendered before the label. Scales with size.' },
  { prop: 'endIcon', type: 'LucideIcon', default: 'undefined', description: 'Icon rendered after the label. Scales with size.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function ButtonDemo() {
  return (
    <DemoSection
      title="Button"
      description="Buttons trigger actions. Available in three variants (primary, secondary, ghost) and three sizes (sm, md, lg)."
    >
      <DemoShowcase code={`import { Button } from 'admin-ui';

<Button variant="primary">Click me</Button>`}>
        <Button variant="primary">Click me</Button>
      </DemoShowcase>

      <PropsTable props={ButtonProps} />

      <DemoSubsection label="Variants">
        <div className={sharedStyles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Sizes">
        <div className={sharedStyles.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSubsection>

      <DemoSubsection label="All Variants x Sizes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-s)' }}>
          {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
            <div key={variant} className={sharedStyles.row}>
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <Button key={`${variant}-${size}`} variant={variant} size={size}>
                  {variant} {size}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Icons">
        <div className={sharedStyles.row}>
          <Button startIcon={Plus}>Add item</Button>
          <Button endIcon={ChevronDown} variant="secondary">Actions</Button>
          <Button startIcon={Download} variant="ghost">Export</Button>
          <Button startIcon={Plus} endIcon={ArrowRight}>Create and continue</Button>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Icons at all sizes">
        <div className={sharedStyles.row}>
          <Button startIcon={Plus} size="sm">Add</Button>
          <Button startIcon={Plus} size="md">Add</Button>
          <Button startIcon={Plus} size="lg">Add</Button>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <div className={sharedStyles.row}>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="ghost" disabled>Ghost Disabled</Button>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
