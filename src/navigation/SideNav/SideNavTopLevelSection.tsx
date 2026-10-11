import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SideNavSection from './SideNavSection';
import type { SideNavSectionData } from './SideNavSection';
import styles from './SideNav.module.css';

export interface SideNavTopLevelSectionData {
  /** Label shown in the accordion header. */
  label: string;
  /** Whether the section is expanded by default. */
  defaultOpen?: boolean;
  /** The navigation sections rendered when expanded. */
  sections: SideNavSectionData[];
}

interface SideNavTopLevelSectionProps {
  /** The top-level section data. */
  section: SideNavTopLevelSectionData;
  /** Whether this is the last top-level section (no border). */
  isLast?: boolean;
}

/**
 * A collapsible top-level section in SideNav. Renders an accordion-style
 * header with label and chevron; toggles visibility of child sections.
 */
const SideNavTopLevelSection: React.FC<SideNavTopLevelSectionProps> = ({
  section,
  isLast = false,
}) => {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);

  return (
    <div className={`${styles.topLevelSection}${!isLast ? ` ${styles.topLevelSectionWithBorder}` : ''}`}>
      <button
        type="button"
        className={styles.topLevelHeader}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`sidenav-toplevel-${section.label.replace(/\s+/g, '-').toLowerCase()}`}
        data-sidenav-item=""
      >
        <span className={styles.topLevelLabel}>{section.label}</span>
        <ChevronDown
          size={16}
          className={`${styles.topLevelChevron} ${isOpen ? '' : styles.topLevelChevronClosed}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div
          id={`sidenav-toplevel-${section.label.replace(/\s+/g, '-').toLowerCase()}`}
          className={styles.topLevelContent}
          role="region"
        >
          {section.sections.map((childSection, index) => (
            <SideNavSection
              key={childSection.label ?? `__section_${index}`}
              section={childSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNavTopLevelSection;
