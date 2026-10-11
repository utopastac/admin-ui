import React from 'react';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  topNav: React.ReactNode;
  children: React.ReactNode;
  sideNav?: React.ReactNode;
  /** Fixed width for the side nav column. Accepts any CSS width value (e.g. 240, '240px', '16rem'). */
  sideNavWidth?: number | string;
  panel?: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ topNav, sideNav, sideNavWidth, panel, children, className = '' }) => {
  const sideNavStyle = sideNavWidth !== undefined
    ? { width: typeof sideNavWidth === 'number' ? `${sideNavWidth}px` : sideNavWidth }
    : undefined;

  return (
    <div className={`${styles.appLayout} ${className}`}>
      <div className={styles.topNav}>{topNav}</div>
      <div className={styles.body}>
        {sideNav && <div className={styles.sideNav} style={sideNavStyle}>{sideNav}</div>}
        <div className={styles.content}>{children}</div>
        {panel && <div className={styles.panel}>{panel}</div>}
      </div>
    </div>
  );
};

export default AppLayout;
