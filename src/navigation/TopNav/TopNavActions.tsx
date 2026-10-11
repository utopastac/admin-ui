import React from 'react';
import styles from './TopNav.module.css';

interface TopNavActionsProps {
  /** Action elements (buttons, icons, etc.) rendered on the right side of the TopNav. */
  children: React.ReactNode;
}

/**
 * Container for right-aligned action items in the TopNav bar.
 *
 * Wraps its children in a flex row. Typically contains ToolbarButtons
 * or other small interactive elements.
 */
const TopNavActions: React.FC<TopNavActionsProps> = ({ children }) => {
  return <div className={styles.actions}>{children}</div>;
};

export default TopNavActions;
