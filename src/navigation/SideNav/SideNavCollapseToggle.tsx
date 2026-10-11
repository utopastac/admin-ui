import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import ToolbarButton from '@/primitives/ToolbarButton/ToolbarButton';
import styles from './SideNav.module.css';

interface SideNavCollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

/**
 * The floating collapse/expand toggle button pinned to the right edge of
 * the SideNav. Internal SideNav subcomponent — not exported from the library.
 */
const SideNavCollapseToggle: React.FC<SideNavCollapseToggleProps> = ({
  collapsed,
  onToggle,
}) => (
  <ToolbarButton
    icon={collapsed ? PanelLeftOpen : PanelLeftClose}
    onClick={onToggle}
    size="sm"
    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    tooltip={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    className={styles.toggleButton}
  />
);

export default SideNavCollapseToggle;
