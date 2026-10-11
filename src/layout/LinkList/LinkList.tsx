import React from 'react';
import styles from './LinkList.module.css';

export interface LinkListItem {
  /** Unique identifier for the item. */
  id: string;
  /** Display label for the link. */
  label: string;
  /** Called when the item is clicked. */
  onClick?: () => void;
}

export interface LinkListSection {
  /** Optional heading rendered above the items. */
  header?: string;
  /** Optional description rendered below the header. */
  description?: string;
  /** The items to render as inline links. */
  items: LinkListItem[];
}

export interface LinkListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sections of grouped links. */
  sections: LinkListSection[];
  /** Remove section borders and vertical padding. */
  bare?: boolean;
}

/**
 * Renders groups of items as inline clickable links separated by `/`.
 *
 * Each section can have an optional header and description. Sections are
 * visually separated by a top border. Commonly used for catalog index pages
 * that list components or topics by category.
 */
export default function LinkList({ sections, bare, className, ...rest }: LinkListProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      {sections.map((section, i) => (
        <div key={i} className={[styles.section, bare ? styles.bare : undefined].filter(Boolean).join(' ')}>
          {section.header && <h2 className={styles.header}>{section.header}</h2>}
          {section.description && <p className={styles.description}>{section.description}</p>}
          <div className={styles.items}>
            {section.items.map((item, j) => (
              <React.Fragment key={item.id}>
                <button className={styles.link} onClick={item.onClick}>
                  {item.label}
                </button>
                {j < section.items.length - 1 && (
                  <span aria-hidden className={styles.separator}>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
