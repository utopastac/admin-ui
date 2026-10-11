import type { SideNavItemData } from './SideNavItem';
import type { SideNavSectionData } from './SideNavSection';

/**
 * Filters a list of nav sections by a free-text query, matching against both
 * top-level item labels and nested child labels. Case-insensitive.
 *
 * Rules:
 *  - If `query` is empty, the input sections are returned unchanged.
 *  - An item with children is kept if its own label matches (children kept as-is)
 *    OR if any of its children labels match (non-matching children are dropped).
 *  - A plain item is kept only when its label matches.
 *  - Sections with no surviving items are dropped.
 */
export function filterItemsByQuery(
  sections: SideNavSectionData[],
  query: string,
): SideNavSectionData[] {
  if (!query) return sections;
  const lower = query.toLowerCase();
  return sections
    .map((section) => ({
      ...section,
      items: section.items
        .map((item) => {
          if (item.children) {
            const filteredChildren = item.children.filter((child) =>
              child.label.toLowerCase().includes(lower),
            );
            if (item.label.toLowerCase().includes(lower)) return item;
            if (filteredChildren.length > 0) return { ...item, children: filteredChildren };
            return null;
          }
          return item.label.toLowerCase().includes(lower) ? item : null;
        })
        .filter((item): item is SideNavItemData => item !== null),
    }))
    .filter((section) => section.items.length > 0);
}
