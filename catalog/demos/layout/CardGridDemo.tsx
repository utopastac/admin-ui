import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { CardGrid } from '@/layout';
import { Card } from '@/primitives';

const CardGridProps: PropRow[] = [
  { prop: 'gap', type: 'SpaceScale', default: "'m'", description: 'Space between cards.', options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] },
  { prop: 'children', type: 'React.ReactNode', description: 'Card elements to display in the grid.' },
];

const cards = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

export default function CardGridDemo() {
  return (
    <DemoSection
      title="CardGrid"
      description="A responsive auto-fill grid for card layouts. Columns are as wide as possible at a minimum of 260 px, collapsing naturally on narrower containers."
    >
      <PropsTable props={CardGridProps} />
      <DemoSubsection label="Default (gap=m)">
        <CardGrid>
          {cards.map((name) => (
            <Card key={name}>
              <span style={{ fontSize: 'var(--admin-font-size-s)', fontWeight: 'var(--admin-font-weight-medium)' }}>
                {name}
              </span>
            </Card>
          ))}
        </CardGrid>
      </DemoSubsection>

      <DemoSubsection label="Gap variants">
        {(['xs', 's', 'm', 'l', 'xl'] as const).map((gap) => (
          <div key={gap}>
            <p style={{ margin: '0 0 var(--admin-space-xs)', fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)' }}>
              gap="{gap}"
            </p>
            <CardGrid gap={gap}>
              {['One', 'Two', 'Three'].map((name) => (
                <Card key={name}>
                  <span style={{ fontSize: 'var(--admin-font-size-s)' }}>{name}</span>
                </Card>
              ))}
            </CardGrid>
          </div>
        ))}
      </DemoSubsection>
    </DemoSection>
  );
}
