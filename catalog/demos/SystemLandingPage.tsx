import { PageHeading, LinkList } from '@/layout';
import { navigate } from '../router';
import { systemSections } from '../data/navigation';

export default function SystemLandingPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <PageHeading title="System" description="Design tokens, type scales, spacing, icons, and visual foundations." />
      <LinkList
        sections={[
          {
            items: systemSections[0].items.map((item) => ({
              id: item.id,
              label: item.label,
              onClick: () => navigate('system', item.id),
            })),
          },
        ]}
      />
    </div>
  );
}
