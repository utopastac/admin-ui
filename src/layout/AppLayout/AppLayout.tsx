import React from 'react';
import SidePanel from '@/overlays/SidePanel/SidePanel';
import { useMediaQuery, ADMIN_MOBILE_QUERY } from '@/hooks/useMediaQuery';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  topNav: React.ReactNode;
  children: React.ReactNode;
  sideNav?: React.ReactNode;
  /** Fixed width for the side nav column. Accepts any CSS width value (e.g. 240, '240px', '16rem'). */
  sideNavWidth?: number | string;
  panel?: React.ReactNode;
  /**
   * Controlled open state for the mobile side-nav drawer.
   * Only used at mobile widths; ignored on desktop.
   */
  mobileNavOpen?: boolean;
  /** Called when the mobile side-nav drawer should open or close. */
  onMobileNavOpenChange?: (open: boolean) => void;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  topNav,
  sideNav,
  sideNavWidth,
  panel,
  children,
  mobileNavOpen = false,
  onMobileNavOpenChange,
  className = '',
}) => {
  const isMobile = useMediaQuery(ADMIN_MOBILE_QUERY);

  const sideNavStyle = sideNavWidth !== undefined
    ? { width: typeof sideNavWidth === 'number' ? `${sideNavWidth}px` : sideNavWidth }
    : undefined;

  const drawerWidth = typeof sideNavWidth === 'number'
    ? sideNavWidth
    : typeof sideNavWidth === 'string' && /^\d+$/.test(sideNavWidth)
      ? Number(sideNavWidth)
      : 320;

  return (
    <div className={`${styles.appLayout} ${className}`}>
      <div className={styles.topNav}>{topNav}</div>
      <div className={styles.body}>
        {sideNav && (
          <div className={styles.sideNav} style={sideNavStyle}>
            {!isMobile ? sideNav : null}
          </div>
        )}
        <div className={styles.content}>{children}</div>
        {panel && <div className={styles.panel}>{panel}</div>}
      </div>
      {sideNav && (
        <SidePanel
          isOpen={isMobile && mobileNavOpen}
          onClose={() => onMobileNavOpenChange?.(false)}
          side="left"
          width={drawerWidth}
          data-testid="app-layout-mobile-nav"
        >
          {isMobile ? sideNav : null}
        </SidePanel>
      )}
    </div>
  );
};

export default AppLayout;
