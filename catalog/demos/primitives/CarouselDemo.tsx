import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Carousel } from '@/primitives';

const CarouselProps: PropRow[] = [
  { prop: 'children', type: 'React.ReactNode', description: 'Slide content. Each direct child becomes one slide.' },
  { prop: 'slidesPerView', type: 'number', default: '1', description: 'Number of slides visible at once.' },
  { prop: 'gap', type: 'number', default: '16', description: 'Gap in pixels between slides.' },
  { prop: 'loop', type: 'boolean', default: 'false', description: 'When true, navigation wraps around from last to first slide.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function CarouselDemo() {
  const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];
  return (
    <DemoSection title="Carousel" description="Horizontal slider for cycling through content with prev/next navigation.">
      <DemoShowcase code={`import { Carousel } from 'admin-ui';

<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}>
        <div style={{ width: '100%' }}>
          <Carousel>
            {['Slide 1', 'Slide 2', 'Slide 3'].map((s) => (
              <div key={s} style={{ background: 'var(--admin-background-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xxl)', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
                {s}
              </div>
            ))}
          </Carousel>
        </div>
      </DemoShowcase>

      <PropsTable props={CarouselProps} />

      <DemoSubsection label="Single Slide">
        <Carousel>
          {slides.map((s) => (
            <div key={s} style={{ background: 'var(--admin-background-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xxl)', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
              {s}
            </div>
          ))}
        </Carousel>
      </DemoSubsection>
      <DemoSubsection label="3 Per View">
        <Carousel slidesPerView={3} gap={12}>
          {slides.map((s) => (
            <div key={s} style={{ background: 'var(--admin-background-subtle)', borderRadius: 'var(--admin-radius-md)', padding: 'var(--admin-space-xl)', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
              {s}
            </div>
          ))}
        </Carousel>
      </DemoSubsection>
    </DemoSection>
  );
}
