import React from 'react';
import SideNavSection from './SideNavSection';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTabData } from './SideNavTabStrip';
import styles from './SideNav.module.css';

export interface SideNavGlobalSearchGroup {
  tab: SideNavTabData;
  sections: SideNavSectionData[];
}

interface SideNavGlobalSearchViewProps {
  /** Filtered cross-tab result groups. */
  results: SideNavGlobalSearchGroup[];
}

/**
 * Renders the cross-tab search results view. Each matching section is
 * prefixed with its tab's label (and optional section label) in the header.
 * Internal SideNav subcomponent.
 */
const SideNavGlobalSearchView = React.forwardRef<HTMLDivElement, SideNavGlobalSearchViewProps>(
  ({ results }, ref) => (
    <div ref={ref} className={styles.navWrapper}>
      <nav className={styles.nav} aria-label="Primary navigation">
        {results.length > 0 ? (
          results.flatMap(({ tab, sections }) =>
            sections.map((section, i) => (
              <div key={`${tab.id}-${i}`} className={styles.section}>
                <p className={styles.sectionLabel}>
                  {section.label ? `${tab.label} / ${section.label}` : tab.label}
                </p>
                <SideNavSection section={{ ...section, label: undefined }} />
              </div>
            )),
          )
        ) : (
          <p className={styles.noResults}>No results</p>
        )}
      </nav>
    </div>
  ),
);

SideNavGlobalSearchView.displayName = 'SideNavGlobalSearchView';

export default SideNavGlobalSearchView;
