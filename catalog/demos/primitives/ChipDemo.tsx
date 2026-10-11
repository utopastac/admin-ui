import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import { Chip } from '@/primitives';
import { sampleAvatars } from '../../data/avatars';

const ChipProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Content of the chip.' },
  { prop: 'variant', type: 'string', default: "'default'", options: ['default', 'success', 'warning', 'info', 'error'], description: 'Color variant.' },
  { prop: 'icon', type: 'React.ReactNode', description: 'Leading icon node.' },
  { prop: 'avatar', type: '{ src?: string; name: string }', description: 'Avatar to display as leading element.' },
  { prop: 'selected', type: 'boolean', default: 'false', description: 'Whether the chip is in a selected state.' },
  { prop: 'onSelect', type: '() => void', description: 'Callback when the chip is clicked. Renders as a button.' },
  { prop: 'onRemove', type: '() => void', description: 'Callback when the remove button is clicked.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

export default function ChipDemo() {
  const [selected, setSelected] = useState(false);
  const [tags, setTags] = useState(['Design', 'Engineering', 'Research']);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Active']);

  const toggleFilter = (label: string) => {
    setActiveFilters(prev =>
      prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
    );
  };

  return (
    <DemoSection
      title="Chip"
      description="Compact labels for tags, filters, and selections. Supports read-only, removable, and selectable modes."
    >
      <DemoShowcase code={`import { Chip } from 'admin-ui';

<Chip>Label</Chip>`}>
        <Chip>Label</Chip>
      </DemoShowcase>
      <PropsTable props={ChipProps} />

      <DemoSubsection label="Variants">
        <div className={sharedStyles.row}>
          <Chip>Default</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="info">Info</Chip>
          <Chip variant="error">Error</Chip>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Selectable">
        <div className={sharedStyles.row}>
          <Chip selected={selected} onSelect={() => setSelected(s => !s)}>
            {selected ? 'Selected' : 'Click to select'}
          </Chip>
          {(['Default', 'Active', 'Archived'] as const).map(label => (
            <Chip
              key={label}
              selected={activeFilters.includes(label)}
              onSelect={() => toggleFilter(label)}
            >
              {label}
            </Chip>
          ))}
        </div>
      </DemoSubsection>

      <DemoSubsection label="Removable">
        <div className={sharedStyles.row}>
          {tags.map(tag => (
            <Chip key={tag} onRemove={() => setTags(prev => prev.filter(t => t !== tag))}>
              {tag}
            </Chip>
          ))}
          {tags.length === 0 && (
            <Chip onSelect={() => setTags(['Design', 'Engineering', 'Research'])}>
              Reset tags
            </Chip>
          )}
        </div>
      </DemoSubsection>

      <DemoSubsection label="With icon">
        <div className={sharedStyles.row}>
          <Chip icon={<span>★</span>}>Starred</Chip>
          <Chip icon={<span>⚡</span>} variant="warning">High priority</Chip>
          <Chip icon={<span>✓</span>} variant="success" onRemove={() => {}}>Verified</Chip>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With avatar">
        <div className={sharedStyles.row}>
          {sampleAvatars.slice(0, 6).map(av => (
            <Chip key={av.id} avatar={av}>{av.name}</Chip>
          ))}
        </div>
        <div className={sharedStyles.row}>
          <Chip avatar={sampleAvatars[0]} onRemove={() => {}}>{sampleAvatars[0].name}</Chip>
          <Chip avatar={sampleAvatars[1]} selected={true} onSelect={() => {}}>{sampleAvatars[1].name}</Chip>
          <Chip avatar={sampleAvatars[2]} variant="info">{sampleAvatars[2].name}</Chip>
          <Chip avatar={sampleAvatars[3]} variant="success" onRemove={() => {}}>{sampleAvatars[3].name}</Chip>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Selectable + removable">
        <div className={sharedStyles.row}>
          <Chip selected={true} onSelect={() => {}} onRemove={() => {}}>Active filter</Chip>
          <Chip selected={false} onSelect={() => {}} onRemove={() => {}}>Inactive filter</Chip>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
