import { resolveEffectiveConfig } from './resolveEffectiveConfig';
import type { SideNavTabConfig } from './SideNav';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';

const flatSections: SideNavSectionData[] = [
  { label: 'Flat', items: [{ id: 'a', label: 'A' }] },
];

const flatTopLevel: SideNavTopLevelSectionData[] = [
  { label: 'Top', sections: [] },
];

const tabSections: SideNavSectionData[] = [
  { label: 'Tab', items: [{ id: 'b', label: 'B' }] },
];

const tabTopLevel: SideNavTopLevelSectionData[] = [
  { label: 'Tab top', sections: [] },
];

function makeTab(overrides: Partial<SideNavTabConfig> = {}): SideNavTabConfig {
  return {
    id: 'tab-1',
    label: 'Tab 1',
    sections: tabSections,
    ...overrides,
  };
}

describe('resolveEffectiveConfig', () => {
  it('returns the flat-mode fallbacks when activeTab is null', () => {
    const result = resolveEffectiveConfig({
      activeTab: null,
      sections: flatSections,
      topLevelSections: flatTopLevel,
      searchable: true,
      searchPlaceholder: 'Find…',
      searchIconType: 'filter',
      globalSearchable: false,
    });

    expect(result.effectiveSections).toBe(flatSections);
    expect(result.effectiveTopLevelSections).toBe(flatTopLevel);
    expect(result.effectiveSearchable).toBe(true);
    expect(result.effectiveSearchPlaceholder).toBe('Find…');
    expect(result.effectiveSearchIconType).toBe('filter');
  });

  it('returns the active tab values when in tabbed mode', () => {
    const tab = makeTab({
      topLevelSections: tabTopLevel,
      searchable: true,
      searchPlaceholder: 'Tab search',
      searchIconType: 'filter',
    });

    const result = resolveEffectiveConfig({
      activeTab: tab,
      sections: flatSections,
      topLevelSections: flatTopLevel,
      searchable: false,
      searchPlaceholder: 'Flat search',
      searchIconType: 'search',
      globalSearchable: false,
    });

    expect(result.effectiveSections).toBe(tabSections);
    expect(result.effectiveTopLevelSections).toBe(tabTopLevel);
    expect(result.effectiveSearchable).toBe(true);
    expect(result.effectiveSearchPlaceholder).toBe('Tab search');
    expect(result.effectiveSearchIconType).toBe('filter');
  });

  it('falls back to defaults when the active tab omits searchable/placeholder/icon', () => {
    const tab = makeTab(); // no searchable, placeholder, or iconType

    const result = resolveEffectiveConfig({
      activeTab: tab,
      sections: flatSections,
      topLevelSections: flatTopLevel,
      searchable: true,
      searchPlaceholder: 'Flat placeholder',
      searchIconType: 'filter',
      globalSearchable: false,
    });

    expect(result.effectiveSearchable).toBe(false);
    expect(result.effectiveSearchPlaceholder).toBe('Search…');
    expect(result.effectiveSearchIconType).toBe('search');
  });

  it('forces effectiveSearchable to false when globalSearchable is true (flat mode)', () => {
    const result = resolveEffectiveConfig({
      activeTab: null,
      sections: flatSections,
      topLevelSections: flatTopLevel,
      searchable: true,
      searchPlaceholder: 'Find…',
      searchIconType: 'search',
      globalSearchable: true,
    });

    expect(result.effectiveSearchable).toBe(false);
  });

  it('forces effectiveSearchable to false when globalSearchable is true (tabbed mode)', () => {
    const tab = makeTab({ searchable: true });

    const result = resolveEffectiveConfig({
      activeTab: tab,
      sections: flatSections,
      topLevelSections: flatTopLevel,
      searchable: false,
      searchPlaceholder: 'Flat',
      searchIconType: 'search',
      globalSearchable: true,
    });

    expect(result.effectiveSearchable).toBe(false);
  });
});
