import { PageHeading, LinkList } from '@/layout';
import { navigate } from '../router';
import { componentTabs } from '../data/navigation';

const SECTION_DESCRIPTIONS: Record<string, string> = {
  Primitives: 'Core interactive elements — buttons, inputs, form controls, data display, and more.',
  Layout: 'Structural components for arranging content, composing pages, and wrapping document layouts.',
  Overlays: 'Floating UI — modals, side panels, context menus, toasts, and tooltips.',
  Navigation: 'Top bars, side menus, pagination, and in-page table of contents.',
};

export default function ComponentsLandingPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <PageHeading title="Components" description="A reference for every component in the library." />
      <LinkList
        sections={componentTabs.map((tab) => ({
          header: tab.label,
          description: SECTION_DESCRIPTIONS[tab.label],
          items: tab.sections.flatMap((s) => s.items.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => navigate('components', item.id),
          }))),
        }))}
      />
    </div>
  );
}
