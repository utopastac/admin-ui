import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';
import type { SideNavTabConfig } from './SideNav';

export interface ResolveEffectiveConfigInput {
  /** The currently-active tab config, or null/undefined in flat (non-tabbed) mode. */
  activeTab: SideNavTabConfig | null | undefined;
  /** Fallback sections used when not in tabbed mode. */
  sections: SideNavSectionData[];
  /** Fallback top-level sections used when not in tabbed mode. */
  topLevelSections: SideNavTopLevelSectionData[] | undefined;
  /** Fallback searchable flag used when not in tabbed mode. */
  searchable: boolean;
  /** Fallback search placeholder used when not in tabbed mode. */
  searchPlaceholder: string;
  /** Fallback search icon type used when not in tabbed mode. */
  searchIconType: 'search' | 'filter';
  /**
   * When true, the SideNav renders a single global search (in tabbed mode)
   * which overrides per-tab search; effectiveSearchable is always false.
   */
  globalSearchable: boolean;
}

export interface EffectiveConfig {
  effectiveSections: SideNavSectionData[];
  effectiveTopLevelSections: SideNavTopLevelSectionData[] | undefined;
  effectiveSearchable: boolean;
  effectiveSearchPlaceholder: string;
  effectiveSearchIconType: 'search' | 'filter';
}

/**
 * Resolve the effective SideNav config for the current render. In tabbed
 * mode, the active tab's fields take precedence (with sensible defaults when
 * they are absent). In flat mode, the top-level SideNav props are returned
 * as-is. When `globalSearchable` is true, per-tab/per-nav search is
 * suppressed (`effectiveSearchable` is forced to false).
 */
export function resolveEffectiveConfig({
  activeTab,
  sections,
  topLevelSections,
  searchable,
  searchPlaceholder,
  searchIconType,
  globalSearchable,
}: ResolveEffectiveConfigInput): EffectiveConfig {
  const effectiveSections = activeTab ? activeTab.sections : sections;
  const effectiveTopLevelSections = activeTab
    ? activeTab.topLevelSections
    : topLevelSections;
  const effectiveSearchable = globalSearchable
    ? false
    : activeTab
      ? (activeTab.searchable ?? false)
      : searchable;
  const effectiveSearchPlaceholder = activeTab
    ? (activeTab.searchPlaceholder ?? 'Search…')
    : searchPlaceholder;
  const effectiveSearchIconType = activeTab
    ? (activeTab.searchIconType ?? 'search')
    : searchIconType;

  return {
    effectiveSections,
    effectiveTopLevelSections,
    effectiveSearchable,
    effectiveSearchPlaceholder,
    effectiveSearchIconType,
  };
}
