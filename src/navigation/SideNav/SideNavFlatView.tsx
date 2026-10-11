import React from 'react';
import SideNavSection from './SideNavSection';
import SideNavTopLevelSection from './SideNavTopLevelSection';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';
import styles from './SideNav.module.css';

interface SideNavFlatViewProps {
  /** Filtered flat sections to render when no top-level sections are provided. */
  sections: SideNavSectionData[];
  /** Filtered top-level sections; when non-empty, take precedence over `sections`. */
  topLevelSections: SideNavTopLevelSectionData[];
  /** Whether search is active (used to render a "No results" message when empty). */
  searchActive: boolean;
}

/**
 * Renders the standard (non-tabbed) nav list — either a list of top-level
 * accordion sections or a flat list of sections. Internal subcomponent.
 */
const SideNavFlatView: React.FC<SideNavFlatViewProps> = ({
  sections,
  topLevelSections,
  searchActive,
}) => {
  const useTopLevel = topLevelSections.length > 0;

  if (useTopLevel) {
    return (
      <>
        {topLevelSections.map((section, index) => (
          <SideNavTopLevelSection
            key={section.label}
            section={section}
            isLast={index === topLevelSections.length - 1}
          />
        ))}
        {searchActive && topLevelSections.length === 0 && (
          <p className={styles.noResults}>No results</p>
        )}
      </>
    );
  }

  return (
    <>
      {sections.map((section, index) => (
        <SideNavSection
          key={section.label ?? `__section_${index}`}
          section={section}
        />
      ))}
      {searchActive && sections.length === 0 && (
        <p className={styles.noResults}>No results</p>
      )}
    </>
  );
};

export default SideNavFlatView;
