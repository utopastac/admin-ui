import React from 'react';
import InlineSearch from '@/primitives/InlineSearch';
import styles from './SideNav.module.css';

interface SideNavSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: 'search' | 'filter';
  /** Whether this is the global cross-tab search (affects wrapper styling). */
  variant?: 'local' | 'global';
}

/**
 * A search input block used at the top of the SideNav or inside a tabbed
 * view. Internal subcomponent — not exported from the library.
 */
const SideNavSearch: React.FC<SideNavSearchProps> = ({
  value,
  onChange,
  placeholder,
  icon,
  variant = 'local',
}) => (
  <div
    className={variant === 'global' ? styles.globalSearchWrapper : styles.searchWrapper}
  >
    <InlineSearch
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={icon}
    />
  </div>
);

export default SideNavSearch;
