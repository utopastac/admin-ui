import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SideNavItem from './SideNavItem';
import type { SideNavItemData } from './SideNavItem';
import styles from './SideNav.module.css';

export interface SideNavSectionData {
  /** Optional heading shown above the group. Omit for ungrouped items. */
  label?: string;
  /** The navigation items within this section. */
  items: SideNavItemData[];
  /** When true, the section label becomes a clickable toggle that shows/hides the items. Requires `label`. */
  collapsible?: boolean;
  /** Whether a collapsible section starts open. Defaults to true. Ignored when `collapsible` is false. */
  defaultOpen?: boolean;
}

interface SideNavSectionProps {
  /** The section data to render. */
  section: SideNavSectionData;
}

/**
 * A labelled group of navigation items within a SideNav.
 *
 * Renders an optional section heading followed by a vertical list of
 * SideNavItem buttons. Sections without a label render items directly.
 * When `collapsible` is true, the heading becomes a toggle button with
 * a chevron indicator.
 */
const SideNavSection: React.FC<SideNavSectionProps> = ({ section }) => {
  const isCollapsible = section.collapsible && !!section.label;
  const [open, setOpen] = useState(section.defaultOpen !== false);
  const contentId = section.label
    ? `section-${section.label.replace(/\s+/g, '-').toLowerCase()}`
    : undefined;

  return (
    <div className={`${styles.section}${isCollapsible ? ` ${styles.collapsibleSection}` : ''}${isCollapsible && open ? ` ${styles.collapsibleSectionOpen}` : ''}`}>
      {section.label && (
        isCollapsible ? (
          <button
            type="button"
            className={styles.sectionLabelCollapsible}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls={contentId}
            data-sidenav-item=""
          >
            <span>{section.label}</span>
            <ChevronDown
              size={12}
              className={`${styles.sectionChevron} ${!open ? styles.sectionChevronClosed : ''}`}
            />
          </button>
        ) : (
          <p className={styles.sectionLabel}>{section.label}</p>
        )
      )}
      {(!isCollapsible || open) && (
        <ul className={styles.list} id={contentId}>
          {section.items.map((item) => (
            <SideNavItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideNavSection;
