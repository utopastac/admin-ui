import { PageHeading, CardGrid } from '@/layout';
import { Card } from '@/primitives';
import { navigate } from '../router';
import type { MainTab } from '../data/navigation';
import { systemSections, componentTabs } from '../data/navigation';
import styles from './HomePage.module.css';

function countItems(sections: { items: unknown[] }[]): number {
  return sections.reduce((sum, s) => sum + s.items.length, 0);
}

const SECTIONS: { id: string; title: string; tab: MainTab; page: string; description: string; count: number | null; countLabel: string | null }[] = [
  {
    id: 'about',
    title: 'About',
    tab: 'about',
    page: 'about',
    description: 'Library overview, design principles, and how to get started.',
    count: null,
    countLabel: null,
  },
  {
    id: 'system',
    title: 'System',
    tab: 'system',
    page: 'colors',
    description: 'Design tokens: color scales, typography, spacing, icons, and shadows.',
    count: countItems(systemSections),
    countLabel: 'topics',
  },
  {
    id: 'components',
    title: 'Components',
    tab: 'components',
    page: 'avatar',
    description: 'UI components including primitives, layout, overlays, and navigation.',
    count: countItems(componentTabs.flatMap((t) => t.sections)),
    countLabel: 'components',
  },
  {
    id: 'decisions',
    title: 'Decisions',
    tab: 'about',
    page: 'decisions',
    description: 'Design decisions and the rationale behind the component API.',
    count: null,
    countLabel: null,
  },
];

export default function HomePage() {
  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <PageHeading
          title="Admin UI"
          description="A component library and design system for building admin tools and prototypes."
        />
        <CardGrid>
          {SECTIONS.map((section) => (
            <Card key={section.id} hoverable onClick={() => navigate(section.tab, section.page)}>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.title}>{section.title}</span>
                  {section.count !== null && (
                    <span className={styles.count}>
                      {section.count} {section.countLabel}
                    </span>
                  )}
                </div>
                <p className={styles.description}>{section.description}</p>
              </div>
            </Card>
          ))}
        </CardGrid>
      </div>
    </div>
  );
}
