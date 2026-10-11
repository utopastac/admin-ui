import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Card } from '@/primitives';

const CardProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Content rendered inside the card.' },
  { prop: 'active', type: 'boolean', default: 'false', description: 'Applies an active/selected visual state.' },
  { prop: 'hoverable', type: 'boolean', default: 'true', description: 'Applies a hover highlight effect.' },
  { prop: 'onClick', type: '() => void', default: 'undefined', description: 'Click handler for interactive cards.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function CardDemo() {
  const [activeCard, setActiveCard] = useState<string | null>('card-2');

  return (
    <DemoSection
      title="Card"
      description="Cards are surface containers. They can be hoverable, active, and clickable."
    >
      <DemoShowcase code={`import { Card } from 'admin-ui';

<Card hoverable>
  <p>Card content goes here.</p>
</Card>`}>
        <Card hoverable>
          <div style={{ padding: 'var(--admin-space-s)' }}>
            <strong>Hoverable Card</strong>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>
              Hover to see the effect
            </p>
          </div>
        </Card>
      </DemoShowcase>

      <PropsTable props={CardProps} />

      <DemoSubsection label="Variants">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--admin-space-m)' }}>
          <Card hoverable={false}>
            <div style={{ padding: 'var(--admin-space-s)' }}>
              <strong>Default</strong>
              <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>
                Not hoverable, not active
              </p>
            </div>
          </Card>

          <Card hoverable>
            <div style={{ padding: 'var(--admin-space-s)' }}>
              <strong>Hoverable</strong>
              <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>
                Hover to see the effect
              </p>
            </div>
          </Card>

          <Card active>
            <div style={{ padding: 'var(--admin-space-s)' }}>
              <strong>Active</strong>
              <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>
                Highlighted as selected
              </p>
            </div>
          </Card>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Interactive (click to select)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--admin-space-m)' }}>
          {['card-1', 'card-2', 'card-3'].map((id) => (
            <Card
              key={id}
              active={activeCard === id}
              hoverable
              onClick={() => setActiveCard(id)}
            >
              <div style={{ padding: 'var(--admin-space-s)' }}>
                <strong>Card {id.split('-')[1]}</strong>
                <p style={{ margin: '4px 0 0', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-secondary)' }}>
                  {activeCard === id ? 'Selected' : 'Click to select'}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
